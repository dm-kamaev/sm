'use strict';

const path = require('path');

const gulp = require('gulp'),
    typescript = require('gulp-typescript');

const tsconfigPath = path.resolve(__dirname, '../tsconfig.json');

const tsProject = typescript.createProject(tsconfigPath);

const tsCompile = function() {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(gulp.dest('./'));
};

module.exports = tsCompile;
