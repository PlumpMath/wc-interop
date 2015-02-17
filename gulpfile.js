var path = require('path');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var bower = require('gulp-bower');

var SRC = path.join(__dirname, 'src');
var BUILD = path.join(__dirname, 'build');

gulp.task('build', ['build-lib', 'build-css', 'build-jquery', 'build-react', 'build-ember']);

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest(path.join(BUILD, 'bower')));
});

gulp.task('build-lib', function() {
	return gulp.src(path.join(SRC, 'lib/**/*'))
		.pipe(gulp.dest(path.join(BUILD, 'lib')));
});

gulp.task('build-css', function() {
	return gulp.src(path.join(SRC, 'css/**/*'))
		.pipe(gulp.dest(path.join(BUILD, 'css')));
});

// jQuery
gulp.task('build-jquery', ['build-jquery-js', 'build-jquery-html']);

gulp.task('build-jquery-js', function() {
	return gulp.src(path.join(SRC, 'jquery', 'js/main.js'))
		.pipe(browserify())
		.pipe(gulp.dest(path.join(BUILD, 'jquery', 'js')));
});

gulp.task('build-jquery-html', function() {
	return gulp.src(path.join(SRC, 'jquery', 'index.html'))
		.pipe(gulp.dest(path.join(BUILD, 'jquery')));
});

// React
gulp.task('build-react', ['build-react-js', 'build-react-html']);

gulp.task('build-react-js', function() {
	return gulp.src(path.join(SRC, 'react', 'js/main.js'))
		.pipe(browserify({
			transform: [ reactify ]
		}))
		.pipe(gulp.dest(path.join(BUILD, 'react', 'js')));
});

gulp.task('build-react-html', function() {
	return gulp.src(path.join(SRC, 'react', 'index.html'))
		.pipe(gulp.dest(path.join(BUILD, 'react')));
});


// Ember
gulp.task('build-ember', [ 'bower', 'build-ember-js', 'build-ember-html' ]);

gulp.task('build-ember-js', function() {
	return gulp.src(path.join(SRC, 'ember', 'js/main.js'))
		.pipe(browserify())
		.pipe(gulp.dest(path.join(BUILD, 'ember', 'js')));
});

gulp.task('build-ember-html', function() {
	return gulp.src(path.join(SRC, 'ember', 'index.html'))
		.pipe(gulp.dest(path.join(BUILD, 'ember')));
});

// TODO refactor all the path making code-it's getting so repetitively ugly

gulp.task('watch', function() {
	gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['build', 'watch']);
