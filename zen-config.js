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
        map: {
            src: './wp-content/themes/PROJECTNAME/js/map-src/**/*.js',
            dest: './wp-content/themes/PROJECTNAME/js/map.min.js'
        },
        scripts: {
            src: './wp-content/themes/PROJECTNAME/js/scripts-src/**/*.js',
            dest: './wp-content/themes/PROJECTNAME/js/scripts.min.js'
        }
    },
    svg: {
        some: {
            src: './wp-content/themes/PROJECTNAME/images/some-src/**/*.svg',
            dest: './wp-content/themes/PROJECTNAME/images/some-sprite/'
        },
        another: {
            src: './wp-content/themes/PROJECTNAME/images/another-src/**/*.svg',
            dest: './wp-content/themes/PROJECTNAME/images/another-sprite/'
        }
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
