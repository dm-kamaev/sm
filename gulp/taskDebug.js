const scriptsHelper = require('./ScriptsHelper.js');
const minimist = require('minimist');

var knownOptions = {
    string: 'layout',
    default: { layout: '' }
};

var options = minimist(process.argv.slice(2), knownOptions);


module.exports = function(gulpHelper) {
    var entryPoints = scriptsHelper.getEntryPoints(),
        filteredEntryPoints = scriptsHelper.filterEntryPoints(
            entryPoints,
            options.layout
        );

    return function() {
        return gulpHelper.js.build({
            outputFiles: filteredEntryPoints,
            compile: true,
            compilerFlags: {
                debug: true
            },
            dest: './public/shared'
        });
    };
};
