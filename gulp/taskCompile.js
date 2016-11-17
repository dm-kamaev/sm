const scriptsHelper = require('./ScriptsHelper.js');
const Path = require('./Path');

module.exports = function(gulpHelper) {
    return function() {
        return gulpHelper.js.build({
            outputFiles: scriptsHelper.getEntryPoints(),
            compile: true,
            dest: Path.SHARED_STATIC_DIR
        });
    };
};
