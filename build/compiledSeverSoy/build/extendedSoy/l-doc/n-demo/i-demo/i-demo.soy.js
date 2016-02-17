// This file was automatically generated from i-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.iDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.iDemo == 'undefined') { cl.lDoc.nDemo.iDemo = {}; }
if (typeof cl.lDoc.nDemo.iDemo.Template == 'undefined') { cl.lDoc.nDemo.iDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.iDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3573 = opt_data.params.data;
  var itemListLen3573 = itemList3573.length;
  for (var itemIndex3573 = 0; itemIndex3573 < itemListLen3573; itemIndex3573++) {
    var itemData3573 = itemList3573[itemIndex3573];
    output += ((itemData3573.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3573.description) + '</h2>' : '') + ((itemData3573.showParams) ? cl.lDoc.nDemo.iDemo.Template.params({stringifyParams: itemData3573.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.iDemo.Template.template({params: itemData3573.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.iDemo.Template.template({params: itemData3573.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.iDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3599 = opt_data.params.data;
  var itemListLen3599 = itemList3599.length;
  for (var itemIndex3599 = 0; itemIndex3599 < itemListLen3599; itemIndex3599++) {
    var itemData3599 = itemList3599[itemIndex3599];
    output += ((itemData3599.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3599.description) + '</h2>' : '') + ((itemData3599.showParams) ? cl.lDoc.nDemo.iDemo.Template.params({stringifyParams: itemData3599.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3599.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3599.stringifyParams) + '"></div>');
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
  var docParamList3636 = opt_data.params.soydoc.docParams;
  var docParamListLen3636 = docParamList3636.length;
  for (var docParamIndex3636 = 0; docParamIndex3636 < docParamListLen3636; docParamIndex3636++) {
    var docParamData3636 = docParamList3636[docParamIndex3636];
    output += cl.lDoc.nDemo.iDemo.Template.docParams({stringifyParams: docParamData3636.description}, null, opt_ijData);
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
  var lb__soy3643 = '{';
  lb__soy3643 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3643);
  var rb__soy3645 = '}';
  rb__soy3645 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3645);
  var iLimit3647 = opt_data.stringifyParams.length;
  for (var i3647 = 0; i3647 < iLimit3647; i3647++) {
    output += (opt_data.stringifyParams[i3647] == lb__soy3643) ? soy.$$escapeHtml(opt_data.stringifyParams[i3647]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3647] == rb__soy3645) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3647]) + ((i3647 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3647 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3647] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3647]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3647] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3647]) + ((i3647 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3647 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3647] == ',') ? (opt_data.stringifyParams[i3647 - 1] == rb__soy3645 || opt_data.stringifyParams[i3647 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3647]) + '<br>' : (opt_data.stringifyParams[i3647] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3647]) + ' ' : (opt_data.stringifyParams[i3647] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3647]);
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
