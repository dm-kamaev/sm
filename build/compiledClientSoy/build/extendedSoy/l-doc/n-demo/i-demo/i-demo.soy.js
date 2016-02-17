// This file was automatically generated from i-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.iDemo.Template.
 */

goog.provide('cl.lDoc.nDemo.iDemo.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.iDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3572 = opt_data.params.data;
  var itemListLen3572 = itemList3572.length;
  for (var itemIndex3572 = 0; itemIndex3572 < itemListLen3572; itemIndex3572++) {
    var itemData3572 = itemList3572[itemIndex3572];
    output += ((itemData3572.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3572.description) + '</h2>' : '') + ((itemData3572.showParams) ? cl.lDoc.nDemo.iDemo.Template.params({stringifyParams: itemData3572.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.iDemo.Template.template({params: itemData3572.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.iDemo.Template.template({params: itemData3572.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.iDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3598 = opt_data.params.data;
  var itemListLen3598 = itemList3598.length;
  for (var itemIndex3598 = 0; itemIndex3598 < itemListLen3598; itemIndex3598++) {
    var itemData3598 = itemList3598[itemIndex3598];
    output += ((itemData3598.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3598.description) + '</h2>' : '') + ((itemData3598.showParams) ? cl.lDoc.nDemo.iDemo.Template.params({stringifyParams: itemData3598.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3598.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3598.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.iDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('NO_TEMPLATE');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3635 = opt_data.params.soydoc.docParams;
  var docParamListLen3635 = docParamList3635.length;
  for (var docParamIndex3635 = 0; docParamIndex3635 < docParamListLen3635; docParamIndex3635++) {
    var docParamData3635 = docParamList3635[docParamIndex3635];
    output += cl.lDoc.nDemo.iDemo.Template.docParams({stringifyParams: docParamData3635.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3642 = '{';
  lb__soy3642 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3642);
  var rb__soy3644 = '}';
  rb__soy3644 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3644);
  var iLimit3646 = opt_data.stringifyParams.length;
  for (var i3646 = 0; i3646 < iLimit3646; i3646++) {
    output += (opt_data.stringifyParams[i3646] == lb__soy3642) ? soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3646] == rb__soy3644) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + ((i3646 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3646 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3646] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3646] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + ((i3646 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3646 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3646] == ',') ? (opt_data.stringifyParams[i3646 - 1] == rb__soy3644 || opt_data.stringifyParams[i3646 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + '<br>' : (opt_data.stringifyParams[i3646] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + ' ' : (opt_data.stringifyParams[i3646] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3646]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.docParams';
}
