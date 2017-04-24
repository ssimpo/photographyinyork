'use strict';

const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const header = require('gulp-header');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const debug = require('gulp-debug');

const jsBuild = [
	'./src/scripts/interval.js',
	'./src/scripts/slider.js',
	'./src/scripts/testimonials.js',
	'./src/scripts/index.js'
];

gulp.task('sass', () => {
	fs.readFile('./src/header.txt', 'utf8', (err, stylesHeader) => {
		if (err) throw err;

		gulp.src(['./src/scss/*.scss'])
			.pipe(sourcemaps.init())
			.pipe(sass({
				outputStyle: 'compressed',
				includePaths: ['./lib/foundation-sites/scss']
			}).on('error', gutil.log))
			//.pipe(rebaseUrls())
			.pipe(cleanCSS({
				advanced: true,
				keppSpecialComments: 0,
				restructuring: true
			}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./'))
			.on('end', ()=>{
				gulp.src(['./style.css'])
					.pipe(header(stylesHeader))
					.pipe(gulp.dest('./'))
			})
	});
});

gulp.task('minify', ()=>gulp.src(jsBuild)
	//.pipe(debug())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(concat('index.js'))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./scripts/'))
	.on('end', ()=>gulp.src(jsBuild)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('index.min.js'))
		.pipe(babel())
		.pipe(uglify().on('error', gutil.log))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./scripts/'))
	)
);