// This file was automatically generated from g-button.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gButton.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gButton == 'undefined') { cl.gButton = {}; }
if (typeof cl.gButton.Template == 'undefined') { cl.gButton.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.button = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gButton.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gButton.Template.button.soyTemplateName = 'cl.gButton.Template.button';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.data));
};
if (goog.DEBUG) {
  cl.gButton.Template.body.soyTemplateName = 'cl.gButton.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-button');
};
if (goog.DEBUG) {
  cl.gButton.Template.rootClass.soyTemplateName = 'cl.gButton.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gButton.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gButton.Template.base.soyTemplateName = 'cl.gButton.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gButton.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gButton.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList698 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen698 = itemList698.length;
    for (var itemIndex698 = 0; itemIndex698 < itemListLen698; itemIndex698++) {
      var itemData698 = itemList698[itemIndex698];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData698.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData698.data);
    }
    output += '}" ';
  }
  output += cl.gButton.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gButton.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gButton.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gButton.Template.init.soyTemplateName = 'cl.gButton.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gButton.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gButton.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gButton.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList725 = opt_data.params.config.customClasses;
    var classListLen725 = classList725.length;
    for (var classIndex725 = 0; classIndex725 < classListLen725; classIndex725++) {
      var classData725 = classList725[classIndex725];
      output += ' ' + soy.$$escapeHtml(classData725);
    }
  }
  output += ' ' + cl.gButton.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gButton.Template.classes.soyTemplateName = 'cl.gButton.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gButton.Template.additionalClasses.soyTemplateName = 'cl.gButton.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gButton.Template.rootClass(null, null, opt_ijData) + '_' + cl.gButton.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gButton.Template.stylizationModifierClass.soyTemplateName = 'cl.gButton.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gButton.Template.stylizationModifier.soyTemplateName = 'cl.gButton.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gButton.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gButton.Template.attributes.soyTemplateName = 'cl.gButton.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gButton.Template.tag.soyTemplateName = 'cl.gButton.Template.tag';
}
