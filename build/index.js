import gulp from 'gulp';
import rename from 'gulp-rename';
import stylus from 'gulp-stylus';
import nib from 'nib';
import minify from 'gulp-minify-css';

const src = './src/**/*.styl';

gulp.task('default', ['build']);

gulp.task('build', ['min', 'dev']);

gulp.task('min', () =>
	gulp.src(src)
		// not using `compress: true` because included css doesn't get minified
		.pipe(stylus({ use: nib(), 'include css': true }))
		.pipe(minify())
		.pipe(rename(path => {
			path.basename = 'chroma.min';
		}))
		.pipe(gulp.dest('./lib'))
);

gulp.task('dev', () =>
	gulp.src(src)
		.pipe(stylus({ use: nib(), 'include css': true }))
		.pipe(rename(path => {
			path.basename = 'chroma';
		}))
		.pipe(gulp.dest('./lib'))
);
