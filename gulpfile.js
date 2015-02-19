var path = require('path');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var bower = require('gulp-bower');
var exposify = require('exposify');

var SRC = path.join(__dirname, 'src');
var BUILD = path.join(__dirname, 'build');

var paths = getPaths(['jquery', 'react', 'ember', 'angular']);

gulp.task('build', ['build-lib', 'build-css', 'build-jquery', 'build-react', 'build-ember', 'build-angular']);

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
	return gulp.src(paths.jquery.js.src)
		.pipe(browserify())
		.pipe(gulp.dest(paths.jquery.js.dst));
});

gulp.task('build-jquery-html', function() {
	return gulp.src(paths.jquery.html.src)
		.pipe(gulp.dest(paths.jquery.html.dst));
});

// React
gulp.task('build-react', ['build-react-js', 'build-react-html']);

gulp.task('build-react-js', function() {
	return gulp.src(paths.react.js.src)
		.pipe(browserify({
			transform: [ reactify ]
		}))
		.pipe(gulp.dest(paths.react.js.dst));
});

gulp.task('build-react-html', function() {
	return gulp.src(paths.react.html.src)
		.pipe(gulp.dest(paths.react.html.dst));
});


// Ember
gulp.task('build-ember', [ 'bower', 'build-ember-js', 'build-ember-html' ]);

gulp.task('build-ember-js', function() {
	return gulp.src(paths.ember.js.src)
		.pipe(browserify())
		.pipe(gulp.dest(paths.ember.js.dst));
});

gulp.task('build-ember-html', function() {
	return gulp.src(paths.ember.html.src)
		.pipe(gulp.dest(paths.ember.html.dst));
});

function getPaths(frameworks) {
	var out = {};
	frameworks.forEach(function(framework) {
		var paths = {
			js: getPathsJS(framework),
			html: getPathsHTML(framework)
		};
		out[framework] = paths;
	});
	return out;
}

// Angular
gulp.task('build-angular', [ 'build-angular-js', 'build-angular-html']);

gulp.task('copy-angular', function() {

	var angularLib = path.join(__dirname, 'node_modules', 'angular', 'angular.js');
	var dst = path.join(paths.angular.html.dst, 'js');
	console.log(angularLib, dst);
	return gulp.src(angularLib)
		.pipe(gulp.dest(dst));

});

gulp.task('build-angular-js', function() {

	exposify.config = {
		expose: {
			angular: 'angular'
		}
	};
	
	return gulp.src(paths.angular.js.src)
		.pipe(browserify({
			transform: [ exposify ]
		}))
		.pipe(gulp.dest(paths.angular.js.dst));

});

gulp.task('build-angular-html', function() {
	return gulp.src(paths.angular.html.src)
		.pipe(gulp.dest(paths.angular.html.dst));
});

//

function getPathsJS(framework) {
	return {
		src: path.join(SRC, framework, 'js/main.js'),
		dst: path.join(BUILD, framework, 'js'),
	};
}

function getPathsHTML(framework) {
	return {
		src: path.join(SRC, framework, 'index.html'),
		dst: path.join(BUILD, framework)
	};
}

gulp.task('watch', function() {
	gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['build', 'watch']);
