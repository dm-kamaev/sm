const fs = require('fs-extra');
const path = require('path');
const Path = require('./Path');

var getDirectories = function(srcpath)  {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
};

var upLetter = function (string, index) {
    return string.slice(0, index) +
        string[index].toUpperCase() +
        string.slice(index+1);
};

var getEnteryPointFromName = function (name) {
    name = name.replace(/l-/g, ''); // Remove l-
    var slice = upLetter(name, 0); // doc => Doc
    var k;
    while ((k = slice.indexOf('-')) != -1){
        slice = upLetter(slice, k+1);
        slice = slice.slice(0, k) + slice.slice(k+1);
    }
    return 'sm.l' + slice + '.' + slice;
};

module.exports = {
    getEntryPoints: function() {
        var blocks = path.join(__dirname, Path.BLOCKS_DIR),
            outputFiles = getDirectories(path.join(__dirname, Path.BLOCKS_DIR))
                .filter(dirname => dirname.startsWith('l-'))
                .filter(name => fs.existsSync(path.join(blocks, name, name) + '.js'))
                .map(name => {
                    return {
                        fileName: name + '.js',
                        entryPoint: getEnteryPointFromName(name)
                    }
                });

        return outputFiles;
    },
    filterEntryPoints: function(entryPoints, opt_layout) {
        var res = entryPoints;

        if (opt_layout) {
            var fileName = opt_layout.replace(/\.js$/, '') + '.js',
                pointsFound = entryPoints.filter(item => item.fileName == fileName);

            if (pointsFound.length) {
                res = pointsFound;
            }
            else {
                console.log('WARN: "' + fileName + '" not found');
            }
        }

        return res;
    }
};
