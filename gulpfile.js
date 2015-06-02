/*------------------------------------*\
    ::Variables
\*------------------------------------*/

/*------------------------------------*\
    ::Plugins
\*------------------------------------*/
var gulp        = require('gulp'),
    stops       = require('pipe-error-stop'),
    browserSync = require('browser-sync'),
    uglify      = require('gulp-uglifyjs'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    prefix      = require('gulp-autoprefixer'),
    cssGlobbing = require('gulp-css-globbing'),
    svg         = require('gulp-svg-sprite'),
    shell       = require('gulp-shell'),
    reload      = browserSync.reload;

/*------------------------------------*\
    ::Configuration
\*------------------------------------*/
var config = require('./zen-config.js');

/*------------------------------------*\
    ::Task Definitions
\*------------------------------------*/
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}

//css
gulp.task('sass', function () {
  gulp.src(config.sass.supsrc)
    .pipe(sourcemaps.init())
    .pipe(cssGlobbing({
        extensions: ['.scss'],
        autoReplaceBlock: {
            onOff: false,
            globBlockBegin: 'cssGlobbingBegin',
            globBlockEnd: 'cssGlobbingEnd',
            globBlockContents: config.sass.supsersrc
        },
        scssImportPath: {
            leading_underscore: true,
            filename_extension: false
        }
    }))
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .on('error', function(err){
        displayError(err);
    })
    .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.sass.dest));
});

//js
for(var key in config.js) {
   gulp.task('js-'+key, function() {
        var key = this.seq[0].split('-')[1];
        var destParts = config.js[key].dest.split('/');
        var destFile = destParts.pop();
        var destPath = destParts.join('/') + '/';

        gulp.src(config.js[key].src)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(stops(uglify(destFile, {
                sourceRoot: config.url.root,
                outSourceMap: true
            }), {
                eachErrorCallback: function(){
                    browserSync.notify("JavaScript Compilation Error");
                    console.log('js task failure');
                }
            }))
            .pipe(gulp.dest(destPath))
            .pipe(browserSync.reload({stream:true}));
   });
}

//svg
for(var key in config.svg) {
    gulp.task('svg-'+key, function() {
        var key = this.seq[0].split('-')[1];
        gulp.src(config.svg[key].src)
            .pipe(svg({
                mode: {
                    inline: true,
                    symbol: true
                },
                svg: {
                    xmlDeclaration: false
                }
            }))
            .pipe(gulp.dest(config.svg[key].dest));
    });
}

//db
gulp.task('db-exp', function () {
  return gulp.src('')
    .pipe(shell([
        'echo "database export called"',
        'test -d '+config.db.local.dumpDir+' || mkdir '+config.db.local.dumpDir+'',
        'mysqldump -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' '+config.db.local.name+' > '+config.db.local.dumpDir+config.db.local.dumpFile,
        'ls -lah '+config.db.local.dumpDir+config.db.local.dumpFile+' | awk \'{ print "export ran: "$9" is "$5}\''
    ].join('&&')));
});
gulp.task('db-drop-and-import', function () {
  return gulp.src('')
    .pipe(shell([
        'echo "database import called"',
        'mysqldump -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' --no-data '+config.db.local.name+' | grep ^DROP | mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' '+config.db.local.name+'',
        'mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p'+config.db.local.pass+' '+config.db.local.name+' < '+config.db.local.dumpDir+config.db.local.dumpFile,
        'echo "import ran:"',
        'mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p'+config.db.local.pass+' '+config.db.local.name+' -e \'SHOW TABLES\''
    ].join('&&')));
});
gulp.task('db-far', ['db-drop-and-import'], function () {
    var farCommand = '/Applications/MAMP/htdocs/_far/srdb.cli.php ';
        farCommand += '-h\''+config.db.local.host+'\' ';
        farCommand += '-u\''+config.db.local.user+'\' ';
        farCommand += '-p\''+config.db.local.pass+'\' ';
        farCommand += '-n\''+config.db.local.name+'\' ';
        farCommand += '-s"'+'`mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p'+config.db.local.pass+' '+config.db.local.name+' -e "SELECT option_value FROM '+config.db.local.prefix+'options WHERE option_name=\'siteurl\'" | grep ^http`'+'" ';
        farCommand += '-r\''+config.url.root+'\'';
    return gulp.src('')
        .pipe(shell([
            'echo "database find and replaced called"',
            farCommand
        ].join('&&')));
});
gulp.task('db-imp', ['db-far']);

/*------------------------------------*\
    ::Watch
\*------------------------------------*/
gulp.task('watch', function() {

    // browsersync proxy
    browserSync({
        proxy: 'http://localhost:8888/sites/'+config.site.client+'/'+config.site.proj,
        open: false,
        snippetOptions: {
            whitelist: ['/sites/'+config.site.client+'/'+config.site.proj+'/wp-admin/admin-ajax.php'], // whitelist checked first
            blacklist: ['/sites/'+config.site.client+'/'+config.site.proj+'/wp-admin/**']
        }
    });

    //css watch
    gulp.watch(config.sass.src+'**/*.scss', ['css']);

    //js watches
    for(var key in config.js){
       gulp.watch(config.js[key].src, ['js-'+key]);
    }

    // general file changes
    gulp.watch(config.watch.src).on('change', reload);
});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);