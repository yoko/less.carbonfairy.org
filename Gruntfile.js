module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: ['js/template.js'],

		coffee: {
			dist: {
				files: {
					'js/app.js': 'js/src/*.coffee',
				},
			},
		},

		compass: {
			dist: {
				options: {
					config: 'css/src/config.rb',
				},
			},
		},

		concat: {
			jslib: {
				src: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/hogan/web/builds/3.0.2/hogan-3.0.2.js',
				],
				dest: 'js/lib.js',
			},

			js: {
				src: [
					'js/template.js',
					'js/app.js',
				],
				dest: 'js/app.js',
			},

			csslib: {
				src: [
					'bower_components/normalize-css/normalize.css',
				],
				dest: 'css/lib.css',
			},
		},

		hogan: {
			compile: {
				options: {
					namespace: 'templates',
					defaultName: function(filepath) {
						return filepath.replace(/^.*\/(.+)\.mustache$/, '$1');
					},
					prettify: true,
					templateOptions: {
						asString: true,
						// Tumblrの「{ }」にもGruntの「<% %>」にも被らない指定を適当に
						delimiters: '<? ?>',
					},
				},
				files: {
					'js/template.js': 'templates/*.mustache',
				},
			},
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/',
				}],
			},
		},

		jshint: {
			src: {
				options: {
					jshintrc: '.jshintrc',
				},
				src: [
					'js/src/app.js',
				],
			},
		},

		uglify: {
			options: {
				compress: true,
				report: 'min',
				sourceMap: true,
			},
			lib: {
				files: {
					'js/lib.min.js': '<%= concat.jslib.dest %>',
				},
			},
			app: {
				files: {
					'js/app.min.js': '<%= concat.js.dest %>',
				}
			}
		},

		watch: {
			dist: {
				files: ['js/src/*', 'css/src/*'],
				tasks: ['default'],
			},
		},
	});


	require('jit-grunt')(grunt, {
		hogan: 'grunt-templates-hogan',
	});

	grunt.registerTask('js', ['hogan', 'coffee', 'concat:jslib', 'concat:js', 'uglify', 'clean']);
	grunt.registerTask('css', ['concat:csslib', 'compass']);
	grunt.registerTask('default', ['js', 'css', 'imagemin']);
};
