'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');;
const webpack = require('gulp-webpack');
const named = require('vinyl-named');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

gulp.task('serve', function() {
	gulp.src('./app/')
		.pipe(webserver({
			livereload: true,
			directoryListing: false,
			open: true
		}));
});

gulp.task('build', function() {
	return gulp.src(['app/jsx/index.jsx'])
		.pipe(named())
		.pipe(webpack({
			output: {
				filename: 'index.js'
			},
			externals: {
				'react': 'React'
			},
			resolve: {
				alias: {
					classnames: 'classnames',
					foundation:  __dirname +  '/app/lib/react-foundation/src/index.js'
				},
				extensions: ['', '.webpack.js', '.web.js', 'min.js', '.js', '.jsx', '.json'],
				modulesDirectories: ['app/lib']
			},
			module: {
				loaders: [{
					test: /\.jsx$/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'react']
					}
				}, {
					test: /\.js$/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015']
					}
				}]
			},
			devtool: 'source-map',
			plugins: [
				new UglifyJSPlugin({
					sourceMap: true
				})
			]
		}))
		.pipe(gulp.dest('app/scripts/'));
});