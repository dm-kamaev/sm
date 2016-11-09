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

let getEnteryPointFromName = function(name) {
    name = name.replace(/l-/, ''); // Remove l-
    let slice = upLetter(name, 0); // doc => Doc
    let k;
    while ((k = slice.indexOf('-')) != -1) {
        slice = upLetter(slice, k + 1);
        slice = slice.slice(0, k) + slice.slice(k + 1);
    }
    return 'sm.l' + slice + '.' + slice;
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
                        .filter(name => fs.existsSync(
                            path.join(directoryPath, name, name) + '.js')
                        )
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
