const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const util = require('gulp-util');
const uglify = require('gulp-uglify');
const soy = require('gulp-soy');
const sass = require('gulp-sass');

const production = !!util.env.production;

const BLOCKS_DIR = 'dev/blocks';
const COMPILED_SOY_DIR = 'tmp';
const COMPILED_SOY_FILE = 'templates.js';


gulp.task('soy', function () {
    return gulp.src(path.resolve(__dirname, BLOCKS_DIR, '**/*.soy'))
        .pipe(soy())
        .pipe(concat(COMPILED_SOY_FILE))
        .pipe(gulp.dest(path.resolve(__dirname, COMPILED_SOY_DIR)));
});

gulp.task('scripts', ['soy'], function () {
    return gulp.src([
        path.resolve(__dirname, COMPILED_SOY_DIR, COMPILED_SOY_FILE),
        path.resolve(__dirname, BLOCKS_DIR, '**/*.js')
    ])
        .pipe(concat('script.js'))
        .pipe(production ? uglify() : util.noop())
        .pipe(gulp.dest(path.resolve(__dirname, 'public')));
});

gulp.task('styles', function () {
    return gulp.src([
        path.resolve(__dirname, BLOCKS_DIR, '/**/*.scss'),
        path.resolve(__dirname, BLOCKS_DIR, '/**/*.css')
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 4 versions', 'ie >= 9'],
            cascade: false
        }))
        .pipe(production ? cssnano() : util.noop())
        .pipe(gulp.dest(path.resolve(__dirname, 'public')));
});

gulp.task('images', function () {
    return gulp.src(path.resolve(__dirname, BLOCKS_DIR, '**/*.png'))
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
    gulp.watch([
        path.resolve(__dirname, COMPILED_SOY_DIR, COMPILED_SOY_FILE),
        path.resolve(__dirname, BLOCKS_DIR, '**/*.js')
    ], ['scripts']);
    gulp.watch([
        path.resolve(__dirname, BLOCKS_DIR, '**/*.scss'),
        path.resolve(__dirname, BLOCKS_DIR, '**/*.css')
    ], ['styles']);
    gulp.watch(
        path.resolve(__dirname, BLOCKS_DIR, '**/*.soy'),
        ['soy']);
});

const tasks = function (bool) {
    return bool ?
        ['soy', 'scripts', 'images', 'styles', 'fonts', 'shared'] :
        ['watch', 'soy', 'scripts', 'images', 'styles'];
};

gulp.task('default', tasks(production));
