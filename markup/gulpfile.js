'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require('gulp.spritesmith'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css');




var fontName = 'gloobers-icons',
	cssClass = 'gl-ico';

gulp.task('iconfont', function(){
	gulp.src(['assets/icons/*.svg'])
		.pipe(iconfontCss({
			fontName: fontName,
			cssClass: cssClass,
			path: 'assets/css/templates/_icons.scss',
			targetPath: '../../../sass/_icons.scss',
			fontPath: '../fonts/icons/'
		}))
		.pipe(iconfont({
			prependUnicode: true,
			formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
			fontName: fontName,
			normalize: true
		}))
		.pipe(gulp.dest('public/fonts/icons/'));
});


gulp.task('sass', function() {
	return gulp.src('sass/all/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 20 versions'],
			cascade: false
		}))
		//.pipe(cleanCSS(''))
		.pipe(rename('all.css'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('sass:watch', function() {
	gulp.watch('sass/all/**/*.scss', ['sass']);
});

gulp.task('coming', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 20 versions'],
			cascade: false
		}))
		//.pipe(cleanCSS(''))
		.pipe(rename('coming-soon.css'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('coming:watch', function() {
	gulp.watch('sass/**/*.scss', ['coming']);
});


/* start pdf */
gulp.task('pdf', function() {
	return gulp.src('sass/pdf/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 20 versions'],
			cascade: false
		}))
		.pipe(rename('pdf.css'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('pdf:watch', function() {
	gulp.watch('sass/pdf/**/*.scss', ['pdf']);
});
/* end start pdf */


/* start 404 */
gulp.task('page404', function() {
	return gulp.src('sass/page404/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 20 versions'],
			cascade: false
		}))
		.pipe(rename('page404.css'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('page404:watch', function() {
	gulp.watch('sass/page404/**/*.scss', ['page404']);
});
/* end start 404 */

gulp.task('sprite', function () {
	var spriteData = gulp.src('assets/png/*.png').pipe(spritesmith({
		imgPath: '../public/images/sprite.png',
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}));
	var imgStream = spriteData.img
		.pipe(gulp.dest('images'));

	var cssStream = spriteData.css
		.pipe(gulp.dest('public/css'));

	return cssStream, imgStream;

});

gulp.task('default', function() {
	
});
