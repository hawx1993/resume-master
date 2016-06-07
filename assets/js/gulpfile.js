/**
 * Created by trigkit4 on 16/6/3.
 */
var gulp        =   require('gulp');
var rename      =   require('gulp-rename');
var less        =   require('gulp-less');
var handlebars  =   require('gulp-compile-handlebars');
var browserSync =   require('browser-sync').create();
var cssmin      =   require('gulp-cssmin');
var plumber     =   require('gulp-plumber');
var runSequence =   require('run-sequence');
var plugins = require('gulp-load-plugins')();

// markdown syntax support
var markdownify = function (json) {
    var jsonStr = JSON.stringify(json);

    return JSON.parse(
        jsonStr
            .replace(/(\*{2})(.*?)\1/g, '<strong>$2</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/(\\{2})\[([^\\]*)\1\]\1\(([^\\]*)\1\)/g, '<a href=\'$3\' target=\'_blank\'>$2</a>')
    )
};

//compile handlebars
gulp.task('handlebars', function () {
    return gulp
        .src('src/handlebars/index.hbs')
        .pipe(
            plumber()
        )
        .pipe(
            handlebars(
                markdownify(require('./resume.json')),{
                    ignorePartials: false,
                    batch: ['src/handlebars/partials']
                }
            )
        )
        .pipe(
            rename('index.html')
        )
        .pipe(
            gulp.dest('build')
        )
        .pipe(
            browserSync.stream()
        )
});

//compile less
gulp.task('less', function () {
    return gulp
        .src('src/less/index.less')
        .pipe(
            plumber()
        )
        .pipe(
            less()
        )
        .pipe(
            gulp.dest('build/assets/css')
        )
        .pipe(
            browserSync.stream()
        )
});

//copy static files to build/assets
gulp.task('copy:static', function () {
    return gulp
        .src(['src/!(handlebars)/**'])
        .pipe(
            gulp.dest('build/assets')
        )
});

//copy js to build/assets/js
gulp.task('copy:js', function () {
    return gulp
        .src([
            'bower_components/jquery/dist/jquery.js',
            'script.js'
        ])
        .pipe(
            gulp.dest('build/assets/js')
        )
        .pipe(
            browserSync.stream()
        )
});

//minify css files
gulp.task('cssmin', function () {
    return gulp
        .src('build/assets/css/*.css')
        .pipe(
            cssmin()
        )
        .pipe(
            gulp.dest('build/assets/css')
        )
});

gulp.task('compile', [
        'handlebars',
        'less'
    ]);

gulp.task('build', function (cb) {
    runSequence(
        [
            'compile',
            'copy:static',
            'copy:js'
        ],
        cb
    )
});

gulp.task('dev',['build'], function () {
    browserSync.init({
        server: 'build',
        port: 1234
    });

    gulp.watch('src/less/**/*.less',['less']);
    gulp.watch([
        'src/handlebars/**/*.hbs',
        './resume.json'
    ], ['handlebars']);

    gulp.watch('*.js', function () {
        return gulp
            .src('*.js')
            .pipe(gulp.dest('build/assets/js'))
            .pipe(
                browserSync.stream()
            );
        })
});
gulp.task('build-for-deploy',['less','handlebars']);

//deploy to github pages
gulp.task('deploy', ['build-for-deploy'], function() {
    return gulp.src('./build/**/*')
        .pipe(plugins.ghPages());
});

gulp.task('default', ['compile']);
