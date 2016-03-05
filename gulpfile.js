var gulp = require('gulp'),
	babel = require('gulp-babel'),
	stylus = require('gulp-stylus');

gulp.task('babel', () => {
	gulp.src('./src/**/**/**.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/assets'))
});

gulp.task('stylus', () => {
	gulp.src('./src/stylus/**.styl')
		.pipe(stylus({
			compress: true
		}))
		.pipe(gulp.dest('./public/assets/css'))
});

gulp.task('watcher', () => {
	gulp.watch('./src/**/**/**.js', ['babel']);
	gulp.watch('./src/stylus/**.styl', ['stylus']);
});

gulp.task('default', ['babel', 'stylus']);
gulp.task('watch', ['default', 'watcher']);
