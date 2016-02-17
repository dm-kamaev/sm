// This file was automatically generated from g-dropdown.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gDropdown.Template.
 */

goog.provide('cl.gDropdown.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.dropdown = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gDropdown.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.dropdown.soyTemplateName = 'cl.gDropdown.Template.dropdown';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(cl.gDropdown.Template.rootClass(null, null, opt_ijData)) + '__opener">' + cl.gDropdown.Template.opener(opt_data, null, opt_ijData) + '</div><div class="' + soy.$$escapeHtmlAttribute(cl.gDropdown.Template.rootClass(null, null, opt_ijData)) + '__content i-utils__hidden">' + cl.gDropdown.Template.content(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.body.soyTemplateName = 'cl.gDropdown.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.opener = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.opener));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.opener.soyTemplateName = 'cl.gDropdown.Template.opener';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml((opt_data.params.data == null) ? null : opt_data.params.data.content));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.content.soyTemplateName = 'cl.gDropdown.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-dropdown');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.rootClass.soyTemplateName = 'cl.gDropdown.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gDropdown.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.base.soyTemplateName = 'cl.gDropdown.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gDropdown.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gDropdown.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList773 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen773 = itemList773.length;
    for (var itemIndex773 = 0; itemIndex773 < itemListLen773; itemIndex773++) {
      var itemData773 = itemList773[itemIndex773];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData773.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData773.data);
    }
    output += '}" ';
  }
  output += cl.gDropdown.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gDropdown.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gDropdown.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gDropdown.Template.init.soyTemplateName = 'cl.gDropdown.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gDropdown.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gDropdown.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gDropdown.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList800 = opt_data.params.config.customClasses;
    var classListLen800 = classList800.length;
    for (var classIndex800 = 0; classIndex800 < classListLen800; classIndex800++) {
      var classData800 = classList800[classIndex800];
      output += ' ' + soy.$$escapeHtml(classData800);
    }
  }
  output += ' ' + cl.gDropdown.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gDropdown.Template.classes.soyTemplateName = 'cl.gDropdown.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.additionalClasses.soyTemplateName = 'cl.gDropdown.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gDropdown.Template.rootClass(null, null, opt_ijData) + '_' + cl.gDropdown.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.stylizationModifierClass.soyTemplateName = 'cl.gDropdown.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.stylizationModifier.soyTemplateName = 'cl.gDropdown.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.attributes.soyTemplateName = 'cl.gDropdown.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.tag.soyTemplateName = 'cl.gDropdown.Template.tag';
}
