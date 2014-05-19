/*------------------------------------*\
    ::Variables
\*------------------------------------*/

/*------------------------------------*\
    ::Plugins
\*------------------------------------*/
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglifyjs');
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var prefix = require('gulp-autoprefixer');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var svgSprites = require('gulp-svg-sprites');
var exit = require('gulp-exit');

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

//js
gulp.task('js', function() {
    gulp.src('wp-content/themes/zemplate/js/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify('scripts.min.js', {
            outSourceMap: 'src/sourcemap.map',
            basePath: '/wp-content/themes/zemplate/js/src/'
        }))
        .pipe(gulp.dest('wp-content/themes/zemplate/js/'));
});

//css
gulp.task('css', function() {
    gulp.src('wp-content/themes/zemplate/sass/*.scss')
        .pipe(compass({
            sourcemap: true,
            quiet: true,
            css: 'wp-content/themes/zemplate/',
            sass: 'wp-content/themes/zemplate/sass',
            image: 'wp-content/themes/zemplate/images',
            style: 'compressed',
            require: ['sass-globbing']
        }))
        .on("error", handleError)
        .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
        .pipe(gulp.dest('wp-content/themes/zemplate/.'));
});

//webfonts
gulp.task('icons', function(){
    gulp.src(['wp-content/themes/zemplate/fonts/icons-raw/*.svg'])
        .pipe(iconfontCss({
            path: 'icons-template.scss-template',
            fontName: 'icon',
            targetPath: '../../sass/planets/base/_icons.scss',
            fontPath: 'fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: 'icon'
        }))
        .pipe(gulp.dest('wp-content/themes/zemplate/fonts/icons/'));
});

//svg sprites
var svg = svgSprites.svg;
gulp.task('sprite', function () {
    gulp.src('wp-content/themes/zemplate/images/svg-raw/*.svg')
        .pipe(svg({
            defs: true,
            generatePreview: false
        }))
        .pipe(gulp.dest("wp-content/themes/zemplate/images/svg-sprite"));
});

/*------------------------------------*\
    ::Watch
\*------------------------------------*/

//establish server
var server = livereload();
//watch and live reload
gulp.task('watch', function() {

    //run tasks when watch notices changes
    gulp.watch('wp-content/themes/zemplate/sass/**/*.scss', ['css']);
    gulp.watch('wp-content/themes/zemplate/js/src/**/*.js', ['js']);
    gulp.watch('wp-content/themes/zemplate/fonts/icons-raw/*.svg', ['icons']);
    gulp.watch('wp-content/themes/zemplate/images/svg-raw/*.svg', ['sprite']);

    //reload the project if certain files change
    gulp.watch('wp-content/themes/zemplate/**/*.{css,html,php,js,svg}').on('change', function(file) {
        server.changed(file.path);
    });
});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);