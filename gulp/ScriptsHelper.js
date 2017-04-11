'use strict';

const fs = require('fs-extra');
const path = require('path');
const Path = require('./Path');

let getDirectories = function(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
};

let upLetter = function(string, index) {
    return string.slice(0, index) +
        string[index].toUpperCase() +
        string.slice(index + 1);
};

let getEnteryPointFromName = function(fileName) {
    let name = fileName.replace(/l-/, ''); // Remove l-
    let slice = upLetter(name, 0); // doc => Doc
    let modifier = '',
        index;

    if (~slice.indexOf('_')) {
        modifier = name.replace(/\w*(?=_)(_)/, '');
        modifier = upLetter(modifier, 0);

        slice = slice.replace(/_\w*/, '');
    }

    while ((index = slice.indexOf('-')) != -1) {
        slice = upLetter(slice, index + 1);
        slice = slice.slice(0, index) + slice.slice(index + 1);
    }

    return `sm.l${slice}.${slice}${modifier}.Initer`;
};

/**
 * Check that in given directory has layout script with given filename and
 * it initer
 * @param {string} layoutDirectoryPath
 * @param {string} layoutName
 * @return {boolean}
 */
const checkFiles = function(layoutDirectoryPath, layoutName) {
    const layoutScriptPath = path.join(layoutDirectoryPath, `${layoutName}.js`);
    const islayoutScriptExists = fs.existsSync(layoutScriptPath);
    if (!islayoutScriptExists) {
        console.log(
            `There is no layout script in directory: ${layoutDirectoryPath}.` +
            `Expected layout script filepath: ${layoutScriptPath}.`
        );
    }

    const layoutIniterName = 'Initer.js';
    const layoutIniterPath = path.join(layoutDirectoryPath, layoutIniterName);
    const isLayoutIniterExists = fs.existsSync(layoutIniterPath);
    if (!isLayoutIniterExists) {
        console.log(
            `There is no layout initer in directory: ${layoutDirectoryPath}.` +
            `Expected layout initer filepath: ${layoutIniterPath}.`
        );
    }

    return isLayoutIniterExists && islayoutScriptExists;
};

module.exports = {
    getEntryPoints: function() {
        let blocks = path.join(__dirname, Path.BLOCKS_DIR),
            outputFiles = getDirectories(blocks)
                .filter(dirname => dirname.startsWith('n-'))
                .map(directory => {
                    let directoryPath = path.join(blocks, directory);
                    return getDirectories(directoryPath)
                        .filter(dirname => dirname.startsWith('l-'))
                        .filter(name =>
                            checkFiles(path.join(directoryPath, name), name))
                        .map(name => {
                            return {
                                fileName: name + '.js',
                                entryPoint: getEnteryPointFromName(name)
                            };
                        });
                })
                .reduce((prev, curr) => {
                    return prev.concat(curr);
                }, []);

        return outputFiles;
    },
    filterEntryPoints: function(entryPoints, opt_layout) {
        let res = entryPoints;

        if (opt_layout) {
            let fileName = opt_layout.replace(/\.js$/, '') + '.js',
                pointsFound = entryPoints.filter(item =>
                    item.fileName == fileName
                );

            if (pointsFound.length) {
                res = pointsFound;
            } else {
                console.log('WARN: "' + fileName + '" not found');
            }
        }

        return res;
    }
};
