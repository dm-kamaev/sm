var os = require('os'),
    soynode = require('soynode');


soynode.setOptions({
    outputDir: os.tmpdir(),
    uniqueDir: true,
    allowDynamicRecompile: true,
    eraseTemporaryFiles: true
});


exports.init = function(dir, opt_callback) {
    var callback = opt_callback || function() {};

    soynode.compileTemplates(dir, function(err) {
        if (err) throw err;
        callback();
    });
};


exports.render = function(template, data) {
    return soynode.render(template, data);
};
