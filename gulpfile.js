var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	stylus = require('gulp-stylus'),
	connect = require('gulp-connect');

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
    	.pipe(stylus())
    	.pipe(gulp.dest('build/styles/'));
});

// less
gulp.task('less', function() {
});

// js
gulp.task('js', function() {
});

// watch
gulp.task('watch', function() {
	gulp.watch('src/*.jade', ['jade']);
	gulp.watch('src/styles/*.scss', ['sass']);
});

gulp.task('default', function() {
	gulp.start('connect', 'watch');
});