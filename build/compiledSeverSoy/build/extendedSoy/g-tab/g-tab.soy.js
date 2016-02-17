// This file was automatically generated from g-tab.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gTab.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gTab == 'undefined') { cl.gTab = {}; }
if (typeof cl.gTab.Template == 'undefined') { cl.gTab.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.tab = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTab.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gTab.Template.tab.soyTemplateName = 'cl.gTab.Template.tab';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var selectedTabId__soy1167 = ((opt_data.params.data == null) ? null : opt_data.params.data.selectedTabId) != null ? ((opt_data.params.data == null) ? null : opt_data.params.data.selectedTabId) : ((opt_data.params.config == null) ? null : opt_data.params.config.noDefaultTab) ? -1 : 0;
  output += cl.gTab.Template.tabs(opt_data, null, opt_ijData);
  var iLimit1169 = (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.tabs == null) ? null : opt_data.params.data.tabs.length;
  for (var i1169 = 0; i1169 < iLimit1169; i1169++) {
    output += cl.gTab.Template.content({params: {content: opt_data.params.data.tabs[i1169].content, hidden: ! (i1169 == selectedTabId__soy1167)}}, null, opt_ijData);
  }
  output += cl.gTab.Template.placeholder(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTab.Template.body.soyTemplateName = 'cl.gTab.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.tabs = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var selectedTabId__soy1174 = ((opt_data.params.data == null) ? null : opt_data.params.data.selectedTabId) != null ? ((opt_data.params.data == null) ? null : opt_data.params.data.selectedTabId) : ((opt_data.params.config == null) ? null : opt_data.params.config.noDefaultTab) ? -1 : 0;
  output += '<div class="' + soy.$$escapeHtmlAttribute(cl.gTab.Template.rootClass(null, null, opt_ijData)) + '__tabs">';
  var iLimit1178 = (opt_data.params.data == null) ? null : (opt_data.params.data.tabs == null) ? null : opt_data.params.data.tabs.length;
  for (var i1178 = 0; i1178 < iLimit1178; i1178++) {
    output += cl.gTab.Template.label({params: {label: opt_data.params.data.tabs[i1178].label, selected: i1178 == selectedTabId__soy1174}}, null, opt_ijData);
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTab.Template.tabs.soyTemplateName = 'cl.gTab.Template.tabs';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.label = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(cl.gTab.Template.rootClass(null, null, opt_ijData)) + '__tab' + (((opt_data.params == null) ? null : opt_data.params.selected) ? ' ' + soy.$$escapeHtmlAttribute(cl.gTab.Template.rootClass(null, null, opt_ijData)) + '__tab_selected' : '') + '">' + cl.gTab.Template.labelContent(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  cl.gTab.Template.label.soyTemplateName = 'cl.gTab.Template.label';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.labelContent = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml((opt_data.params == null) ? null : opt_data.params.label));
};
if (goog.DEBUG) {
  cl.gTab.Template.labelContent.soyTemplateName = 'cl.gTab.Template.labelContent';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(cl.gTab.Template.rootClass(null, null, opt_ijData)) + '__content' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.hidden) ? ' i-utils__hidden' : '') + '">' + cl.gTab.Template.innerContent(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  cl.gTab.Template.content.soyTemplateName = 'cl.gTab.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.innerContent = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml((opt_data.params == null) ? null : opt_data.params.content));
};
if (goog.DEBUG) {
  cl.gTab.Template.innerContent.soyTemplateName = 'cl.gTab.Template.innerContent';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.placeholder = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gTab.Template.placeholder.soyTemplateName = 'cl.gTab.Template.placeholder';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-tab');
};
if (goog.DEBUG) {
  cl.gTab.Template.rootClass.soyTemplateName = 'cl.gTab.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTab.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gTab.Template.base.soyTemplateName = 'cl.gTab.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gTab.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gTab.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1220 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1220 = itemList1220.length;
    for (var itemIndex1220 = 0; itemIndex1220 < itemListLen1220; itemIndex1220++) {
      var itemData1220 = itemList1220[itemIndex1220];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1220.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1220.data);
    }
    output += '}" ';
  }
  output += cl.gTab.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gTab.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gTab.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTab.Template.init.soyTemplateName = 'cl.gTab.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gTab.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gTab.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gTab.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1247 = opt_data.params.config.customClasses;
    var classListLen1247 = classList1247.length;
    for (var classIndex1247 = 0; classIndex1247 < classListLen1247; classIndex1247++) {
      var classData1247 = classList1247[classIndex1247];
      output += ' ' + soy.$$escapeHtml(classData1247);
    }
  }
  output += ' ' + cl.gTab.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTab.Template.classes.soyTemplateName = 'cl.gTab.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gTab.Template.additionalClasses.soyTemplateName = 'cl.gTab.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gTab.Template.rootClass(null, null, opt_ijData) + '_' + cl.gTab.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gTab.Template.stylizationModifierClass.soyTemplateName = 'cl.gTab.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gTab.Template.stylizationModifier.soyTemplateName = 'cl.gTab.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gTab.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gTab.Template.attributes.soyTemplateName = 'cl.gTab.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gTab.Template.tag.soyTemplateName = 'cl.gTab.Template.tag';
}
