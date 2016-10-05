module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false
            },
			dist: {
				files: grunt.file.expandMapping(['src/**/*.js', '!src/**/*min.js', '!src/Resources/Widgets/DNN/VisibilityWidget.js'], 'compressed/')
			}
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};