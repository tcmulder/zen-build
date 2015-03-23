// //svg sprites
// var svg = svgSprites;
// gulp.task('sprite', function () {
//     gulp.src('wp-content/themes/__MYTHEMEHERE__/images/svg-raw/*.svg')
//         pipe(svg({
//             mode: {
//                 inline: true,
//                 symbol: true
//             },
//             svg: {
//                 xmlDeclaration : false
//             }
//         }))
//         .pipe(gulp.dest("wp-content/themes/__MYTHEMEHERE__/images/svg-sprites"));
// });







// // find directories
// function findDirs(startDir){
//     var fs = require('fs');
//     var path = require('path');
//     return fs
//                 .readdirSync(startDir)
//                 .filter(function(file) {
//                     return fs
//                         .statSync(path.join(startDir, file))
//                         .isDirectory();
//                 });

// }

// // array search
// function searchArr (str, strArray) {
//     var indexOfString = [];
//     for (var i=0; i<strArray.length; i++) {
//         if (strArray[i].match(str)){
//             indexOfString.push(i);
//         }
//     }
//     return indexOfString;
// }

// // get array of directories
// var dirs = findDirs(config.js.src);

// // search array for src directories
// var srcDirs = searchArr('src', dirs);

// // for each directory
// for (var i=0; i < srcDirs.length; i++) {
//     console.log(dirs[srcDirs[i]]);
// }



    // console.log('first ' + watchFile);


    // gulp.task('js'+i, function() {
    //     console.log(watchFile);
    //     gulp.watch(watchFile, ['js'+i]);
    // });

// for(var i=0; i < config.js.src.length; i++){
//     // gulp.watch(config.js.src[i], ['js']);
//     // gulp.watch('./wp-content/themes/PROJECTNAME/js/map-src/**/*.js', ['js']);
//     // var justSetMeOnce = config.js.src[i];
//     // gulp.watch(config.js.src[i], function(vars){
//     //     console.log(vars.path);
//     //     // console.log(justSetMeOnce);
//     // });
//     console.log('script: '+config.js.src[i]);
//     // var scriptSrc = config.js.src[i];
//     // gulp.watch('./wp-content/themes/PROJECTNAME/js/map-src/**/*.js', function () {
//     //     console.log(scriptSrc);
//     //     gulp.src('./wp-content/themes/PROJECTNAME/js/map-src/**/*.js')
//     //             // .pipe(jshint())
//     //             // .pipe(jshint.reporter('default'))
//     //             .pipe(uglify('map.min.js', {
//     //                 outSourceMap: 'map-src/sourcemap.map',
//     //                 basePath: '/wp-content/themes/PROJECTNAME/js/map-src/'
//     //             }))
//     //             .pipe(gulp.dest('./wp-content/themes/PROJECTNAME/js/'));
//     // });

// }
// gulp.src('wp-content/themes/PROJECTNAME/js/map-src/**/*.js')
//         // .pipe(jshint())
//         // .pipe(jshint.reporter('default'))
//         .pipe(uglify('map.min.js', {
//             outSourceMap: 'map-src/sourcemap.map',
//             basePath: '/wp-content/themes/PROJECTNAME/js/map-src/'
//         }))
//         .pipe(gulp.dest('wp-content/themes/PROJECTNAME/js/'));






//js
// var whatever = 0;
// gulp.task('js', function(whatup) {
//     console.log(whatup);
//     console.log(whatever++);
//     // gulp.src('wp-content/themes/__MYTHEMEHERE__/js/src/**/*.js')
//     //     .pipe(jshint())
//     //     .pipe(jshint.reporter('default'))
//     //     .pipe(uglify('scripts.min.js', {
//     //         outSourceMap: 'src/sourcemap.map',
//     //         basePath: '/wp-content/themes/__MYTHEMEHERE__/js/src/'
//     //     }))
//     //     .pipe(gulp.dest('wp-content/themes/__MYTHEMEHERE__/js/'));
// });
















// gulp.task('js', function() {
//     gulp.src('./wp-content/themes/PROJECTNAME/js/map-src/**/*.js')
//         // .pipe(jshint())
//         // .pipe(jshint.reporter('default'))
//         .pipe(uglify('scripts.min.js', {
//             outSourceMap: 'src/sourcemap.map',
//             basePath: '/wp-content/themes/PROJECTNAME/js/src/'
//         }))
//         .pipe(gulp.dest('wp-content/themes/PROJECTNAME/js/'));
// });

// //svg sprites
// var svg = svgSprites;
// gulp.task('sprite', function () {
//     gulp.src('wp-content/themes/PROJECTNAME/images/svg-raw/*.svg')
//         pipe(svg({
//             mode: {
//                 inline: true,
//                 symbol: true
//             },
//             svg: {
//                 xmlDeclaration : false
//             }
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














// /*------------------------------------*\
//     ::Variables
// \*------------------------------------*/

// /*------------------------------------*\
//     ::Plugins
// \*------------------------------------*/
// var gulp        = require('gulp');
// var browserSync = require('browser-sync');
// var uglify      = require('gulp-uglifyjs');
// var jshint      = require('gulp-jshint');
// var jshint      = require('gulp-ruby-sass');
// // var compass     = require('gulp-compass');
// var sass = require('gulp-ruby-sass');
// var prefix      = require('gulp-autoprefixer');
// var svgSprites  = require('gulp-svg-sprite');
// var shell       = require('gulp-shell');
// var notify      = require('gulp-notify');
// var sourcemaps  = require('gulp-sourcemaps');

// //var cache       = require('gulp-cache'),
// //var exit        = require('gulp-exit'),
// var reload      = browserSync.reload;

// /*------------------------------------*\
//     ::Configuration
// \*------------------------------------*/
// var config = require('./zen-config.js');

// /*------------------------------------*\
//     ::Handle Errors
// \*------------------------------------*/
// function handleError(err) {
//   console.log(err.toString());
//   this.emit('end');
// }

// /*------------------------------------*\
//     ::Task Definitions
// \*------------------------------------*/

// //css
// // gulp.task('css', function() {
// //     gulp.src(config.sass.src)
// //         // .pipe(sourcemaps.init())
// //         .pipe(compass({
// //             // sourcemap: true,
// //             quiet: true,
// //             css: 'wp-content/themes/PROJECTNAME/',
// //             sass: 'wp-content/themes/PROJECTNAME/sass',
// //             image: 'wp-content/themes/PROJECTNAME/images',
// //             style: 'compressed',
// //             require: ['sass-globbing']
// //         }))
// //         .pipe(browserSync.reload({stream:true}))
// //         .on("error", handleError)
// //         .on("error", notify.onError(function(error){return error.message;}))
// //         .pipe(notify({ message: 'Compiled Successfully!' }))
// //         .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
// //         // .pipe(sourcemaps.write('.'))
// //         .pipe(gulp.dest(config.sass.dest));
// // });


// // Styles Task
// gulp.task('css', function() {
//     return gulp.src(config.sass.src)
//         .pipe(sass({style: 'compact', compass: true}))
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
//         .pipe(sourcemaps.write('../scss/source/', {addComment: true}))
//         .pipe(gulp.dest(config.sass.dest))
//         // .pipe(browserSync.reload({stream:true}))
//         //         .on("error", handleError)
//         //         .on("error", notify.onError(function(error){return error.message;}))
//         // .pipe(plugins.notify({ message: 'The styles tasks are done!' }));
// });



// //js
// gulp.task('js', function() {
//     gulp.src('wp-content/themes/PROJECTNAME/js/src/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(uglify('scripts.min.js', {
//             outSourceMap: 'src/sourcemap.map',
//             basePath: '/wp-content/themes/PROJECTNAME/js/src/'
//         }))
//         .pipe(gulp.dest('wp-content/themes/PROJECTNAME/js/'));
// });

// //svg sprites
// var svg = svgSprites;
// gulp.task('sprite', function () {
//     gulp.src('wp-content/themes/PROJECTNAME/images/svg-raw/*.svg')
//         .pipe(svg({
//             defs: true,
//             generatePreview: false
//         }))
//         .pipe(gulp.dest("wp-content/themes/PROJECTNAME/images/svg-sprites"));
// });

// // //database
// // var config = {
// //     db: {
// //         local: {
// //             name: 'l1_00000000000000',
// //             user: 'root',
// //             pass: 'root',
// //             host: 'localhost',
// //             dumpDir: '.db/'
// //         }
// //     }
// // };
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

// /*------------------------------------*\
//     ::Watch
// \*------------------------------------*/
// //browsersync
// // Static Server + watching scss/html files
// gulp.task('watch', function() {

//     browserSync({
//         //eg http://10.0.1.254:8888/sites/zenman/zenman
//         proxy: "http://localhost:8888/sites/zen-build/"
//     });

//     gulp.watch('wp-content/themes/PROJECTNAME/sass/**/*.scss', ['css']);
//     gulp.watch('wp-content/themes/PROJECTNAME/js/src/**/*.js', ['js', reload]);
//     gulp.watch('wp-content/themes/PROJECTNAME/fonts/icons-raw/*.svg', ['icons', reload]);
//     gulp.watch('wp-content/themes/PROJECTNAME/images/svg-raw/*.svg', ['sprite', reload]);
//     gulp.watch("wp-content/themes/PROJECTNAME/**/*.{php,html}").on('change', reload);
// });

// /*------------------------------------*\
//     ::Task Combinations
// \*------------------------------------*/
// gulp.task('default', ['watch']);














// /*------------------------------------*\
//     ::Variables
// \*------------------------------------*/

// /*------------------------------------*\
//     ::Plugins
// \*------------------------------------*/
// var gulp    = require('gulp'),
// browserSync = require('browser-sync'),
// uglify      = require('gulp-uglifyjs'),
// jshint      = require('gulp-jshint'),
// compass     = require('gulp-compass'),
// prefix      = require('gulp-autoprefixer'),
// svgSprites  = require('gulp-svg-sprites'),
// shell       = require('gulp-shell'),
// notify      = require('gulp-notify'),
// cache       = require('gulp-cache'),
// exit        = require('gulp-exit'),
// reload      = browserSync.reload;

// /*------------------------------------*\
//     ::Handle Errors
// \*------------------------------------*/
// function handleError(err) {
//   console.log(err.toString());
//   this.emit('end');
// }

// /*------------------------------------*\
//     ::Task Definitions
// \*------------------------------------*/

// //js
// gulp.task('js', function() {
//     gulp.src('wp-content/themes/__MYTHEMEHERE__/js/src/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(uglify('scripts.min.js', {
//             outSourceMap: 'src/sourcemap.map',
//             basePath: '/wp-content/themes/__MYTHEMEHERE__/js/src/'
//         }))
//         .pipe(gulp.dest('wp-content/themes/__MYTHEMEHERE__/js/'));
// });

// //css
// gulp.task('css', function() {
//     gulp.src('wp-content/themes/__MYTHEMEHERE__/sass/*.scss')
//         .pipe(compass({
//             sourcemap: true,
//             quiet: true,
//             css: 'wp-content/themes/__MYTHEMEHERE__/',
//             sass: 'wp-content/themes/__MYTHEMEHERE__/sass',
//             image: 'wp-content/themes/__MYTHEMEHERE__/images',
//             style: 'compressed',
//             require: ['sass-globbing']
//         }))
//         .pipe(browserSync.reload({stream:true}))
//         .on("error", handleError)
//         .on("error", notify.onError(function(error){return error.message;}))
//         .pipe(notify({ message: 'Compiled Successfully!' }))
//         .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
//         .pipe(gulp.dest('wp-content/themes/__MYTHEMEHERE__/.'));
// });

// //svg sprites
// var svg = svgSprites;
// gulp.task('sprite', function () {
//     gulp.src('wp-content/themes/__MYTHEMEHERE__/images/svg-raw/*.svg')
//         .pipe(svg({
//             defs: true,
//             generatePreview: false
//         }))
//         .pipe(gulp.dest("wp-content/themes/__MYTHEMEHERE__/images/svg-sprites"));
// });

// //database
// // var config = {
// //     db: {
// //         local: {
// //             name: 'l1_00000000000000',
// //             user: 'root',
// //             pass: 'root',
// //             host: 'localhost',
// //             dumpDir: '.db/'
// //         }
// //     }
// // };
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

// /*------------------------------------*\
//     ::Watch
// \*------------------------------------*/
// //browsersync
// // Static Server + watching scss/html files
// gulp.task('watch', function() {

//     browserSync({
//         //eg http://10.0.1.254:8888/sites/zenman/zenman
//         proxy: "__YOUR_IP_AND_PATH_TO_SITE_HERE"
//     });

//     gulp.watch('wp-content/themes/__MYTHEMEHERE__/sass/**/*.scss', ['css']);
//     gulp.watch('wp-content/themes/__MYTHEMEHERE__/js/src/**/*.js', ['js', reload]);
//     gulp.watch('wp-content/themes/__MYTHEMEHERE__/fonts/icons-raw/*.svg', ['icons', reload]);
//     gulp.watch('wp-content/themes/__MYTHEMEHERE__/images/svg-raw/*.svg', ['sprite', reload]);
//     gulp.watch("wp-content/themes/__MYTHEMEHERE__/**/*.{php,html}").on('change', reload);
// });

// /*------------------------------------*\
//     ::Task Combinations
// \*------------------------------------*/
// gulp.task('default', ['watch']);

































// // browsersync
// /*------------------------------------*\
//     ::Variables
// \*------------------------------------*/

// /*------------------------------------*\
//     ::Plugins
// \*------------------------------------*/
// var gulp    = require('gulp'),
// browserSync = require('browser-sync'),
// uglify      = require('gulp-uglifyjs'),
// jshint      = require('gulp-jshint'),
// compass     = require('gulp-compass'),
// prefix      = require('gulp-autoprefixer'),
// svgSprites  = require('gulp-svg-sprites'),
// shell       = require('gulp-shell'),
// notify      = require('gulp-notify'),
// cache       = require('gulp-cache'),
// exit        = require('gulp-exit'),
// reload      = browserSync.reload;

// /*------------------------------------*\
//     ::Handle Errors
// \*------------------------------------*/
// function handleError(err) {
//   console.log(err.toString());
//   this.emit('end');
// }

// /*------------------------------------*\
//     ::Task Definitions
// \*------------------------------------*/

// //js
// gulp.task('js', function() {
//     gulp.src('wp-content/themes/__MYTHEMEHERE__/js/src/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(uglify('scripts.min.js', {
//             outSourceMap: 'src/sourcemap.map',
//             basePath: '/wp-content/themes/__MYTHEMEHERE__/js/src/'
//         }))
//         .pipe(gulp.dest('wp-content/themes/__MYTHEMEHERE__/js/'));
// });

// //css
// gulp.task('css', function() {
//     gulp.src('wp-content/themes/__MYTHEMEHERE__/sass/*.scss')
//         .pipe(compass({
//             sourcemap: true,
//             quiet: true,
//             css: 'wp-content/themes/__MYTHEMEHERE__/',
//             sass: 'wp-content/themes/__MYTHEMEHERE__/sass',
//             image: 'wp-content/themes/__MYTHEMEHERE__/images',
//             style: 'compressed',
//             require: ['sass-globbing']
//         }))
//         .pipe(browserSync.reload({stream:true}))
//         .on("error", handleError)
//         .on("error", notify.onError(function(error){return error.message;}))
//         .pipe(notify({ message: 'Compiled Successfully!' }))
//         .pipe(prefix('last 2 version', 'ie 10', 'ie 9'))
//         .pipe(gulp.dest('wp-content/themes/__MYTHEMEHERE__/.'));
// });

// //svg sprites
// var svg = svgSprites;
// gulp.task('sprite', function () {
//     gulp.src('wp-content/themes/__MYTHEMEHERE__/images/svg-raw/*.svg')
//         .pipe(svg({
//             defs: true,
//             generatePreview: false
//         }))
//         .pipe(gulp.dest("wp-content/themes/__MYTHEMEHERE__/images/svg-sprites"));
// });

// //database
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

// /*------------------------------------*\
//     ::Watch
// \*------------------------------------*/
// //browsersync
// // Static Server + watching scss/html files
// gulp.task('watch', function() {

//     browserSync({
//         //eg http://10.0.1.254:8888/sites/zenman/zenman
//         proxy: "__YOUR_IP_AND_PATH_TO_SITE_HERE"
//     });

//     gulp.watch('wp-content/themes/__MYTHEMEHERE__/sass/**/*.scss', ['css']);
//     gulp.watch('wp-content/themes/__MYTHEMEHERE__/js/src/**/*.js', ['js', reload]);
//     gulp.watch('wp-content/themes/__MYTHEMEHERE__/fonts/icons-raw/*.svg', ['icons', reload]);
//     gulp.watch('wp-content/themes/__MYTHEMEHERE__/images/svg-raw/*.svg', ['sprite', reload]);
//     gulp.watch("wp-content/themes/__MYTHEMEHERE__/**/*.{php,html}").on('change', reload);
// });

// /*------------------------------------*\
//     ::Task Combinations
// \*------------------------------------*/
// gulp.task('default', ['watch']);
















// // grunt-config.json
// {
//     "dir": {
//         "theme":                    "wp-content/themes/__THEME_NAME__/",
//         "css":                      "wp-content/themes/__THEME_NAME__/",
//         "sass":                     "wp-content/themes/__THEME_NAME__/sass/",
//         "images":                   "wp-content/themes/__THEME_NAME__/images/",
//         "generatedImages":          "wp-content/themes/__THEME_NAME__/images/",
//         "httpGeneratedImagesPath":  "images",
//         "dataURISrc":               "wp-content/themes/__THEME_NAME__/images/datauris/",
//         "dataURIDest":              "wp-content/themes/__THEME_NAME__/sass/planets/base/",
//         "iconsSrc":                 "wp-content/themes/__THEME_NAME__/fonts/icons-raw/",
//         "iconsDest":                "wp-content/themes/__THEME_NAME__/fonts/icons/",
//         "iconsCSSDest":             "wp-content/themes/__THEME_NAME__/sass/planets/base/",
//         "iconRelPath":              "fonts/icons/",
//         "fonts":                    "wp-content/themes/__THEME_NAME__/fonts/",
//         "db":                       ".db/"
//     },
//     "db": {
//         "local": {
//             "name":         "l1___THEME_NAME__",
//             "user":         "root",
//             "password":     "root",
//             "host":         "localhost"
//         }
//     }
// }

// // Gruntfile.js
// module.exports = function(grunt) {

//     // grunt configuration
//     grunt.initConfig({
//         // project-specific configuration
//         config: grunt.file.readJSON('grunt-config.json'),
//         pkg: grunt.file.readJSON('package.json'),
//         compass: {
//             options:{
//                 require: 'sass-globbing'
//             },
//             dist: {
//                 options: {
//                     sassDir: '<%= config.dir.sass %>',
//                     cssDir: '<%= config.dir.css %>',
//                     environment: 'production'
//                 }
//             },
//             dev: {
//                 options: {
//                     sassDir: '<%= config.dir.sass %>',
//                     cssDir: '<%= config.dir.css %>',
//                     imagesPath: '<%= config.dir.images %>',
//                     generatedImagesPath: "<%= config.dir.generatedImages %>",
//                     httpGeneratedImagesPath: "<%= config.dir.httpGeneratedImagesPath %>",
//                     outputStyle: 'expanded'
//                 }
//             }
//         },
//         autoprefixer: {
//             single_file: {
//                 options: {
//                     browsers: ['last 2 version', 'ie 10', 'ie 9']
//                 },
//                 src: '<%= config.dir.css %>style.css',
//                 dest: '<%= config.dir.css %>style.css'
//             }
//         },
//         watch: {
//             compass: {
//                 files: ['<%= config.dir.sass %>/**/*.{scss,sass}'],
//                 tasks: ['compass:dev','autoprefixer']
//             },
//             livereload: {
//                 files: ['<%= config.dir.theme %>/**/*.{css,html,php,js}'],
//                 options: {
//                     livereload: true
//                 }
//             }
//         },
//         datauri: {
//             default: {
//                 options: {
//                     classPrefix: 'datauri--'
//                 },
//                 src: [
//                     '<%= config.dir.dataURISrc %>*.{png,jpg,gif,jpeg}',
//                 ],
//                 dest: [
//                     '<%= config.dir.dataURIDest %>_datauris.scss'
//                 ]
//             }
//         },
//         shell: {
//             exportLocalDb: {
//                 command: [
//                     'echo "database export called"',
//                     'test -d .db || mkdir .db',
//                     'mysqldump -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p<%= config.db.local.password %> <%= config.db.local.name %> > <%= config.dir.db %>db.sql',
//                     'ls -lah <%= config.dir.db %>db.sql | awk \'{ print "export ran: "$9" is "$5}\''
//                 ].join('&&'),
//                 options: {
//                     stdout: true
//                 }
//             },
//             importLocalDb: {
//                 command: [
//                     'echo "database import called"',
//                     'mysqldump -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p\'<%= config.db.local.password %>\' --no-data <%= config.db.local.name %> | grep ^DROP | mysql -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p\'<%= config.db.local.password %>\' <%= config.db.local.name %>',
//                     'mysql -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p<%= config.db.local.password %> <%= config.db.local.name %> < <%= config.dir.db %>db.sql',
//                     'echo "import ran:"',
//                     'mysql -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p<%= config.db.local.password %> <%= config.db.local.name %> -e \'SHOW TABLES\''
//                 ].join('&&'),
//                 options: {
//                     stdout: true
//                 }
//             }
//         },
//         webfont: {
//             icons: {
//                 src: '<%= config.dir.iconsSrc %>*.svg',
//                 dest: '<%= config.dir.iconsDest %>',
//                 destCss: '<%= config.dir.iconsCSSDest %>',
//                 options: {
//                     htmlDemo: false,
//                     stylesheet: 'scss',
//                     relativeFontPath: '<%= config.dir.iconRelPath %>',
//                     templateOptions: {
//                         baseClass: 'icon',
//                         classPrefix: 'icon--'
//                     }
//                 }
//             }
//         }
//     });

//     // plugin loading
//     grunt.loadNpmTasks('grunt-contrib-compass');
//     grunt.loadNpmTasks('grunt-contrib-watch');
//     grunt.loadNpmTasks('grunt-datauri');
//     grunt.loadNpmTasks('grunt-shell');
//     grunt.loadNpmTasks('grunt-webfont');
//     grunt.loadNpmTasks('grunt-autoprefixer');

//     // task aliases
//     grunt.registerTask('default', ['watch']);
//     grunt.registerTask('dbexp', ['shell:exportLocalDb']);
//     grunt.registerTask('dbimp', ['shell:importLocalDb']);
// };

// // package.json
// {
//   "name": "zen-grunt",
//   "version": "1.1.0",
//   "description": "The Zenman team's default grunt setup",
//   "author": {
//     "name": "The Zenman dev team",
//     "email": "dev@zenman.com",
//     "url": "http://www.zenman.com"
//   },
//   "homepage": "http://git.zenman.com/tcmulder/zen-grunt",
//   "license": "MIT",
//   "repository": {
//     "type": "git",
//     "url": "http://git.zenman.com/tcmulder/zen-grunt"
//   },
//   "devDependencies": {
//     "grunt": "~0.4.1",
//     "grunt-contrib-compass": "~0.6.0",
//     "grunt-contrib-watch": "~0.4.3",
//     "grunt-datauri": "~0.4.0",
//     "grunt-shell": "~0.6.1",
//     "grunt-webfont": "~0.2.2",
//     "grunt-autoprefixer": "~0.7.2"
//   }
// }
