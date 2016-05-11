const scriptsHelper = require('./scriptsHelper.js');

module.exports = function(gulpHelper) {
    return function() {
        return gulpHelper.js.build({
            outputFiles: scriptsHelper.getEntryPoints(),
            compile: true,
            compilerFlags: {
                debug: true
            }
        });
    };
};
