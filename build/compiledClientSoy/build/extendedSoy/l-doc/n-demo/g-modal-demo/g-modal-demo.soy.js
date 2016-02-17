// This file was automatically generated from g-modal-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gModalDemo.Template.
 */

goog.provide('cl.lDoc.nDemo.gModalDemo.Template');

goog.require('soy');
goog.require('soydata');
goog.require('cl.gModal.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.modalDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gModalDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.modalDemo.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.modalDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gModal.Template.modal(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gModalDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3210 = opt_data.params.data;
  var itemListLen3210 = itemList3210.length;
  for (var itemIndex3210 = 0; itemIndex3210 < itemListLen3210; itemIndex3210++) {
    var itemData3210 = itemList3210[itemIndex3210];
    output += ((itemData3210.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3210.description) + '</h2>' : '') + ((itemData3210.showParams) ? cl.lDoc.nDemo.gModalDemo.Template.params({stringifyParams: itemData3210.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gModalDemo.Template.template({params: itemData3210.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gModalDemo.Template.template({params: itemData3210.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gModalDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3236 = opt_data.params.data;
  var itemListLen3236 = itemList3236.length;
  for (var itemIndex3236 = 0; itemIndex3236 < itemListLen3236; itemIndex3236++) {
    var itemData3236 = itemList3236[itemIndex3236];
    output += ((itemData3236.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3236.description) + '</h2>' : '') + ((itemData3236.showParams) ? cl.lDoc.nDemo.gModalDemo.Template.params({stringifyParams: itemData3236.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3236.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3236.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gModalDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3271 = opt_data.params.soydoc.docParams;
  var docParamListLen3271 = docParamList3271.length;
  for (var docParamIndex3271 = 0; docParamIndex3271 < docParamListLen3271; docParamIndex3271++) {
    var docParamData3271 = docParamList3271[docParamIndex3271];
    output += cl.lDoc.nDemo.gModalDemo.Template.docParams({stringifyParams: docParamData3271.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3278 = '{';
  lb__soy3278 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3278);
  var rb__soy3280 = '}';
  rb__soy3280 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3280);
  var iLimit3282 = opt_data.stringifyParams.length;
  for (var i3282 = 0; i3282 < iLimit3282; i3282++) {
    output += (opt_data.stringifyParams[i3282] == lb__soy3278) ? soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3282] == rb__soy3280) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + ((i3282 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3282 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3282] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3282] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + ((i3282 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3282 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3282] == ',') ? (opt_data.stringifyParams[i3282 - 1] == rb__soy3280 || opt_data.stringifyParams[i3282 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + '<br>' : (opt_data.stringifyParams[i3282] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + ' ' : (opt_data.stringifyParams[i3282] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3282]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.docParams';
}
