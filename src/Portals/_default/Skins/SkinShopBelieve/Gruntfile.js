module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: {
                    'js/believeJS.min.js': ['js/believeJS.js', 'js/CookieHelper.js', 'js/ShopBelieve.js', 'js/SiteMessage.js', 'js/WebAPIHelper.js', 'js/fbLoad.js']
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'css/style.min.css': ['css/Style.css']
                }
            }
        },
        teamcity: {
            options: {
                // Task-specific options go here. 
            },
            all: {}
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-teamcity');

    // Default task(s).
    grunt.registerTask('default', ['teamcity', 'uglify', 'cssmin']);
};