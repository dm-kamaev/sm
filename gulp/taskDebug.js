const scriptsHelper = require('./ScriptsHelper.js');
const minimist = require('minimist');
const Path = require('./Path');


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
                debug: true,
                'warning_level': 'QUIET',
            },
            es6: true,
            dest: Path.SHARED_STATIC_DIR
        });
    };
};
