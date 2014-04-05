var gulp = require('gulp');


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./wp-content/themes/zemplate/sass/*.scss', ['compass']);
});

// Default Task
gulp.task('default', ['compass', 'watch']);