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
var shell = require('gulp-shell')
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
    gulp.src('wp-content/themes/__MY_THEME_NAME__/js/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify('scripts.min.js', {
            outSourceMap: 'src/sourcemap.map',
            basePath: '/wp-content/themes/__MY_THEME_NAME__/js/src/'
        }))
        .pipe(gulp.dest('wp-content/themes/__MY_THEME_NAME__/js/'));
});

//css
gulp.task('css', function() {
    gulp.src('wp-content/themes/__MY_THEME_NAME__/sass/*.scss')
        .pipe(compass({
            sourcemap: true,
            quiet: true,
            css: 'wp-content/themes/__MY_THEME_NAME__/',
            sass: 'wp-content/themes/__MY_THEME_NAME__/sass',
            image: 'wp-content/themes/__MY_THEME_NAME__/images',
            style: 'compressed',
            require: ['sass-globbing']
        }))
        .on("error", handleError)
        .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
        .pipe(gulp.dest('wp-content/themes/__MY_THEME_NAME__/style.css'));
});

//webfonts
gulp.task('icons', function(){
    gulp.src(['wp-content/themes/__MY_THEME_NAME__/fonts/icons-raw/*.svg'])
        .pipe(iconfontCss({
            path: 'icons-template.scss-template',
            fontName: 'icon',
            targetPath: '../../sass/planets/base/_icons.scss',
            fontPath: 'fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: 'icon'
        }))
        .pipe(gulp.dest('wp-content/themes/__MY_THEME_NAME__/fonts/icons/'));
});

//svg sprites
var svg = svgSprites.svg;
gulp.task('sprite', function () {
    gulp.src('wp-content/themes/__MY_THEME_NAME__/images/svg-raw/*.svg')
        .pipe(svg({
            defs: true,
            generatePreview: false
        }))
        .pipe(gulp.dest("wp-content/themes/__MY_THEME_NAME__/images/svg-sprites"));
});

//database
var config = {
    db: {
        local: {
            name: 'l1___MY_THEME_NAME__',
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
        'mysqldump -h'+config.db.local.host+' -u'+config.db.local.user+' -p\''+config.db.local.pass+'\' l1___MY_THEME_NAME__ > '+config.db.local.dumpDir+'db.sql',
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

//establish server
var server = livereload();
//watch and live reload
gulp.task('watch', function() {

    //run tasks when watch notices changes
    gulp.watch('wp-content/themes/__MY_THEME_NAME__/sass/**/*.scss', ['css']);
    gulp.watch('wp-content/themes/__MY_THEME_NAME__/js/src/**/*.js', ['js']);
    gulp.watch('wp-content/themes/__MY_THEME_NAME__/fonts/icons-raw/*.svg', ['icons']);
    gulp.watch('wp-content/themes/__MY_THEME_NAME__/images/svg-raw/*.svg', ['sprite']);

    //reload the project if certain files change
    gulp.watch('wp-content/themes/__MY_THEME_NAME__/**/*.{css,html,php,js,svg}').on('change', function(file) {
        server.changed(file.path);
    });
});

/*------------------------------------*\
    ::Task Combinations
\*------------------------------------*/
gulp.task('default', ['watch']);