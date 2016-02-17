// This file was automatically generated from g-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gList.Template.
 */

goog.provide('cl.gList.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.list = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gList.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gList.Template.list.soyTemplateName = 'cl.gList.Template.list';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var selectedItemId__soy965 = ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.selectedItemId) != null ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.selectedItemId) : 0;
  if ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.items) {
    var iLimit968 = opt_data.params.data.items.length;
    for (var i968 = 0; i968 < iLimit968; i968++) {
      var item__soy969 = opt_data.params.data.items[i968];
      output += cl.gList.Template.listItem({params: {label: item__soy969.label, url: item__soy969.url, isSelected: i968 == selectedItemId__soy965}}, null, opt_ijData);
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gList.Template.body.soyTemplateName = 'cl.gList.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.listItem = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<' + soy.$$filterHtmlElementName(opt_data.params.url ? 'a' : 'div') + ' class="' + soy.$$escapeHtmlAttribute(cl.gList.Template.rootClass(null, null, opt_ijData)) + '__item' + ((opt_data.params.isSelected) ? ' ' + soy.$$escapeHtmlAttribute(cl.gList.Template.rootClass(null, null, opt_ijData)) + '__item_selected' : '') + '"' + ((opt_data.params.url) ? ' href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.url)) + '"' : '') + '>' + cl.gList.Template.value(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(opt_data.params.url ? 'a' : 'div') + '>');
};
if (goog.DEBUG) {
  cl.gList.Template.listItem.soyTemplateName = 'cl.gList.Template.listItem';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.value = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.label));
};
if (goog.DEBUG) {
  cl.gList.Template.value.soyTemplateName = 'cl.gList.Template.value';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-list');
};
if (goog.DEBUG) {
  cl.gList.Template.rootClass.soyTemplateName = 'cl.gList.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gList.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gList.Template.base.soyTemplateName = 'cl.gList.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gList.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gList.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1009 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1009 = itemList1009.length;
    for (var itemIndex1009 = 0; itemIndex1009 < itemListLen1009; itemIndex1009++) {
      var itemData1009 = itemList1009[itemIndex1009];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1009.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1009.data);
    }
    output += '}" ';
  }
  output += cl.gList.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gList.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gList.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gList.Template.init.soyTemplateName = 'cl.gList.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gList.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gList.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gList.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1036 = opt_data.params.config.customClasses;
    var classListLen1036 = classList1036.length;
    for (var classIndex1036 = 0; classIndex1036 < classListLen1036; classIndex1036++) {
      var classData1036 = classList1036[classIndex1036];
      output += ' ' + soy.$$escapeHtml(classData1036);
    }
  }
  output += ' ' + cl.gList.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gList.Template.classes.soyTemplateName = 'cl.gList.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gList.Template.additionalClasses.soyTemplateName = 'cl.gList.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gList.Template.rootClass(null, null, opt_ijData) + '_' + cl.gList.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gList.Template.stylizationModifierClass.soyTemplateName = 'cl.gList.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gList.Template.stylizationModifier.soyTemplateName = 'cl.gList.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gList.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gList.Template.attributes.soyTemplateName = 'cl.gList.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gList.Template.tag.soyTemplateName = 'cl.gList.Template.tag';
}
