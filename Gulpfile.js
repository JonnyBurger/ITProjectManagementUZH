var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');


var paths = {
	less: 'less/*'
}

gulp.task('less', _ => {
	return gulp.src(paths.less)
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
		.pipe(gulp.dest('build/css'));
});

gulp.task('watch', _ => {
	gulp.watch(paths.less, ['less'])
});

gulp.task('default', ['watch']);