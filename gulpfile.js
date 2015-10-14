/*------------------------------------*\
    ::Zen Build
    -----------------------------------*
    ::version 2.0.6
\*------------------------------------*/

/*------------------------------------*\
    ::Plugins
\*------------------------------------*/
var gulp        = require('gulp');
var stops       = require('pipe-error-stop')
var browserSync = require('browser-sync');
var uglify      = require('gulp-uglifyjs');
var compass     = require('gulp-compass');
var sourcemaps  = require('gulp-sourcemaps');
var prefix      = require('gulp-autoprefixer');
var shell       = require('gulp-shell');
var svg         = require('gulp-svg-sprite');
var gulpif      = require('gulp-if');
var symlink     = require('gulp-symlink');
var reload      = browserSync.reload;

/*------------------------------------*\
    ::Configuration
\*------------------------------------*/
var config = require('./zen-config.js');

/*------------------------------------*\
    ::Task Definitions
\*------------------------------------*/

//css
gulp.task('css', function() {
    gulp.src(config.sass.src+'*.scss')
        .pipe(stops(compass({
            sourcemap: true,
            quiet: true,
            css: config.sass.dest,
            sass: config.sass.src,
            image: config.sass.src+'../images',
            style: 'compressed',
            require: ['sass-globbing']
        }), {
            eachErrorCallback: function(){
                console.log('css task failure');
                browserSync.notify("SASS Compilation Error");
                browserSync.reload();
            }
        }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
        .pipe(sourcemaps.write('./'))
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
        var destParts = config.svg[key].dest.split('/');
        var destFile = destParts.pop();
        var destPath = destParts.join('/') + '/';
        if(destFile != ''){
            destPath = destPath + key + '-sprite/';
        }
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
            .pipe(gulp.dest(destPath))
            .pipe(gulpif(destFile != '', symlink(destPath + '../' + destFile, { force: true })));
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
        proxy: config.url.root,
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
