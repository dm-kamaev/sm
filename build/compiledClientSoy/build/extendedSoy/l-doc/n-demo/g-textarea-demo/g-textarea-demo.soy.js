// This file was automatically generated from g-textarea-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gTextareaDemo.Template.
 */

goog.provide('cl.lDoc.nDemo.gTextareaDemo.Template');

goog.require('soy');
goog.require('soydata');
goog.require('cl.gTextarea.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.textareaDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gTextareaDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.textareaDemo.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.textareaDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTextarea.Template.textarea(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gTextareaDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3454 = opt_data.params.data;
  var itemListLen3454 = itemList3454.length;
  for (var itemIndex3454 = 0; itemIndex3454 < itemListLen3454; itemIndex3454++) {
    var itemData3454 = itemList3454[itemIndex3454];
    output += ((itemData3454.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3454.description) + '</h2>' : '') + ((itemData3454.showParams) ? cl.lDoc.nDemo.gTextareaDemo.Template.params({stringifyParams: itemData3454.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gTextareaDemo.Template.template({params: itemData3454.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gTextareaDemo.Template.template({params: itemData3454.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gTextareaDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3480 = opt_data.params.data;
  var itemListLen3480 = itemList3480.length;
  for (var itemIndex3480 = 0; itemIndex3480 < itemListLen3480; itemIndex3480++) {
    var itemData3480 = itemList3480[itemIndex3480];
    output += ((itemData3480.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3480.description) + '</h2>' : '') + ((itemData3480.showParams) ? cl.lDoc.nDemo.gTextareaDemo.Template.params({stringifyParams: itemData3480.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3480.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3480.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gTextareaDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3515 = opt_data.params.soydoc.docParams;
  var docParamListLen3515 = docParamList3515.length;
  for (var docParamIndex3515 = 0; docParamIndex3515 < docParamListLen3515; docParamIndex3515++) {
    var docParamData3515 = docParamList3515[docParamIndex3515];
    output += cl.lDoc.nDemo.gTextareaDemo.Template.docParams({stringifyParams: docParamData3515.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3522 = '{';
  lb__soy3522 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3522);
  var rb__soy3524 = '}';
  rb__soy3524 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3524);
  var iLimit3526 = opt_data.stringifyParams.length;
  for (var i3526 = 0; i3526 < iLimit3526; i3526++) {
    output += (opt_data.stringifyParams[i3526] == lb__soy3522) ? soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3526] == rb__soy3524) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + ((i3526 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3526 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3526] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3526] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + ((i3526 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3526 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3526] == ',') ? (opt_data.stringifyParams[i3526 - 1] == rb__soy3524 || opt_data.stringifyParams[i3526 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + '<br>' : (opt_data.stringifyParams[i3526] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + ' ' : (opt_data.stringifyParams[i3526] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3526]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.docParams';
}
