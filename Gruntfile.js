'use strict';

module.exports = function(grunt) {
  var paths = {
    jade: ['app/views/**/*.jade'],
    js: ['client/js/*.js', 'client/js/**/*.js'],
    css: ['dist/css/app.css', 'client/**/*.css'],
    less: ['client/**/*.less'],
    distCss: ['dist/css/app.css']
  };

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('server/package.json'),
    assets: grunt.file.readJSON('client/assets.json'),
    clean: ['client/dist'],
    watch: {
      jade: {
        files: paths.jade,
        options: {
          livereload: true,
        },
      },
      js: {
        files: '<%= assets.js %>',
        tasks: ['concat', 'jshint', 'uglify'],
        options: {
          livereload: true,
        }
      },
      // css: {
      //   files: paths.distCss,
      //   options: {
      //     livereload: true
      //   }
      // }
    },
    less: {
      prod: {
        options: {
          cleancss: true,
          compress: true,
          paths: paths.less
        },
        files: {
          'client/dist/css/app.css': 'client/less/index.less'
        }
      },
      dev: {
        options: {
          paths: paths.less
        },
        files: {
          'client/dist/css/app.min.css': 'client/less/index.less'
        }
      }
    },
    jade: {
      compile: {
        files: [{
          cwd: "client/views",
          src: "**/*.jade",
          dest: "client/dist/views",
          expand: true,
          ext: ".html"
        }]
      }
    },
    // useminPrepare: {
    //   html: 'html/index.html',
    //   options: {
    //     root: '.',
    //     dest: '.'
    //   }
    // },
    // usemin: {
    //   html: 'index.html',
    //   options: {
    //     assetsDir: ['dist/']
    //   }
    // },
    // htmlmin: {
    //   dist: {
    //     files: {
    //       'index.html': 'html/index.html'
    //     }
    //   }
    // },
    concat: {
      dev: {
        src: '<%= assets.js %>',
        dest: 'client/dist/js/app.min.js'
      },
      prod: {
        src: '<%= assets.js %>',
        dest: 'client/dist/js/app.concat.js'
      }
    },
    jshint: {
      all: {
        src: 'client/dist/js/app.concat.js',
        options: {
          jshintrc: true
        }
      }
    },
    ngAnnotate: {
      options: {
        add: true,
        singleQuotes: true
      }
    },
    uglify: {
      production: {
        options: {
          mangle: false
        },
        files: {
          'client/dist/js/app.min.js': 'client/dist/js/app.concat.js'
        }
      }
    },
    lesslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: paths.less
    },
    cssmin: {
      combine: {
        files: '<%= assets.css %>'
      }
    },
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          ext: 'js',
          watch: ['server'],
          nodeArgs: ['--debug']
        }
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 1337,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': true,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
  });

  require('load-grunt-tasks')(grunt);

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  grunt.registerTask('server', ['express:dev', 'watch']);

  //Test task.
  // grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
  // grunt.registerTask('test', ['build', 'mocha_phantomjs']);

  // grunt.registerTask('build', ['clean', 'less', 'jade', 'useminPrepare', 'uglify', 'cssmin', 'htmlmin', 'usemin']);

  grunt.registerTask('build:prod', ['clean', 'less:prod', 'jade', 'concat:prod', 'ngAnnotate', 'uglify', 'cssmin']);
  grunt.registerTask('build:dev', ['clean', 'less:dev', 'jade', 'concat:dev']);


  grunt.registerTask('default', ['build:prod', 'nodemon:dev', 'watch']);

};