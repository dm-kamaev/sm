const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const util = require('gulp-util');
const uglify = require('gulp-uglify');
const soy = require('gulp-soy');

const production = !!util.env.production;

gulp.task('soy', function () {
    return gulp.src(path.resolve(__dirname, 'dev/templates/*.soy'))
        .pipe(soy());
});

gulp.task('scripts', ['soy'], function () {
    return gulp.src([path.resolve(__dirname, 'dev/js/lib/*.js'), path.resolve(__dirname, 'dev/**(!lib)/*.js'), path.resolve(__dirname, 'dev/**/*.js')])
        .pipe(concat('script.js'))
        .pipe(production ? uglify() : util.noop())
        .pipe(gulp.dest(path.resolve(__dirname, 'public')));
});

gulp.task('css', function () {
    return gulp.src([path.resolve(__dirname, 'dev/css/lib/*.css'), path.resolve(__dirname, 'dev/**(!lib)/*.css'), path.resolve(__dirname, 'dev/**/*.css')])
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 4 versions', 'IE>=9'],
            cascade: false
        }))
        .pipe(production ? cssnano() : util.noop())
        .pipe(gulp.dest(path.resolve(__dirname, 'public')));
});

gulp.task('images', function () {
    return gulp.src(path.resolve(__dirname, 'dev/images/**/*'))
        .pipe(gulp.dest(path.resolve(__dirname, 'public/images')));
});

gulp.task('fonts', function () {
    return gulp.src(path.resolve(__dirname, 'dev/fonts/**/*'))
        .pipe(gulp.dest(path.resolve(__dirname, 'public/fonts')));
});

gulp.task('shared', function () {
    return gulp.src(path.resolve(__dirname, 'dev/shared/*'))
        .pipe(gulp.dest(path.resolve(__dirname, 'public/shared')));
});

gulp.task('watch', function () {
    gulp.watch(path.resolve(__dirname, 'dev/js/**/*.js'), ['scripts']);
    gulp.watch(path.resolve(__dirname, 'dev/css/**/*.css'), ['css']);
});

const tasks = function (bool) {
    return bool ? ['scripts', 'images', 'css', 'fonts', 'shared'] : ['watch', 'scripts', 'images', 'css', 'fonts']
}

gulp.task('default', tasks(production));
