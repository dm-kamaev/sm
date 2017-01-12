'use strict';

const gulp = require('gulp');
const path = require('path');

const svgSprite = require('gulp-svg-sprites');
const gulpFilter = require('gulp-filter');

const Path = require('./Path');
const gulpConfig = require('../app/config/base/config.json');

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
            layout: 'diagonal',
            cssFile: 'svg-sprite.scss',
            svgPath: gulpConfig.lastBuildTimestamp ?
                '/static/images/g-icon_auto-svg-sprite.svg' + '?' +
                    gulpConfig.lastBuildTimestamp :
                '%f',
            svg: {
                sprite: 'images/g-icon_auto-svg-sprite.svg'
            },
            padding: 5
        }));

    let streamSvg = streamSprite
        .pipe(gulpFilter('**/*.svg'))
        .pipe(gulp.dest(path.join(__dirname, '../', Path.SHARED_STATIC_DIR)));

    let streamScss = streamSprite
        .pipe(gulpFilter('**/*.scss'))
        .pipe(gulp.dest(path.join(__dirname, '../build')));

    return Promise.all([streamSvg, streamScss]);
};
