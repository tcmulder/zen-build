var gulp = require('gulp');
var compass = require('gulp-compass');

// CSS
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


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./wp-content/themes/zemplate/sass/*.scss', ['compass']);
});

// Default Task
gulp.task('default', ['watch']);