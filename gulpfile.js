/*------------------------------------*\
    ::Variables
\*------------------------------------*/

/*------------------------------------*\
    ::Plugins
\*------------------------------------*/
var gulp = require('gulp');
var livereload = require('gulp-livereload'),
    server = livereload();
var uglify = require('gulp-uglifyjs');
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var prefix = require('gulp-autoprefixer');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var exit = require('gulp-exit');

/*------------------------------------*\
    ::Task Definitions
\*------------------------------------*/

//js
gulp.task('js', function() {
    gulp.src('./wp-content/themes/zemplate/js/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify('scripts.min.js', {
            outSourceMap: 'src/sourcemap.map',
            basePath: '/wp-content/themes/zemplate/js/src/'
        }))
        .pipe(gulp.dest('wp-content/themes/zemplate/js/'))
        .pipe(exit());
});

//css
gulp.task('compass', function() {
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
        .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
        .pipe(gulp.dest('wp-content/themes/zemplate/.'));
});

//webfonts
gulp.task('webfont', function(){
    gulp.src(['wp-content/themes/zemplate/fonts/icons-raw/*.svg'])
        .pipe(iconfontCss({
            path: 'wp-content/themes/zemplate/sass/stars/zemplate/icons_template.scss-template',
            fontName: 'icon',
            targetPath: '../../sass/planets/base/_icons.scss',
            fontPath: 'fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: 'icon'
        }))
        .pipe(gulp.dest('wp-content/themes/zemplate/fonts/icons/'));
});

//watch and live reload
gulp.task('watch', function() {
    gulp.watch('./wp-content/themes/zemplate/sass/**/*.scss', ['compass']);
    gulp.watch('./wp-content/themes/zemplate/fonts/icons-raw/*.svg', ['webfont']);
    gulp.watch('./wp-content/themes/zemplate/**/*.{css,html,php,js}').on('change', function(file) {
        server.changed(file.path);
    });
});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);