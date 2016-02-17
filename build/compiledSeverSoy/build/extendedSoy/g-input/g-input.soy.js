// This file was automatically generated from g-input.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gInput.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gInput == 'undefined') { cl.gInput = {}; }
if (typeof cl.gInput.Template == 'undefined') { cl.gInput.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.input = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gInput.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gInput.Template.input.soyTemplateName = 'cl.gInput.Template.input';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gInput.Template.inputTemplate(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gInput.Template.body.soyTemplateName = 'cl.gInput.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.inputTemplate = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<input class="' + soy.$$escapeHtmlAttribute(cl.gInput.Template.rootClass(null, null, opt_ijData)) + '__input"' + (((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) ? ' placeholder="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) + '"' : '') + (((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) ? ' name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '"' : '') + ' value="' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) : '') + '"></input>');
};
if (goog.DEBUG) {
  cl.gInput.Template.inputTemplate.soyTemplateName = 'cl.gInput.Template.inputTemplate';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-input');
};
if (goog.DEBUG) {
  cl.gInput.Template.rootClass.soyTemplateName = 'cl.gInput.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gInput.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gInput.Template.base.soyTemplateName = 'cl.gInput.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gInput.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gInput.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList916 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen916 = itemList916.length;
    for (var itemIndex916 = 0; itemIndex916 < itemListLen916; itemIndex916++) {
      var itemData916 = itemList916[itemIndex916];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData916.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData916.data);
    }
    output += '}" ';
  }
  output += cl.gInput.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gInput.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gInput.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gInput.Template.init.soyTemplateName = 'cl.gInput.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gInput.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gInput.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gInput.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList943 = opt_data.params.config.customClasses;
    var classListLen943 = classList943.length;
    for (var classIndex943 = 0; classIndex943 < classListLen943; classIndex943++) {
      var classData943 = classList943[classIndex943];
      output += ' ' + soy.$$escapeHtml(classData943);
    }
  }
  output += ' ' + cl.gInput.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gInput.Template.classes.soyTemplateName = 'cl.gInput.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gInput.Template.additionalClasses.soyTemplateName = 'cl.gInput.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gInput.Template.rootClass(null, null, opt_ijData) + '_' + cl.gInput.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gInput.Template.stylizationModifierClass.soyTemplateName = 'cl.gInput.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gInput.Template.stylizationModifier.soyTemplateName = 'cl.gInput.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gInput.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gInput.Template.attributes.soyTemplateName = 'cl.gInput.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gInput.Template.tag.soyTemplateName = 'cl.gInput.Template.tag';
}
