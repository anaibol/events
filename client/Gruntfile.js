module.exports = function(grunt) {
  var paths = {
    jade: ['app/views/**/*.jade'],
    js: ['js/*.js', 'js/**/*.js'],
    css: ['dist/css/app.css', '**/*.css'],
    less: ['**/*.less'],
    distCss: ['dist/css/app.css']
  };

  // Project grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('../server/package.json'),
    assets: grunt.file.readJSON('assets.json'),
    clean: ['dist', 'tmp'],
    less: {
      prod: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {
          'tmp/css/app.min.css': 'less/index.less'
        }
      },
      dev: {
        files: {
          'dist/css/app.min.css': 'less/index.less'
        }
      }
    },
    uncss: {
      dist: {
        options: {
          htmlroot: 'tmp'
        },
        files: {
          'dist/css/app.min.css': ['tmp/views/*.html', 'tmp/views/**/*.html']
        }
      }
    },
    jade: {
      compile: {
        files: [{
          cwd: 'views',
          src: '**/*.jade',
          dest: 'tmp/views',
          expand: true,
          ext: '.html',
        }],
      },
      options: {
        pretty: true,
        doctype: 'html'
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
        //   collapseBooleanAttributes: true,
        //   collapseWhitespace: true,
        //   removeAttributeQuotes: true,
        //   removeComments: true,
        //   removeEmptyAttributes: true,
        //   removeRedundantAttributes: true,
        //   removeScriptTypeAttributes: true,
        //   removeStyleLinkTypeAttributes: true
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
    // jshint: {
    //   all: {
    //     src: 'tmp/js/app.concat.js',
    //     options: {
    //       jshintrc: true
    //     }
    //   }
    // },
    ngAnnotate: {
      options: {
        add: true,
        singleQuotes: true
      },
      annotate: {
        files: [{
          cwd: 'js',
          src: '**/*.js',
          dest: 'tmp/js/annotated',
          expand: true
        }]
      },
    },
    uglify: {
      all: {
        files: {
          'dist/js/app.min.js': 'tmp/js/app.concat.js'
        }
        // ,
        // compress: {
        //   sequences: true,
        //   properties: true,
        //   dead_code: true,
        //   drop_debugger: true,
        //   unsafe: true,
        //   conditionals: true,
        //   comparisons: true,
        //   evaluate: true,
        //   booleans: true,
        //   loops: true,
        //   unused: true,
        //   drop_console: true,
        //   cascade: true,
        //   join_vars: true,
        //   if_return: true
        // }
      }
    },
    lesslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: paths.less
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
    watch: {
      jade: {
        files: ['views/*.jade', 'views/**/*.jade'],
        tasks: ['html2js', 'concat:dev'],
        options: {
          livereload: true,
        },
      },
      js: {
        // files: ['js/*.js', 'js/**/*.js', 'lib/**/*.js'],
        tasks: ['concat:dev'],
        options: {
          livereload: true,
        }
      },
      less: {
        files: ['less/*.less, less/**/*.less'],
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      },
      assets: {
        files: ['assets.json'],
        options: {
          livereload: true
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
    concurrent: {
      tasks: ['nodemon', 'watch', 'node-inspector'],
      options: {
        limit: 5,
        logConcurrentOutput: true
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

  //Test task.
  // grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
  // grunt.registerTask('test', ['build', 'mocha_phantomjs']);

  // grunt.registerTask('build', ['clean', 'less', 'jade', 'useminPrepare', 'uglify', 'cssmin', 'htmlmin', 'usemin']);

  grunt.registerTask('build:prod', ['clean', 'less:prod', 'jade', 'ngAnnotate', 'uncss', 'html2js', 'concat:prod', 'uglify']);
  grunt.registerTask('build:dev', ['clean', 'less:dev', 'html2js', 'concat:dev']);

  grunt.registerTask('prod', ['build:prod', 'concurrent']);
  grunt.registerTask('default', ['build:dev', 'concurrent']);

};