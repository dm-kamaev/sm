var os = require('os'),
    path = require('path'),
    soynode = require('soynode');

global.CLOSURE_BASE_PATH = path.normalize('node_modules/closure-library/closure/goog/');

soynode.setOptions({
    outputDir: os.tmpdir(),
    uniqueDir: true,
    //allowDynamicRecompile: true,
    contextJsPaths: [
        path.join(__dirname, '../../node_modules/frobl/blocks/i-utils/i-utils.js')
    ]
});

exports.init = function(dir, opt_callback) {
    var callback = opt_callback || function() {};

    soynode.compileTemplates(dir, function(err) {
        if (err) throw err;
        callback();
        soynode.setOptions({
            contextJsPaths: []
        });
    });
};

exports.render = function(template, data) {
    return soynode.render(template, data);
};
