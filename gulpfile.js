var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create();

var paths = {
	assetsSrc: [
		'node_modules/impress.js/js/impress.js',
		'node_modules/jquery/dist/jquery.min.js',
	],
	assetsDest: 'www/assets',

	scriptsSrc: 'js/**/*.js',
	scriptsDest: 'www/assets',
	scriptsWatch: 'js/**/*.js',

	stylesSrc: 'scss/*.scss',
	stylesDest: 'www/assets',
	stylesWatch: 'scss/**/*.scss',

	distWatch: 'www/**/*.{html,jpg,png,svg}',
	serveDir: 'www',
};

gulp.task('assets', function() {
	gulp.src(paths.assetsSrc)
		.pipe(gulp.dest(paths.assetsDest));
});

gulp.task('scripts', function() {
	gulp.src(paths.scriptsSrc)
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.on('error', notify.onError({title: 'Uglify Error', message: '<%=error%>'}))
		.pipe(gulp.dest(paths.scriptsDest))
		.pipe(browserSync.stream());
});

gulp.task('styles', function() {
	gulp.src(paths.stylesSrc)
		.pipe(sassGlob())
		.pipe(sass())
		.on('error', notify.onError({title: 'Sass Error', message: '<%=error%>'}))
		.pipe(cssnano())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', '> 1%']
		}))
		.pipe(gulp.dest(paths.stylesDest))
		.pipe(browserSync.stream());
});

gulp.task('build', ['assets', 'scripts', 'styles']);

gulp.task('default', ['build'], function() {
	browserSync.init({
		open: false,
		server: {
			baseDir: paths.serveDir,
		},
	});

	gulp.watch(paths.distWatch).on('change', browserSync.reload);
	gulp.watch(paths.scriptsWatch, ['scripts']);
	gulp.watch(paths.stylesWatch, ['styles']);
});
