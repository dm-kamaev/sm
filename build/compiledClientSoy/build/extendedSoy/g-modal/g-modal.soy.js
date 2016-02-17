// This file was automatically generated from g-modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gModal.Template.
 */

goog.provide('cl.gModal.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.modal = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gModal.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gModal.Template.modal.soyTemplateName = 'cl.gModal.Template.modal';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(cl.gModal.Template.rootClass(null, null, opt_ijData)) + '__fader"></div><div class="i-utils__vertical-align-helper"></div><div class="' + soy.$$escapeHtmlAttribute(cl.gModal.Template.rootClass(null, null, opt_ijData)) + '__content">' + cl.gModal.Template.content(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  cl.gModal.Template.body.soyTemplateName = 'cl.gModal.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.data));
};
if (goog.DEBUG) {
  cl.gModal.Template.content.soyTemplateName = 'cl.gModal.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-modal');
};
if (goog.DEBUG) {
  cl.gModal.Template.rootClass.soyTemplateName = 'cl.gModal.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('i-utils__hidden');
};
if (goog.DEBUG) {
  cl.gModal.Template.additionalClasses.soyTemplateName = 'cl.gModal.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gModal.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gModal.Template.base.soyTemplateName = 'cl.gModal.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gModal.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gModal.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1082 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1082 = itemList1082.length;
    for (var itemIndex1082 = 0; itemIndex1082 < itemListLen1082; itemIndex1082++) {
      var itemData1082 = itemList1082[itemIndex1082];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1082.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1082.data);
    }
    output += '}" ';
  }
  output += cl.gModal.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gModal.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gModal.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gModal.Template.init.soyTemplateName = 'cl.gModal.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gModal.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gModal.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gModal.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1109 = opt_data.params.config.customClasses;
    var classListLen1109 = classList1109.length;
    for (var classIndex1109 = 0; classIndex1109 < classListLen1109; classIndex1109++) {
      var classData1109 = classList1109[classIndex1109];
      output += ' ' + soy.$$escapeHtml(classData1109);
    }
  }
  output += ' ' + cl.gModal.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gModal.Template.classes.soyTemplateName = 'cl.gModal.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gModal.Template.rootClass(null, null, opt_ijData) + '_' + cl.gModal.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gModal.Template.stylizationModifierClass.soyTemplateName = 'cl.gModal.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gModal.Template.stylizationModifier.soyTemplateName = 'cl.gModal.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gModal.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gModal.Template.attributes.soyTemplateName = 'cl.gModal.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gModal.Template.tag.soyTemplateName = 'cl.gModal.Template.tag';
}
