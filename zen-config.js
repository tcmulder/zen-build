// Explain the whole thing bigly
module.exports = {
    // explain what this one is...
    site: {
        client: 'zen-build',
        proj:   'TEMPLATENAME'
    },
    sass: {
        src:    './wp-content/themes/PROJECTNAME/sass/',
        dest:   './wp-content/themes/PROJECTNAME/'
    },
    js: {
        src:    './wp-content/themes/TEMPLATENAME/js/',
        dest:   './wp-content/themes/TEMPLATENAME/js/'
    },
    svg: {
        src:    './wp-content/themes/TEMPLATENAME/images/svg/',
        dest:   './wp-content/themes/TEMPLATENAME/images/svg/'
    },
    watch: {
        src: [
            './wp-content/themes/TEMPLATENAME/**/*.{php,html,js,css}'
        ]
    },
    db: {
        local: {
            name: 'l1_TEMPLATENAME',
            user: 'root',
            pass: 'root',
            host: 'localhost',
            dumpDir: '.db/'
        }
    }
    //,
    // this gulpfile already handles from/to,
    // otherwise you'd put those here. If you
    // do add strings here, they will overwrite
    // those auto-generated from the gulpfile.
    // url: {
    //     src: '',
    //     dest: ''
    // }

};
