'use strict';

module.exports = function(grunt) {
  var paths = {
    jade: ['app/views/**/*.jade'],
    js: ['js/*.js', 'js/**/*.js'],
    css: ['dist/css/app.css', '**/*.css'],
    less: ['**/*.less'],
    distCss: ['dist/css/app.css']
  };

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('../server/package.json'),
    assets: grunt.file.readJSON('assets.json'),
    clean: ['dist'],
    watch: {
      jade: {
        files: paths.jade,
        options: {
          livereload: true,
        },
      },
      js: {
        files: 'dist/css/app.min.js',
        tasks: ['concat', 'jshint'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: 'dist/css/app.min.css',
        options: {
          livereload: true
        }
      }
    },
    less: {
      prod: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {
          'tmp/css/app.css': 'less/index.less'
        }
      },
      dev: {
        files: {
          'dist/css/app.min.css': 'less/index.less'
        }
      }
    },
    jade: {
      compile: {
        files: [{
          cwd: "views",
          src: "**/*.jade",
          dest: "views",
          expand: true,
          ext: ".html"
        }]
      }
    },
    html2js: {
      main: {
        src: ['views/*.jade', 'views/**/*.jade'],
        dest: 'tmp/js/templates.js'
        // src: ['views/*.html', 'views/**/*.html'],
        // dest: 'tmp/js/templates.js'
      },
      options: {
        jade: {
          //this prevents auto expansion of empty arguments
          //e.g. "div(ui-view)" becomes "<div ui-view></div>" 
          //     instead of "<div ui-view="ui-view"></div>"
          doctype: "html"
        },
        base: '',
        singleModule: true,
        module: 'wooepa-templates',
        rename: function(moduleName) {
          return moduleName.replace('views/', '').replace('.jade', '');
        },
        quoteChar: '\'',
        // htmlmin: {
        // collapseBooleanAttributes: true,
        // collapseWhitespace: true,
        // removeAttributeQuotes: true,
        // removeComments: true,
        // removeEmptyAttributes: true,
        // removeRedundantAttributes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true
        // }
      }
    },
    concat: {
      dev: {
        src: '<%= assets.js %>',
        dest: 'dist/js/app.min.js'
      },
      prod: {
        src: '<%= assets.js %>',
        dest: 'tmp/js/app.concat.js'
      }
    },
    jshint: {
      all: {
        src: 'tmp/js/app.concat.js',
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
      prod: {
        files: {
          'dist/js/app.min.js': 'tmp/js/app.concat.js'
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
      dev: {
        combine: {
          files: {
            'dist/css/app.min.css': '<%= assets.css %>'
          }
        }
      },
      prod: {
        combine: {
          files: {
            'tmp/css/app.min.css': '<%= assets.css %>'
          }
        }
      }
    },
    nodemon: {
      dev: {
        script: '../server/server.js',
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

  grunt.registerTask('build:prod', ['clean', 'less:prod', 'html2js', 'concat:prod', 'ngAnnotate', 'uglify', 'cssmin']);
  grunt.registerTask('build:dev', ['clean', 'less:dev', 'html2js', 'concat:dev']);


  grunt.registerTask('default', ['build:dev', 'nodemon:dev', 'watch']);

};