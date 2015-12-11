/**
 * Created by rshamyan on 9/30/2015.
 */

var fs = require('fs'),
    path = require('path'),
    soyparser = require('soyparser');


/**
 * Soy extend class
 * @param {{
 *   blocksDir: String,
 *   lineEndings: ?String,
 *   destDir: ?String
 * }} params
 * @constructor
 */
var SoyExtend = function(params) {
    this.params_ = params;
};

/**
 * Serialize line endings
 * @const
 */
SoyExtend.LINE_ENDINGS = '\r\n';

/**
 * Default destination folder;
 * @type {String}
 */
SoyExtend.DEST_DIR = 'build/soy';

/**
 * Proceed file
 * @param {String} filePath
 */
SoyExtend.prototype.proceed = function(filePath) {
    var soy = this.parse_(filePath),
        content;
    soy = this.extend_(soy);
    content = this.serializeToString_(soy);
    fs.writeFileSync(this.getDestination(filePath), content, 'utf-8');
};

/**
 * Returns processed file name
 * @param {String} filePath
 * @return {String}
 */
SoyExtend.prototype.getDestination = function(filePath) {
    //var dest = SoyExtend.DEST_DIR,
    //    rel;
    //if (this.params_.destDir) {
    //    dest = this.params_.destDir;
    //}
    //rel = path.relative(__dirname, filePath);
    //return dest + '/' + rel;

    //replace self
    //be careful
    return filePath;
};

/**
 * Returns line endings
 * @return {String}
 */
SoyExtend.prototype.getLineEndings = function() {
    var LE_ = SoyExtend.LINE_ENDINGS;
    if (this.params_.lineEndings) {
        LE_ = this.params_.lineEndings;
    }
    return LE_;
};

/**
 * Recursive extends soy template
 * @param {Object} soy parsed soy object
 * @private
 * @return {Object} extended object
 */
SoyExtend.prototype.extend_ = function(soy) {
    var parents = [],
        parent;
    for (var i = 0, template; template = soy.templates[i]; i++) {
        if (this.isConstructor_(template)) {
            var parentPath = this.getExtendsPath_(template);
            parent = this.parse_(parentPath);
            //recursive call
            parent = this.extend_(parent);

            parents.push(parent);
        }
    }

    for (i = 0, parent; parent = parents[i]; i++) {
        soy = this.mixin_(soy, parent);
    }

    return soy;
};

/**
 * Mixin parent templates to child
 * @param {Object} child
 * @param {Object} parent
 * @return {Object} extended child object
 * @private
 */
SoyExtend.prototype.mixin_ = function(child, parent) {
    for (var i = 0, parentTemplate; parentTemplate = parent.templates[i]; i++) {
        if (!this.isOverridden_(parentTemplate, child)) {
            child.templates.push(parentTemplate);
        }
    }

    return child;
};

/**
 * Serializes comment
 * @param {Object} template
 * @private
 * @return {String}
 */
SoyExtend.prototype.serializeComment_ = function(template) {
    var LE_ = this.getLineEndings(),
        res = '/**' + LE_;
    for (var i = 0, docTag; docTag = template.docTags[i]; i++) {
        res += '* ' + this.serializeDocTag_(docTag) + LE_;
    }
    res += '*/';
    return res;
};

/**
 * Serializes docTag to string
 * @param {{tag,name,description,type,kind}} docTag
 * @return {String}
 * @private
 */
SoyExtend.prototype.serializeDocTag_ = function(docTag) {
    var res;
    res = '@' + docTag.tag;
    if (docTag.name) {
        res += ' ' + docTag.name;
    }
    if (docTag.description &&
            docTag.description.indexOf('\n') == -1 && //hack to skip bad descr
            docTag.description.indexOf('\r') == -1) {
        res += ' ' + docTag.description;
    }

    return res;
};

/**
 * Serializes template to string
 * @param {Object} template
 * @private
 * @return {String}
 */
SoyExtend.prototype.serializeTemplate_ = function(template) {
    var LE_ = this.getLineEndings();
    return this.serializeComment_(template) + LE_ + template.contents;
};

/**
 * Serializes soy namespace
 * @param {Object} soy
 * @return {String}
 * @private
 */
SoyExtend.prototype.serializeNamespace_ = function(soy) {
    return '{namespace ' + soy.namespace + '}';
};

/**
 * Serializes soy object to soy string
 * @param {Object} soy
 * @return {String}
 * @private
 */
SoyExtend.prototype.serializeToString_ = function(soy) {
    var res = '',
        LE_ = this.getLineEndings();

    if (soy.namespace) {
        res += this.serializeNamespace_(soy) + LE_;
    }

    for (var i = 0, template; template = soy.templates[i]; i++) {
        res += this.serializeTemplate_(template) + LE_;
    }

    return res;
};

/**
 * Checks whether template overridden in child
 * @param {Object} parentTemplate
 * @param {Object} child
 * @return {Boolean}
 * @private
 */
SoyExtend.prototype.isOverridden_ = function(parentTemplate, child) {
    for (var i = 0, childTemplate; childTemplate = child.templates[i]; i++) {
        if (childTemplate.name == parentTemplate.name) {
            return true;
        }
    }

    return false;
};

/**
 * Checks whether template is private
 * @param {{attributes: Array<{private: boolean}>}} template
 * @return {Boolean}
 * @private
 */
SoyExtend.prototype.isPrivate_ = function(template) {
    return template.attributes.private == 'true';
};


/**
 * Checks whether template is constructor, i.e possible has children
 * @param {Object} template
 * @return {Boolean}
 * @private
 */
SoyExtend.prototype.isConstructor_ = function(template) {
    var res = false;
    for (var i = 0, docTag; docTag = template.docTags[i]; i++) {
        if (docTag.tag == 'constructor') {
            res = true;
        }
    }

    return res;
};

/**
 * Returns parent file path
 * @param {Object} template
 * @return {String}
 * @private
 */
SoyExtend.prototype.getExtendsPath_ = function(template) {
    var res = null;
    for (var i = 0, docTag; docTag = template.docTags[i]; i++) {
        if (docTag.tag == 'extends') {
            res = this.formatExtendsPath_(docTag.description);
        }
    }

    return res;
};

/**
 * Format parent file path, if has
 * @param {String} path
 * @return {String}
 * @private
 */
SoyExtend.prototype.formatExtendsPath_ = function(path) {
    // removing quotes
    path = path.replace(/"/g, '');
    path = path.replace(/'/g, '');
    // adding directory prefix
    path = this.params_.blocksDir + '/' + path;
    // adding extension
    path += '.soy';

    return path;
};

/**
 * Parses soy file to Object
 * @param {String} filePath
 * @return {Object}
 * @private
 */
SoyExtend.prototype.parse_ = function(filePath) {
    return soyparser(fs.readFileSync(filePath, 'utf8'));
};


module.exports = SoyExtend;
