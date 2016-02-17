// This file was automatically generated from g-textarea-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gTextareaDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gTextareaDemo == 'undefined') { cl.lDoc.nDemo.gTextareaDemo = {}; }
if (typeof cl.lDoc.nDemo.gTextareaDemo.Template == 'undefined') { cl.lDoc.nDemo.gTextareaDemo.Template = {}; }


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
  var itemList3455 = opt_data.params.data;
  var itemListLen3455 = itemList3455.length;
  for (var itemIndex3455 = 0; itemIndex3455 < itemListLen3455; itemIndex3455++) {
    var itemData3455 = itemList3455[itemIndex3455];
    output += ((itemData3455.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3455.description) + '</h2>' : '') + ((itemData3455.showParams) ? cl.lDoc.nDemo.gTextareaDemo.Template.params({stringifyParams: itemData3455.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gTextareaDemo.Template.template({params: itemData3455.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gTextareaDemo.Template.template({params: itemData3455.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gTextareaDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3481 = opt_data.params.data;
  var itemListLen3481 = itemList3481.length;
  for (var itemIndex3481 = 0; itemIndex3481 < itemListLen3481; itemIndex3481++) {
    var itemData3481 = itemList3481[itemIndex3481];
    output += ((itemData3481.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3481.description) + '</h2>' : '') + ((itemData3481.showParams) ? cl.lDoc.nDemo.gTextareaDemo.Template.params({stringifyParams: itemData3481.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3481.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3481.stringifyParams) + '"></div>');
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
  var docParamList3516 = opt_data.params.soydoc.docParams;
  var docParamListLen3516 = docParamList3516.length;
  for (var docParamIndex3516 = 0; docParamIndex3516 < docParamListLen3516; docParamIndex3516++) {
    var docParamData3516 = docParamList3516[docParamIndex3516];
    output += cl.lDoc.nDemo.gTextareaDemo.Template.docParams({stringifyParams: docParamData3516.description}, null, opt_ijData);
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
  var lb__soy3523 = '{';
  lb__soy3523 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3523);
  var rb__soy3525 = '}';
  rb__soy3525 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3525);
  var iLimit3527 = opt_data.stringifyParams.length;
  for (var i3527 = 0; i3527 < iLimit3527; i3527++) {
    output += (opt_data.stringifyParams[i3527] == lb__soy3523) ? soy.$$escapeHtml(opt_data.stringifyParams[i3527]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3527] == rb__soy3525) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3527]) + ((i3527 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3527 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3527] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3527]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3527] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3527]) + ((i3527 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3527 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3527] == ',') ? (opt_data.stringifyParams[i3527 - 1] == rb__soy3525 || opt_data.stringifyParams[i3527 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3527]) + '<br>' : (opt_data.stringifyParams[i3527] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3527]) + ' ' : (opt_data.stringifyParams[i3527] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3527]);
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
