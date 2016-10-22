var gulp = require('gulp');
var ts = require("gulp-typescript");
var tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')});
var sourcemaps = require('gulp-sourcemaps');

gulp.task('ts', function () {
	return gulp.src(['./server/**/*.ts', '!./server/**/*.spec.ts'])
	.pipe(sourcemaps.init())
	.pipe(ts(tsProject))
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest('./server'));
});


gulp.task('watch', function() {
	gulp.start(["ts"]);
	gulp.watch(['./server/**/*.ts'], ['ts']);
});

gulp.task('default', ["ts"]);