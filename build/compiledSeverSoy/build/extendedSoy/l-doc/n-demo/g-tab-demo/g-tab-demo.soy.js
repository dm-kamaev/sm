// This file was automatically generated from g-tab-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gTabDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gTabDemo == 'undefined') { cl.lDoc.nDemo.gTabDemo = {}; }
if (typeof cl.lDoc.nDemo.gTabDemo.Template == 'undefined') { cl.lDoc.nDemo.gTabDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.tabDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gTabDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.tabDemo.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.tabDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTab.Template.tab(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gTabDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3332 = opt_data.params.data;
  var itemListLen3332 = itemList3332.length;
  for (var itemIndex3332 = 0; itemIndex3332 < itemListLen3332; itemIndex3332++) {
    var itemData3332 = itemList3332[itemIndex3332];
    output += ((itemData3332.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3332.description) + '</h2>' : '') + ((itemData3332.showParams) ? cl.lDoc.nDemo.gTabDemo.Template.params({stringifyParams: itemData3332.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gTabDemo.Template.template({params: itemData3332.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gTabDemo.Template.template({params: itemData3332.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gTabDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3358 = opt_data.params.data;
  var itemListLen3358 = itemList3358.length;
  for (var itemIndex3358 = 0; itemIndex3358 < itemListLen3358; itemIndex3358++) {
    var itemData3358 = itemList3358[itemIndex3358];
    output += ((itemData3358.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3358.description) + '</h2>' : '') + ((itemData3358.showParams) ? cl.lDoc.nDemo.gTabDemo.Template.params({stringifyParams: itemData3358.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3358.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3358.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gTabDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3393 = opt_data.params.soydoc.docParams;
  var docParamListLen3393 = docParamList3393.length;
  for (var docParamIndex3393 = 0; docParamIndex3393 < docParamListLen3393; docParamIndex3393++) {
    var docParamData3393 = docParamList3393[docParamIndex3393];
    output += cl.lDoc.nDemo.gTabDemo.Template.docParams({stringifyParams: docParamData3393.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3400 = '{';
  lb__soy3400 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3400);
  var rb__soy3402 = '}';
  rb__soy3402 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3402);
  var iLimit3404 = opt_data.stringifyParams.length;
  for (var i3404 = 0; i3404 < iLimit3404; i3404++) {
    output += (opt_data.stringifyParams[i3404] == lb__soy3400) ? soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3404] == rb__soy3402) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + ((i3404 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3404 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3404] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3404] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + ((i3404 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3404 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3404] == ',') ? (opt_data.stringifyParams[i3404 - 1] == rb__soy3402 || opt_data.stringifyParams[i3404 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + '<br>' : (opt_data.stringifyParams[i3404] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + ' ' : (opt_data.stringifyParams[i3404] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3404]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.docParams';
}
