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
// var svgSprite  = require('gulp-svg-sprite');
// var shell       = require('gulp-shell');
var notify      = require('gulp-notify');
// var cache       = require('gulp-cache');
var exit        = require('gulp-exit');
var reload      = browserSync.reload;

/*------------------------------------*\
    ::Configuration
\*------------------------------------*/
var config = require('./zen-config.js');

/*------------------------------------*\
    ::Common Functions
\*------------------------------------*/
// errors
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
for(var i=0; i < config.js.src.length; i++){

    gulp.task('js-'+i, function() {
        var i = this.seq[0].split('-')[1];
        var destParts = config.js.dest[i].split('/');
        var destFile = destParts.pop();
        var destPath = destParts.join('/') + '/';
        console.log(destParts);
        console.log(destFile);
        console.log(destPath);
        gulp.src(config.js.src[i])
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(uglify(destFile, {
                sourceRoot: config.url.root,
                outSourceMap: true
            }))
            .pipe(gulp.dest(destPath))
            .pipe(browserSync.reload({stream:true}));
    });
}

/*------------------------------------*\
    ::Watch
\*------------------------------------*/
//browsersync
gulp.task('watch', function() {

    browserSync({
        proxy: 'http://localhost:8888/sites/'+config.site.client+'/'+config.site.proj,
        open: false
    });

    // css watch
    gulp.watch('wp-content/themes/PROJECTNAME/sass/**/*.scss', ['css']);

    // gulp watches
    for(var i=0; i < config.js.src.length; i++){
        gulp.watch(config.js.src[i], ['js-'+i]);
    }

    // gulp.watch('wp-content/themes/PROJECTNAME/fonts/icons-raw/*.svg', ['icons', reload]);
    // gulp.watch('wp-content/themes/PROJECTNAME/images/svg-raw/*.svg', ['sprite', reload]);
    gulp.watch("wp-content/themes/PROJECTNAME/**/*.{php,html}").on('change', reload);
});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);