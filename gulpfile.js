var gulp = require('gulp'),
	babel = require('gulp-babel');

gulp.task('babel', () => {
	gulp.src('./src/**/**/**.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/assets'))
});

gulp.task('watch', () => {
	gulp.watch('./src/**/**.js', ['babel']);
});

gulp.task('default', ['babel', 'watch']);
