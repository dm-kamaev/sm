var os = require('os'),
    fs = require('fs'),
    path = require('path'),
    soynode = require('soynode'),
    watch = require('node-watch');

global.CLOSURE_BASE_PATH = path.normalize('node_modules/closure-library/closure/goog/');

soynode.setOptions({
    outputDir: path.join(__dirname, '../../node_modules/frobl/tmp'),//os.tmpdir(),
    uniqueDir: false, //true,
    //allowDynamicRecompile: true,
    contextJsPaths: [
        path.join(__dirname, '../../node_modules/frobl/blocks/i-utils/i-utils.js')
    ]/*,
    concatOutput: true*/
});

exports.init = function(dir, opt_callback) {
    var callback = opt_callback || function() {};

/*
    soynode.loadCompiledTemplates(
        path.join(__dirname, '../../node_modules/frobl/tmp/soyApp'),
        function() {
            soynode.setOptions({
                contextJsPaths: []
            });
            watch(
                path.join(__dirname, '../../node_modules/frobl/tmp/soyApp'),
                function(filename) {
                    var pathArray = filename.split('\\');
                    var name = pathArray[pathArray.length - 1];
                    console.log('Watch:', name);
                    //console.log(filename);
                    if (~filename.indexOf('.soy.js')) {
                        soynode.loadCompiledTemplateFiles(
                            [filename],
                            function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                //console.log(soynode._vmContexts.default);
                            }
                        );
                        var pathArray = filename.split('\\');
                        var name = pathArray[pathArray.length - 1];
                        console.log('Change in:', name);
                    }
                });
            callback();
        });
*/

    //console.log(soynode._vmContexts.sm);

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
