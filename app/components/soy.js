var os = require('os'),
    fs = require('fs'),
    path = require('path'),
    soynode = require('soynode'),
    watch = require('node-watch');

global.CLOSURE_BASE_PATH = path.normalize('node_modules/google-closure-library/closure/goog/');

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
    //console.log(soynode._vmContexts.default._context.sm);
    return soynode.render(template, data);
};
