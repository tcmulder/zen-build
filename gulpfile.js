/*------------------------------------*\
    ::Variables
\*------------------------------------*/

/*------------------------------------*\
    ::Plugins
\*------------------------------------*/
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var uglify      = require('gulp-uglifyjs');
var jshint      = require('gulp-jshint');
var compass     = require('gulp-compass');
var prefix      = require('gulp-autoprefixer');
var svg         = require('gulp-svg-sprite');
var shell       = require('gulp-shell');
var notify      = require('gulp-notify');
var exit        = require('gulp-exit');
var reload      = browserSync.reload;

/*------------------------------------*\
    ::Configuration
\*------------------------------------*/
var config = require('./zen-config.js');

/*------------------------------------*\
    ::Common Functions
\*------------------------------------*/
//errors
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

/*------------------------------------*\
    ::Task Definitions
\*------------------------------------*/

//css
gulp.task('css', function() {
    gulp.src(config.sass.src+'*.scss')
        .pipe(compass({
            sourcemap: true,
            quiet: true,
            css: config.sass.dest,
            sass: config.sass.src,
            image: config.sass.src+'../images',
            style: 'compressed',
            require: ['sass-globbing']
        }))
        .pipe(browserSync.reload({stream:true}))
        .on("error", handleError)
        .on("error", notify.onError(function(error){return error.message;}))
        .pipe(notify({ message: 'Compiled Successfully!' }))
        .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
        .pipe(gulp.dest(config.sass.dest));
});

//js
for (var key in config.js) {
   gulp.task('js-'+key, function() {
        var key = this.seq[0].split('-')[1];
        var destParts = config.js[key].dest.split('/');
        var destFile = destParts.pop();
        var destPath = destParts.join('/') + '/';

        gulp.src(config.js[key].src)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(uglify(destFile, {
                sourceRoot: config.url.root,
                outSourceMap: true
            }))
            .pipe(gulp.dest(destPath))
            .pipe(browserSync.reload({stream:true}));
   });
   // for (var prop in obj) {
   //    // important check that this is objects own property
   //    // not from prototype prop inherited
   //    if(obj.hasOwnProperty(prop)){
   //      alert(prop + " = " + obj[prop]);
   //    }
   // }
}
// for(var i=0; i < config.js.src.length; i++){

//     gulp.task('js-'+i, function() {
//         var i = this.seq[0].split('-')[1];
//         var destParts = config.js.dest[i].split('/');
//         var destFile = destParts.pop();
//         var destPath = destParts.join('/') + '/';
//         console.log(destParts);
//         console.log(destFile);
//         console.log(destPath);

//         gulp.src(config.js.src[i])
//             .pipe(jshint())
//             .pipe(jshint.reporter('default'))
//             .pipe(uglify(destFile, {
//                 sourceRoot: config.url.root,
//                 outSourceMap: true
//             }))
//             .pipe(gulp.dest(destPath))
//             .pipe(browserSync.reload({stream:true}));
//     });
// }

//svg
for(var i=0; i < config.svg.src.length; i++){
    gulp.task('svg-'+i, function() {
        var i = this.seq[0].split('-')[1];
        var destParts = config.svg.dest[i].split('/');
        var destFile = destParts.pop();
        var destPath = destParts.join('/') + '/';
        console.log(destParts);
        console.log(destFile);
        console.log(destPath);
        gulp.src(config.svg.src[i])
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
            .pipe(browserSync.reload({stream:true}));
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
//browsersync
gulp.task('watch', function() {

    browserSync({
        proxy: 'http://localhost:8888/sites/'+config.site.client+'/'+config.site.proj,
        open: false
    });

    //css watch
    gulp.watch('wp-content/themes/PROJECTNAME/sass/**/*.scss', ['css']);

    //js watches
    for (var key in config.js) {
       gulp.watch(config.js[key].src, ['js-'+key]);
   }

    //svg watches
    for(var i=0; i < config.svg.src.length; i++){
        gulp.watch(config.svg.src[i], ['svg-'+i]);
    }

    // general file changes
    gulp.watch("wp-content/themes/PROJECTNAME/**/*.{php,html}").on('change', reload);
});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);