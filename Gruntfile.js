module.exports = function(grunt) {

    // grunt configuration
    grunt.initConfig({
        // project-specific configuration
        config: grunt.file.readJSON('grunt-config.json'),
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options:{
                require: 'sass-globbing'
            },
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
                    generatedImagesPath: "<%= config.dir.generatedImages %>",
                    httpGeneratedImagesPath: "<%= config.dir.httpGeneratedImagesPath %>",
                    outputStyle: 'expanded'
                }
            }
        },
        autoprefixer: {
            single_file: {
                options: {
                    browsers: ['last 2 version', 'ie 10', 'ie 9']
                },
                src: '<%= config.dir.css %>style.css',
                dest: '<%= config.dir.css %>style.css'
            }
        },
        watch: {
            compass: {
                files: ['<%= config.dir.sass %>/**/*.{scss,sass}'],
                tasks: ['compass:dev','autoprefixer']
            },
            livereload: {
                files: ['<%= config.dir.theme %>/**/*.{css,html,php,js}'],
                options: {
                    livereload: true
                }
            }
        },
        datauri: {
            default: {
                options: {
                    classPrefix: 'datauri--'
                },
                src: [
                    '<%= config.dir.dataURISrc %>*.{png,jpg,gif,jpeg}',
                ],
                dest: [
                    '<%= config.dir.dataURIDest %>_datauris.scss'
                ]
            }
        },
        shell: {
            exportLocalDb: {
                command: [
                    'echo "database export called"',
                    'test -d .db || mkdir .db',
                    'mysqldump -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p<%= config.db.local.password %> <%= config.db.local.name %> > <%= config.dir.db %>db.sql',
                    'ls -lah <%= config.dir.db %>db.sql | awk \'{ print "export ran: "$9" is "$5}\''
                ].join('&&'),
                options: {
                    stdout: true
                }
            },
            importLocalDb: {
                command: [
                    'echo "database import called"',
                    'mysqldump -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p\'<%= config.db.local.password %>\' --no-data <%= config.db.local.name %> | grep ^DROP | mysql -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p\'<%= config.db.local.password %>\' <%= config.db.local.name %>',
                    'mysql -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p<%= config.db.local.password %> <%= config.db.local.name %> < <%= config.dir.db %>db.sql',
                    'echo "import ran:"',
                    'mysql -h<%= config.db.local.host %> -u<%= config.db.local.user %> -p<%= config.db.local.password %> <%= config.db.local.name %> -e \'SHOW TABLES\''
                ].join('&&'),
                options: {
                    stdout: true
                }
            }
        },
        webfont: {
            icons: {
                src: '<%= config.dir.iconsSrc %>*.svg',
                dest: '<%= config.dir.iconsDest %>',
                destCss: '<%= config.dir.iconsCSSDest %>',
                options: {
                    htmlDemo: false,
                    stylesheet: 'scss',
                    relativeFontPath: '<%= config.dir.iconRelPath %>',
                    templateOptions: {
                        baseClass: 'icon',
                        classPrefix: 'icon--'
                    }
                }
            }
        }
    });

    // plugin loading
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-datauri');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // task aliases
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dbexp', ['shell:exportLocalDb']);
    grunt.registerTask('dbimp', ['shell:importLocalDb']);
};