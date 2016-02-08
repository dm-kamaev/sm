var os = require('os'),
    fs = require('fs'),
    path = require('path'),
    soynode = require('soynode');

global.CLOSURE_BASE_PATH = path.normalize('node_modules/google-closure-library/closure/goog/');

soynode.setOptions({
    outputDir: os.tmpdir(),
    uniqueDir: true,
    /**
     * TODO: make watch
     * In case of dynamic recompile, please don't restart gulp
     */
    allowDynamicRecompile: true
});

exports.init = function(file, opt_callback) {
    var callback = opt_callback || function() {};

    soynode.loadCompiledTemplateFiles(file, function(err) {
        if (err) throw err;
        callback();
        soynode.setOptions({
            contextJsPaths: []
        });

        fs.watchFile(
            file,
            function() {
                console.log('Recompiling templates...');

                soynode.loadCompiledTemplateFiles(
                    file,
                    function (err) {
                        if (err) {
                            throw err;
                        } else {
                            console.log('Successfully!');
                        }
                    }
                );
            }
        );
    });
};

exports.render = function(template, data) {
    return soynode.render(template, data);
};
