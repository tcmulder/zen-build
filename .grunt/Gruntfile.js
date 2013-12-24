module.exports = function(grunt) {

    // grunt configuration
    grunt.initConfig({
        // project-specific configuration
        config: grunt.file.readJSON('config.json'),
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: '<%= config.dir.sass %>',
                    cssDir: '<%= config.dir.css %>',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    sassDir: '<%= config.dir.sass %>',
                    cssDir: '<%= config.dir.css %>',
                    imagesPath: '<%= config.dir.images %>',
                    generatedImagesPath: "<%= config.dir.images %>",
                    httpGeneratedImagesPath: "images",
                    outputStyle: 'expanded'
                }
            }
        },
        watch: {
            compass: {
                files: ['<%= config.dir.sass %>/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            livereload: {
                files: ['<%= config.dir.template %>/**/*.{css,html,php,js}'],
                options: {
                    livereload: true
                }
            }
        },
        datauri: {
            default: {
                options: {
                    classPrefix: 'datauri-'
                },
                src: [
                    '<%= config.dir.datauris %>*.{png,jpg,gif,jpeg}',
                ],
                dest: [
                    '<%= config.dir.sass %>partials/_datauris.scss'
                ]
            }
        },
        shell: {
            exportLocalDb: {
                options: {
                    stdout: true
                },
                command: [
                    'mysqldump -h<%= config.db.host %> -u<%= config.db.user %> -p<%= config.db.password %> <%= config.db.name %> > <%= config.dir.db %>db.sql',
                    'ls -lah <%= config.dir.db %>db.sql | awk \'{ print $9" is "$5}\''
                ].join('&&')
            },
            importLocalDb: {
                options: {
                    stdout: true
                },
                command: [
                    'mysqldump -h<%= config.db.host %> -u<%= config.db.user %> -p\'<%= config.db.password %>\' --no-data <%= config.db.name %> | grep ^DROP | mysql -h<%= config.db.host %> -u<%= config.db.user %> -p\'<%= config.db.password %>\' <%= config.db.name %>',
                    'mysql -h<%= config.db.host %> -u<%= config.db.user %> -p<%= config.db.password %> <%= config.db.name %> < <%= config.dir.db %>db.sql',
                    'mysql -h<%= config.db.host %> -u<%= config.db.user %> -p<%= config.db.password %> <%= config.db.name %> -e \'SHOW TABLES\''
                ].join('&&')
            }
        }
    });

    // plugin loading
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-datauri');
    grunt.loadNpmTasks('grunt-shell');

    // task aliases
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('expdb', ['shell:exportLocalDb']);
    grunt.registerTask('impdb', ['shell:importLocalDb']);
};