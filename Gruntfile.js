module.exports = function(grunt) {
  var jsSrc = [
    'path/to/a/file.js',
    'oh/nice/globs/*.js',
    'whoa/dude/**/*.js'
  ];

  var cssSrc = [
    'path/to/css/file.css',
    'css/stylin/on/*.css',
    'path/**/*.css'
  ];

  grunt.initConfig({
    jshint: {
      files: jsSrc,
      options: {
        globals: {
          angular: true,
          jQuery: true,
          otherglobal: true
        }
      }
    },
    watch: {
      files: jsSrc.concat(cssSrc),
      tasks: ['default'],
      options: {
        livereload: true,
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: jsSrc,
        dest: 'public/dist/main.js',
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'public/dist/main.min.js': ['public/dist/main.js']
        }
      }
    },
    concat_css: {
      options: {
        // Task-specific options go here.
      },
      all: {
        src: cssSrc,
        dest: "dist/main.css"
      },
    },
    cssmin: {
      css: {
        src: 'dist/main.css',
        dest: 'dist/main.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // TODO: Add jshint back and make the code pass it?
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin']);
};
