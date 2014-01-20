module.exports = function ( grunt ) {
  
  /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  

  

  /**
   * This is the configuration object Grunt uses to give each plugin its 
   * instructions.
   */
  var taskConfig = {
    watch: {
      scripts: {
        files: [
          'www/*.html',
          'www/js/**/*.js', 
          'www/css/**/*.css', 
          'www/spec/**/*.js',
          'www/res/**/*.*',
          'www/img/**/*.*', 
        ],
        tasks: ['exec:prepare'],
        options: {
          spawn: false,
        },
      },
    },
    exec: {
      prepare: {
        command: 'cordova prepare',
      },
      build: {
        command: 'cordova build',
      },
      run: {
        command: 'cordova run'
      }
    }

  };

  grunt.initConfig( grunt.util._.extend( taskConfig ) );

  
  grunt.registerTask( 'default', [ 'watch' ] );
  grunt.registerTask( 'run', ['exec:prepare', 'exec:build', 'exec:run' ] );


  

};
