'use strict';

const gulp = require('gulp');
const path = require('path');

const svgSprite = require('gulp-svg-sprites');
const gulpFilter = require('gulp-filter');

const Path = require('./Path');

module.exports = function() {
    let streamSprite = gulp
        .src(path.join(
            __dirname,
            Path.BLOCKS_DIR,
            '/n-clobl/g-icon/g-icon_img/*.svg'
        ))
        .pipe(svgSprite({
            preview: false,
            selector: '%f',
            common: 'g-icon_svg',
            cssFile: 'svg-sprite.scss',
            svgPath: '%f',
            svg: {
                sprite: 'images/g-icon_auto-svg-sprite.svg'
            }
        }));

    streamSprite
        .pipe(gulpFilter('**/*.svg'))
        .pipe(gulp.dest(
            path.join(__dirname, '../', Path.SHARED_STATIC_DIR)
        ));

    streamSprite
        .pipe(gulpFilter('**/*.scss'))
        .pipe(gulp.dest(path.join(__dirname, '../build')));
};
