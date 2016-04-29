/*------------------------------------*\
    ::Common Configuration
    ----------------------------------*
    ::version 2.0.8

    common configuration options
    typical for most projects
\*------------------------------------*/
var config = {
    site: {
        // client folder name
        client: 'CLIENTNAME',
        // project folder name
        proj:   'PROJECTNAME'
    },
    url: {
        // address of the home page
        root: 'http://localhost/sites/CLIENTNAME/PROJECTNAME'
    },
    sass: {
        // location to look for sass files - expects a relative path ending in "/"
        // uses globbing for sub directories and files
        src:    './wp-content/themes/PROJECTNAME/sass/',
        // destination for compiled css file - expects a relative path ending in "/"
        dest:   './wp-content/themes/PROJECTNAME/'
    },
    js: {
        // name of script to process (must not contain a "-" character)
        scripts: {
            // destination of files to process - can use globbing
            src: './wp-content/themes/PROJECTNAME/js/scripts-src/**/*.js',
            // destination of output file - expects path and filename
            dest: './wp-content/themes/PROJECTNAME/js/scripts.min.js'
        }
        // you can add additional script objects using the same format as the above object
        // each will be available for processing separately
        // (e.g. you can run gulp js-scripts for the above script)
    },
    svg: {
        // name of svg sprite to process (must not contain a "-" character)
        general: {
            // destination of files to process - can use globbing
            src: './wp-content/themes/PROJECTNAME/images/general-src/**/*.svg',
            // destination of output file - expects path and (optionally) a filename
            dest: './wp-content/themes/PROJECTNAME/images/general.sprite.svg'
        }
    },
    watch: {
        // files to watch - can accept a string or an array of strings
        src: './wp-content/themes/PROJECTNAME/**/*.{php,html}'
    },
    db: {
        // local database configuration
        local: {
            // database name
            name: 'l1_PROJECTNAME',
            // database user
            user: 'root',
            // database password
            pass: 'root',
            // database host
            host: 'localhost',
            // table prefix
            prefix: 'wp_',
            // destination for dumped backup files
            dumpDir: '.db/',
            // filename for dumped backup files
            dumpFile: 'db.sql'
        }
    }
};

/*------------------------------------*\
    ::Project Specific Configuration
    ----------------------------------*
    atypical configuration options
    applicable to this project only
\*------------------------------------*/
// egsample:
// config.someOptionName = {
//     someOptionProperty: 'Some Option Value'
// };

/*------------------------------------*\
    ::Object Export to for Gulp
\*------------------------------------*/
module.exports = config;
