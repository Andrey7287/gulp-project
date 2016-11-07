var gulp = require('gulp');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('compass', function() {
	gulp.src('./sass/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(compass({
			config_file: './config.rb',
			css: './',
			sass: 'sass'
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('babel', () => {
		return gulp.src('./js/src/my.js')
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(sourcemaps.init())
			.pipe(babel({
					presets: ['es2015']
			}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./js'));
});

gulp.task('concat', function(){
	return gulp.src(['./node_modules/jquery/dist/jquery.min.js',
									 './node_modules/jquery-fancybox/source/js/jquery.fancybox.pack.js', './node_modules/slick-carousel/slick/slick.min.js',
									 './js/src/my.js'])
	.pipe(concat('./js/project.js'))
	.pipe(gulp.dest('./'))
});

gulp.watch('./sass/*.scss', ['compass']);
gulp.watch('./js/src/my.js', ['babel']);
gulp.watch('./js/my.js', ['concat']);

gulp.task('default', ['babel', 'concat', 'compass'], function() {
	browserSync.init({
		server: ".",
		files: ["css.css", "js/src/*.js", "*.html"]
	});
});
