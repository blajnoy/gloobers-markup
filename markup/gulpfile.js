'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 20 versions'],
			cascade: false
		}))
		//.pipe(cleanCSS(''))
		.pipe(rename('all.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function() {
	gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', function() {
	
});
