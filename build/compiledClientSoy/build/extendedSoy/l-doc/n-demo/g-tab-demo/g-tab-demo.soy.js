// This file was automatically generated from g-tab-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gTabDemo.Template.
 */

goog.provide('cl.lDoc.nDemo.gTabDemo.Template');

goog.require('soy');
goog.require('soydata');
goog.require('cl.gTab.Template');


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
  var itemList3333 = opt_data.params.data;
  var itemListLen3333 = itemList3333.length;
  for (var itemIndex3333 = 0; itemIndex3333 < itemListLen3333; itemIndex3333++) {
    var itemData3333 = itemList3333[itemIndex3333];
    output += ((itemData3333.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3333.description) + '</h2>' : '') + ((itemData3333.showParams) ? cl.lDoc.nDemo.gTabDemo.Template.params({stringifyParams: itemData3333.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gTabDemo.Template.template({params: itemData3333.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gTabDemo.Template.template({params: itemData3333.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gTabDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3359 = opt_data.params.data;
  var itemListLen3359 = itemList3359.length;
  for (var itemIndex3359 = 0; itemIndex3359 < itemListLen3359; itemIndex3359++) {
    var itemData3359 = itemList3359[itemIndex3359];
    output += ((itemData3359.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3359.description) + '</h2>' : '') + ((itemData3359.showParams) ? cl.lDoc.nDemo.gTabDemo.Template.params({stringifyParams: itemData3359.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3359.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3359.stringifyParams) + '"></div>');
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
  var docParamList3394 = opt_data.params.soydoc.docParams;
  var docParamListLen3394 = docParamList3394.length;
  for (var docParamIndex3394 = 0; docParamIndex3394 < docParamListLen3394; docParamIndex3394++) {
    var docParamData3394 = docParamList3394[docParamIndex3394];
    output += cl.lDoc.nDemo.gTabDemo.Template.docParams({stringifyParams: docParamData3394.description}, null, opt_ijData);
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
  var lb__soy3401 = '{';
  lb__soy3401 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3401);
  var rb__soy3403 = '}';
  rb__soy3403 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3403);
  var iLimit3405 = opt_data.stringifyParams.length;
  for (var i3405 = 0; i3405 < iLimit3405; i3405++) {
    output += (opt_data.stringifyParams[i3405] == lb__soy3401) ? soy.$$escapeHtml(opt_data.stringifyParams[i3405]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3405] == rb__soy3403) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3405]) + ((i3405 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3405 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3405] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3405]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3405] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3405]) + ((i3405 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3405 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3405] == ',') ? (opt_data.stringifyParams[i3405 - 1] == rb__soy3403 || opt_data.stringifyParams[i3405 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3405]) + '<br>' : (opt_data.stringifyParams[i3405] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3405]) + ' ' : (opt_data.stringifyParams[i3405] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3405]);
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
