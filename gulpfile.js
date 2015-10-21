const gulp = require('gulp');
const gulpHelper = require('./node_modules/frobl/gulp-helper.js').use(gulp);
const path = require('path');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const util = require('gulp-util');
const uglify = require('gulp-uglify');
const soynode = require('gulp-soynode');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const gulpFilter = require('gulp-filter');
const apidoc = require('gulp-apidoc');

const production = !!util.env.production;

const BLOCKS_DIR = '/dev/blocks';
const COMPILED_SOY_DIR = '/node_modules/frobl/tmp/';
const COMPILED_SOY_FILE = 'templates.js';



gulp.task('doc', function () {
    apidoc({
        src: "./app/modules/",
        dest: "./doc"
    }, function() {
    });
});

gulp.task('appES5', function () {
    return gulp.src('app.js')
        .pipe(babel())
        .pipe(concat('appES5.js'))
        .pipe(gulp.dest(''));
});

gulp.task('soy', function () {
    return gulpHelper.soy(['./dev/blocks/**/*.soy']);

});


gulp.task('scripts', ['soy'], function () {
    return gulpHelper.buildJs(
        [
            path.join(__dirname, BLOCKS_DIR, '/**/*.js')
        ],
        'script.js',
        'sm.lDoc.Doc',
        path.join(__dirname, '/public'),
        production
    );
});

gulp.task('styles', function () {
    return gulpHelper.buildCss([{
        src: [
            path.join(__dirname, BLOCKS_DIR, '/**/*.scss'),
            path.join(__dirname, BLOCKS_DIR, '/**/*.css')
        ],
        fileName: 'styles.css'
    }], production, path.join(__dirname, '/public'));
});




gulp.task('images', function () {
    return gulp.src(path.join(__dirname + BLOCKS_DIR + '/**/*.png'))
        .pipe(gulp.dest(path.join(__dirname + '/public/images')));
});

gulp.task('fonts', function () {
    return gulp.src(path.join(__dirname + '/dev/fonts/*'))
        .pipe(gulp.dest(path.join(__dirname + '/public/fonts')));
});

gulp.task('shared', function () {
    return gulp.src(path.join(__dirname + '/dev/shared/*'))
        .pipe(gulp.dest(path.join(__dirname + '/public/shared')));
});

gulp.task('watch', function () {
    gulp.watch([
        path.join(__dirname + BLOCKS_DIR + '/**/*.soy'),
        path.join(__dirname + BLOCKS_DIR + '/**/*.js')
    ], ['scripts']);
    gulp.watch([
        path.join(__dirname + BLOCKS_DIR + '/**/*.scss'),
        path.join(__dirname + BLOCKS_DIR + '/**/*.css')
    ], ['styles']);
});

const tasks = function (bool) {
    return bool ?
        ['soy', 'scripts', 'images', 'styles', 'fonts', 'shared'] :
        ['watch', 'soy', 'scripts', 'images', 'styles', 'fonts'];
};

gulp.task('default', tasks(production));
