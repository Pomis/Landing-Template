/*
	1. бидл по шаблону.
		.footer.jade
		.header.jade
		.content.jade
			-> page+number.html
	2. сжатие всех .html
	3. билд index.jade -> index.php (в корне каталога)
	4. сжатие index.php
	5. компиляция всех .Styus -> .css
	6. объединение всех .css
	7. сжатие всех .css
	8. объединение всех .js
	9. сжатие всех .js 

	# file sys
		build/
			imgs
			styles/
				style.min.css
			scripts/
				script.min.css
			pages/
				page.html
			index.php
		scr/
			imgs/
				image.png
			styles/
				style0.styl
				style1.styl
			scripts/
				script0.js
				script1.js
			pages/
				page0.jade
				page1.jade
			template/
				header.jade
				footer.jade
			index.jade #routing
		node_modules
		gruntfile.js
		package.json
		.gitignore
		install.sh
		README.md


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
    	.pipe(gulp.dest('build/styles/'))//,
    	//.pipe(connect.reload());
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