module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     compass: {               // Task
        dist: {                   // Target
          options: {            // Target options
            sassDir: 'sass',
            cssDir: 'stylesheets',
            environment: 'production'
          }
        },
        dev: {                    // Another target
          options: {
            sassDir: 'sass',
            cssDir: 'stylesheets',
            outputStyle: 'expanded'
          }
        }
      },
    watch: {
      css: {
        files: 'sass/**/*.scss',
        tasks: ['compass:dev'],
        options: {
          livereload: true,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('compile', ['compass:dev']);
};