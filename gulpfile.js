const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const util = require('gulp-util');
const uglify = require('gulp-uglify');
const soy = require('gulp-soy');
const sass = require('gulp-ruby-sass');

const production = !!util.env.production;

gulp.task('soy', function () {
    return gulp.src(path.resolve(__dirname, 'dev/blocks/**/*.soy'))
        .pipe(soy())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(path.resolve(__dirname, 'tmp')));
});

gulp.task('scripts', ['soy'], function () {
    return gulp.src([path.resolve(__dirname, 'tmp/template.js'), path.resolve(__dirname, 'dev/blocks/**/*.js')])
        .pipe(concat('script.js'))
        .pipe(production ? uglify() : util.noop())
        .pipe(gulp.dest(path.resolve(__dirname, 'public')));
});

gulp.task('styles', function () {
    return sass([path.resolve(__dirname, 'dev/blocks/**/*.scss'), path.resolve(__dirname, 'dev/**/*.css')])
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 4 versions', 'ie >= 9'],
            cascade: false
        }))
        .pipe(production ? cssnano() : util.noop())
        .pipe(gulp.dest(path.resolve(__dirname, 'public')));
});

gulp.task('images', function () {
    return gulp.src(path.resolve(__dirname, 'dev/blocks/**/*.png'))
        .pipe(gulp.dest(path.resolve(__dirname, 'public/images')));
});

gulp.task('fonts', function () {
    return gulp.src(path.resolve(__dirname, 'dev/fonts/*'))
        .pipe(gulp.dest(path.resolve(__dirname, 'public/fonts')));
});

gulp.task('shared', function () {
    return gulp.src(path.resolve(__dirname, 'dev/shared/*'))
        .pipe(gulp.dest(path.resolve(__dirname, 'public/shared')));
});

gulp.task('watch', function () {
    gulp.watch(path.resolve(__dirname, 'dev/js/**/*.js'), ['scripts']);
    gulp.watch(path.resolve(__dirname, 'dev/css/**/*.scss'), ['styles']);
});

const tasks = function (bool) {
    return bool ? ['soy', 'scripts', 'images', 'styles', 'fonts', 'shared'] : ['watch', 'soy', 'scripts', 'images', 'styles', 'fonts']
}

gulp.task('default', tasks(production));
