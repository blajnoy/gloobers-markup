'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require('gulp.spritesmith');

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

gulp.task('sprite', function () {
	var spriteData = gulp.src('assets/png/*.png').pipe(spritesmith({
		imgPath: '../images/sprite.png',
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}));
	var imgStream = spriteData.img
		.pipe(gulp.dest('images'));

	var cssStream = spriteData.css
		.pipe(gulp.dest('css'));

	return cssStream, imgStream;

});

gulp.task('default', function() {
	
});
