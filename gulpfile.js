/*------------------------------------*\
    ::Variables
\*------------------------------------*/

/*------------------------------------*\
    ::Plugins
\*------------------------------------*/
var gulp = require('gulp'),
livereload = require('gulp-livereload'),
uglify = require('gulp-uglifyjs'),
jshint = require('gulp-jshint'),
compass = require('gulp-compass'),
prefix = require('gulp-autoprefixer'),
svgSprites = require('gulp-svg-sprites'),
shell = require('gulp-shell'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
exit = require('gulp-exit'),
lr = require('tiny-lr'),
server = lr();

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
    gulp.src('wp-content/themes/__MYTHEMEHERE__/js/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify('scripts.min.js', {
            outSourceMap: 'src/sourcemap.map',
            basePath: '/wp-content/themes/__MYTHEMEHERE__/js/src/'
        }))
        .pipe(livereload(server))
        .pipe(gulp.dest('wp-content/themes/__MYTHEMEHERE__/js/'));
});

//css
gulp.task('css', function() {
    gulp.src('wp-content/themes/__MYTHEMEHERE__/sass/*.scss')
        .pipe(compass({
            sourcemap: true,
            quiet: true,
            css: 'wp-content/themes/__MYTHEMEHERE__/',
            sass: 'wp-content/themes/__MYTHEMEHERE__/sass',
            image: 'wp-content/themes/__MYTHEMEHERE__/images',
            style: 'compressed',
            require: ['sass-globbing']
        }))
        .on("error", handleError)
        .on("error", notify.onError(function(error){return error.message;}))
        .pipe(livereload(server))
        .pipe(notify({ message: 'Compiled Successfully!' }))
        .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
        .pipe(gulp.dest('wp-content/themes/__MYTHEMEHERE__/.'));
});

//svg sprites
var svg = svgSprites;
gulp.task('sprite', function () {
    gulp.src('wp-content/themes/__MYTHEMEHERE__/images/svg-raw/*.svg')
        .pipe(svg({
            defs: true,
            generatePreview: false
        }))
        .pipe(gulp.dest("wp-content/themes/__MYTHEMEHERE__/images/svg-sprites"));
});

//database
var config = {
    db: {
        local: {
            name: 'l1_00000000000000',
            user: 'root',
            pass: 'root',
            host: 'localhost',
            dumpDir: '.db/'
        }
    }
};
gulp.task('db-exp', function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
        'echo "database export called"',
        'test -d '+config.db.local.dumpDir+' || mkdir '+config.db.local.dumpDir+'',
        'mysqldump -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' l1_whv > '+config.db.local.dumpDir+'db.sql',
        'ls -lah '+config.db.local.dumpDir+'db.sql | awk \'{ print "export ran: "$9" is "$5}\''
    ].join('&&')))
});
gulp.task('db-imp', function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
        'echo "database import called"',
        'mysqldump -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' --no-data '+config.db.local.name+' | grep ^DROP | mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' '+config.db.local.name+'',
        'mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p'+config.db.local.pass+' '+config.db.local.name+' < '+config.db.local.dumpDir+'db.sql',
        'echo "import ran:"',
        'mysql -h'+config.db.local.host+' -u'+config.db.local.user+' -p'+config.db.local.pass+' '+config.db.local.name+' -e \'SHOW TABLES\''
    ].join('&&')))
});

/*------------------------------------*\
    ::Watch
\*------------------------------------*/

gulp.task('watch', function() {

  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };

    gulp.watch('wp-content/themes/__MYTHEMEHERE__/sass/**/*.scss', ['css']);
    gulp.watch('wp-content/themes/__MYTHEMEHERE__/js/src/**/*.js', ['js']);
    gulp.watch('wp-content/themes/__MYTHEMEHERE__/fonts/icons-raw/*.svg', ['icons']);
    gulp.watch('wp-content/themes/__MYTHEMEHERE__/images/svg-raw/*.svg', ['sprite']);

  });

});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);