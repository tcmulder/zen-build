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
var svgSprite  = require('gulp-svg-sprite');
var shell       = require('gulp-shell');
var notify      = require('gulp-notify');
var cache       = require('gulp-cache');
var exit        = require('gulp-exit');
var reload      = browserSync.reload;

/*------------------------------------*\
    ::Configuration
\*------------------------------------*/
var config = require('./zen-config.js');

/*------------------------------------*\
    ::Handle Errors
\*------------------------------------*/
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
            image: config.sass.src+'images',
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
gulp.task('js', function() {
    gulp.src('wp-content/themes/PROJECTNAME/js/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify('scripts.min.js', {
            outSourceMap: 'src/sourcemap.map',
            basePath: '/wp-content/themes/PROJECTNAME/js/src/'
        }))
        .pipe(gulp.dest('wp-content/themes/PROJECTNAME/js/'));
});

// //svg sprites
// var svg = svgSprite;
// gulp.task('sprite', function () {
//     gulp.src('wp-content/themes/PROJECTNAME/images/svg-raw/*.svg')
//         .pipe(svg({
//             defs: true,
//             generatePreview: false
//         }))
//         .pipe(gulp.dest("wp-content/themes/PROJECTNAME/images/svg-sprites"));
// });

//database
// var config = {
//     db: {
//         local: {
//             name: 'l1_00000000000000',
//             user: 'root',
//             pass: 'root',
//             host: 'localhost',
//             dumpDir: '.db/'
//         }
//     }
// };
// gulp.task('db-exp', function () {
//   return gulp.src('*.js', {read: false})
//     .pipe(shell([
//         'echo "database export called"',
//         'test -d '+config.db.local.dumpDir+' || mkdir '+config.db.local.dumpDir+'',
//         'mysqldump -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' l1_whv > '+config.db.local.dumpDir+'db.sql',
//         'ls -lah '+config.db.local.dumpDir+'db.sql | awk \'{ print "export ran: "$9" is "$5}\''
//     ].join('&&')))
// });
// gulp.task('db-imp', function () {
//   return gulp.src('*.js', {read: false})
//     .pipe(shell([
//         'echo "database import called"',
//         'mysqldump -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' --no-data '+config.db.local.name+' | grep ^DROP | mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' '+config.db.local.name+'',
//         'mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p'+config.db.local.pass+' '+config.db.local.name+' < '+config.db.local.dumpDir+'db.sql',
//         'echo "import ran:"',
//         'mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p'+config.db.local.pass+' '+config.db.local.name+' -e \'SHOW TABLES\''
//     ].join('&&')))
// });

/*------------------------------------*\
    ::Watch
\*------------------------------------*/
//browsersync
// Static Server + watching scss/html files
gulp.task('watch', function() {

    browserSync({
        proxy: "http://localhost:8888/sites/zen-build/PROJECTNAME"
    });

    gulp.watch('wp-content/themes/PROJECTNAME/sass/**/*.scss', ['css']);
    // gulp.watch('wp-content/themes/PROJECTNAME/js/src/**/*.js', ['js', reload]);
    // gulp.watch('wp-content/themes/PROJECTNAME/fonts/icons-raw/*.svg', ['icons', reload]);
    // gulp.watch('wp-content/themes/PROJECTNAME/images/svg-raw/*.svg', ['sprite', reload]);
    gulp.watch("wp-content/themes/PROJECTNAME/**/*.{php,html}").on('change', reload);
});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);