const scriptsHelper = require('./ScriptsHelper.js');

module.exports = function(gulpHelper) {
    return function() {
        return gulpHelper.js.build({
            outputFiles: scriptsHelper.getEntryPoints(),
            compile: true,
            Xms: '256m',
            Xmx: '1024m'
        });
    };
};
