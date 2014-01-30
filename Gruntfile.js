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
					'bower_components/jquery/jquery.js',
					// bowerのhoganはおかしかったのでnpmから入れた
					'node_modules/hogan.js/web/builds/2.0.0/hogan-2.0.0.js',
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
			},
			lib: {
				options: {
					sourceMap: 'js/lib.js.map',
					sourceMappingURL: 'lib.js',
					preserveComments: 'some',
				},
				files: {
					'js/lib.min.js': '<%= concat.jslib.dest %>',
				},
			},
			app: {
				options: {
					sourceMap: 'js/app.js.map',
					sourceMappingURL: 'app.js',
				},
				files: {
					'js/app.min.js': '<%= concat.js.dest %>'
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


	require('jit-grunt')(grunt);

	grunt.registerTask('js', ['hogan', 'coffee', 'concat:jslib', 'concat:js', 'uglify', 'clean']);
	grunt.registerTask('css', ['concat:csslib', 'compass']);
	grunt.registerTask('default', ['js', 'css', 'imagemin']);
};
