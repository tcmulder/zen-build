var config = {
    site: {
        client: 'CLIENTNAME',
        proj:   'PROJECTNAME'
    },
    url: {
        root: 'http://localhost:8888/sites/CLIENTNAME/PROJECTNAME'
    },
    sass: {
        src:    './wp-content/themes/PROJECTNAME/sass/',
        dest:   './wp-content/themes/PROJECTNAME/'
    },
    js: {
        src:    [
            './wp-content/themes/PROJECTNAME/js/map-src/**/*.js',
            './wp-content/themes/PROJECTNAME/js/scripts-src/**/*.js'
        ],
        dest:    [
            './wp-content/themes/PROJECTNAME/js/map.min.js',
            './wp-content/themes/PROJECTNAME/js/scripts.min.js'
        ]
    },
    svg: {
        src:    './wp-content/themes/PROJECTNAME/images/svg/',
        dest:   './wp-content/themes/PROJECTNAME/images/svg/'
    },
    watch: {
        src: [
            './wp-content/themes/PROJECTNAME/**/*.{php,html,js,css}'
        ]
    },
    db: {
        local: {
            name: 'l1_PROJECTNAME',
            user: 'root',
            pass: 'root',
            host: 'localhost',
            prefix: 'wp_',
            dumpDir: '.db/',
            dumpFile: 'db.sql'
        }
    }
}
module.exports = config;
