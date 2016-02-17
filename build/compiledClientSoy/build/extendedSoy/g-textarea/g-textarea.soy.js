// This file was automatically generated from g-textarea.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gTextarea.Template.
 */

goog.provide('cl.gTextarea.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.textarea = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTextarea.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gTextarea.Template.textarea.soyTemplateName = 'cl.gTextarea.Template.textarea';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<textarea class="' + soy.$$escapeHtmlAttribute(cl.gTextarea.Template.rootClass(null, null, opt_ijData)) + '__textarea" placeholder="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) + '" name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '" spellcheck="false">' + soy.$$escapeHtmlRcdata(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) : '') + '</textarea>' + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.autoHeight) ? '<div class="' + soy.$$escapeHtmlAttribute(cl.gTextarea.Template.rootClass(null, null, opt_ijData)) + '__text-container">' + soy.$$changeNewlineToBr(soy.$$escapeHtml(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) : '')) + '</div>' : ''));
};
if (goog.DEBUG) {
  cl.gTextarea.Template.body.soyTemplateName = 'cl.gTextarea.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-textarea');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.rootClass.soyTemplateName = 'cl.gTextarea.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.autoHeight) ? ' g-textarea_auto-height' : '');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.additionalClasses.soyTemplateName = 'cl.gTextarea.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTextarea.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gTextarea.Template.base.soyTemplateName = 'cl.gTextarea.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gTextarea.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gTextarea.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1303 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1303 = itemList1303.length;
    for (var itemIndex1303 = 0; itemIndex1303 < itemListLen1303; itemIndex1303++) {
      var itemData1303 = itemList1303[itemIndex1303];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1303.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1303.data);
    }
    output += '}" ';
  }
  output += cl.gTextarea.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gTextarea.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gTextarea.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTextarea.Template.init.soyTemplateName = 'cl.gTextarea.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gTextarea.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gTextarea.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gTextarea.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1330 = opt_data.params.config.customClasses;
    var classListLen1330 = classList1330.length;
    for (var classIndex1330 = 0; classIndex1330 < classListLen1330; classIndex1330++) {
      var classData1330 = classList1330[classIndex1330];
      output += ' ' + soy.$$escapeHtml(classData1330);
    }
  }
  output += ' ' + cl.gTextarea.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTextarea.Template.classes.soyTemplateName = 'cl.gTextarea.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gTextarea.Template.rootClass(null, null, opt_ijData) + '_' + cl.gTextarea.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.stylizationModifierClass.soyTemplateName = 'cl.gTextarea.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gTextarea.Template.stylizationModifier.soyTemplateName = 'cl.gTextarea.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.attributes.soyTemplateName = 'cl.gTextarea.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.tag.soyTemplateName = 'cl.gTextarea.Template.tag';
}
