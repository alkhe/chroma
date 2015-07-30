import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import stylus from 'gulp-stylus';
import nib from 'nib';
import minify from 'gulp-minify-css';
import jade from 'gulp-jade';

const src = './src/**/*.styl';
const jades = './jade/**/*.jade';

gulp.task('default', ['build']);

gulp.task('build', ['min', 'dev']);
gulp.task('watch', () => {
	gulp.watch(src, ['dev']);
	gulp.watch(jades, ['examples']);
});

gulp.task('min', () =>
	gulp.src(src)
		.pipe(plumber())
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
		.pipe(plumber())
		.pipe(stylus({ use: nib(), 'include css': true }))
		.pipe(rename(path => {
			path.basename = 'chroma';
		}))
		.pipe(gulp.dest('./lib'))
);

gulp.task('examples', () =>
	gulp.src(jades)
		.pipe(jade())
		.pipe(gulp.dest('./examples'))
);
