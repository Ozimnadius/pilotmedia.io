var gulp = require('gulp');
var gcmq = require('gulp-group-css-media-queries');

gulp.task('default', function () {
    gulp.src('css/main.css')
        .pipe(gcmq())
        .pipe(gulp.dest('css/main.qcmq.css'));
});