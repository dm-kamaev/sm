var os = require('os'),
    fs = require('fs'),
    path = require('path'),
    soynode = require('soynode');

global.CLOSURE_BASE_PATH = path.normalize('node_modules/google-closure-library/closure/goog/');

soynode.setOptions({
    outputDir: os.tmpdir(),
    uniqueDir: true,
    allowDynamicRecompile: true,
    contextJsPaths: [
        path.join(__dirname, '../../node_modules/frobl/blocks/i-utils/i-utils.js')
    ]
});

exports.init = function(dir, opt_callback) {
    var callback = opt_callback || function() {};

    //fs.readdir(dir, function(err, items) {
    //    if (err) {
    //        console.log('Error: ', err)
    //    }
    //
    //    console.log(items);
    //});

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
