var os = require('os'),
    path = require('path'),
    soynode = require('soynode');

soynode.setOptions({
    outputDir: os.tmpdir(),
    uniqueDir: true,
    allowDynamicRecompile: true
});


exports.init = function(dir, opt_callback) {
    var callback = opt_callback || function() {};


    soynode.compileTemplates(dir, function(err) {

        a(soynode._vmContexts['default']._context.gorod);

        if (err) throw err;
        callback();
    });
};

exports.render = function(template, data) {
    return soynode.render(template, data);
};


/**
 * TODO: костыль
 *
 *
 **/

global.CLOSURE_BASE_PATH = path.normalize('node_modules/closure-library/closure/goog/');
var goog = require('closure').Closure(global);

goog.require('goog.soy');

goog.provide('soydata.VERY_UNSAFE');

soydata.SanitizedHtml = function() {
    goog.soy.data.SanitizedContent.call(this);  // Throws an exception.
};
goog.inherits(soydata.SanitizedHtml, goog.soy.data.SanitizedContent);

soydata.$$makeSanitizedContentFactory_ = function(ctor) {
    /**
     * @param {string} content
     * @constructor
     * @extends {goog.soy.data.SanitizedContent}
     */
    function InstantiableCtor(content) {
        /** @override */
        this.content = content;
    }
    InstantiableCtor.prototype = ctor.prototype;
    /**
     * Creates a ctor-type SanitizedContent instance.
     *
     * @param {*} content The content to put in the instance.
     * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction. If
     *     undefined, ctor.prototype.contentDir is used.
     * @return {!goog.soy.data.SanitizedContent} The new instance. It is actually
     *     of type T above (ctor's type, a descendant of SanitizedContent), but
     *     there is no way to express that here.
     */
    function sanitizedContentFactory(content, opt_contentDir) {
        var result = new InstantiableCtor(String(content));
        if (opt_contentDir !== undefined) {
            result.contentDir = opt_contentDir;
        }
        return result;
    }
    return sanitizedContentFactory;
};

soydata.VERY_UNSAFE.ordainSanitizedHtml =
    soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtml);

var a = function(obj){
    obj['iUtils'] = {
        "SanitizedHtml": function (param) {
            return soydata.VERY_UNSAFE.ordainSanitizedHtml(param.html);
        },
        "stringify": function (attr) {
            return (JSON.stringify(attr.json));
        },
        "ext_generateId": function() {
            return 'id' + Math.round(Math.random() * 100000);
        }
    }
};
