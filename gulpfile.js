/*------------------------------------*\
    ::Variables
\*------------------------------------*/

/*------------------------------------*\
    ::Plugins
\*------------------------------------*/
var livereload = require('gulp-livereload'),
    compass = require('gulp-compass'),
    server = livereload(),
    gulp = require('gulp');

/*------------------------------------*\
    ::Task Definitions
\*------------------------------------*/

//css
gulp.task('compass', function() {
    gulp.src('wp-content/themes/zemplate/sass/*.scss')
        .pipe(compass({
            css: 'wp-content/themes/zemplate/',
            sass: 'wp-content/themes/zemplate/sass',
            image: 'wp-content/themes/zemplate/images',
            require: ['sass-globbing']
        }))
        .pipe(gulp.dest('wp-content/themes/zemplate/.'));
});

//watch and live reload
gulp.task('watch', function() {
    gulp.watch('./wp-content/themes/zemplate/sass/*.scss', ['compass']);
    gulp.watch('./wp-content/themes/zemplate/**/*.{css,html,php,js}').on('change', function(file) {
        server.changed(file.path);
    });
});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);