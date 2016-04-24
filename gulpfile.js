/*
	1. компилировать jade -> html
	2. сжимать html
	3. компилировать Stylud -> css
	4. ставить перфексы для браузеров в css
	5. сжать css
	6. сжать все js файлы
*/

var gulp = require('gulp'),				// Gulp
	jade = require('gulp-jade'), 		// шаблонизатор для html
	sass = require('gulp-sass'), 		// препроцессор css
	stylus = require('gulp-stylus'),	// препроцессор css
	connect = require('gulp-connect'); 	// локальный сервер для быстрого просмотра имзменений в файлах

// server
gulp.task('connect', function() {
	connect.server({
		root: 'build/',
		livereload: true
	});
});

// jade
gulp.task('jade', function() {
	return gulp.src('src/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

// sass
gulp.task('sass', function() {
	return gulp.src('src/styles/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('build/styles/'))
		.pipe(connect.reload());
});

// stylus
gulp.task('stylus', function() {
	return gulp.src('src/styles/*.styl')
    	.pipe(stylus({compress: true}))
    	.pipe(gulp.dest('build/styles/')),
    	.pipe(connect.reload());
});

// js
gulp.task('js', function() {

});

// watch
gulp.task('watch', function() {
	gulp.watch('src/*.jade', ['jade']);
	gulp.watch('src/styles/*.scss', ['sass']);
	gulp.watch('src/styles/*.styl', ['stylus']);
	gulp.watch('src/scripts/*.js', ['js']);

});

gulp.task('default', function() {
	gulp.start('connect', 'watch', 'jade', 'sass', 'stylus', 'js');
});