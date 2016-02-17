// This file was automatically generated from g-modal-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gModalDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gModalDemo == 'undefined') { cl.lDoc.nDemo.gModalDemo = {}; }
if (typeof cl.lDoc.nDemo.gModalDemo.Template == 'undefined') { cl.lDoc.nDemo.gModalDemo.Template = {}; }


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
  var itemList3211 = opt_data.params.data;
  var itemListLen3211 = itemList3211.length;
  for (var itemIndex3211 = 0; itemIndex3211 < itemListLen3211; itemIndex3211++) {
    var itemData3211 = itemList3211[itemIndex3211];
    output += ((itemData3211.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3211.description) + '</h2>' : '') + ((itemData3211.showParams) ? cl.lDoc.nDemo.gModalDemo.Template.params({stringifyParams: itemData3211.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gModalDemo.Template.template({params: itemData3211.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gModalDemo.Template.template({params: itemData3211.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gModalDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3237 = opt_data.params.data;
  var itemListLen3237 = itemList3237.length;
  for (var itemIndex3237 = 0; itemIndex3237 < itemListLen3237; itemIndex3237++) {
    var itemData3237 = itemList3237[itemIndex3237];
    output += ((itemData3237.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3237.description) + '</h2>' : '') + ((itemData3237.showParams) ? cl.lDoc.nDemo.gModalDemo.Template.params({stringifyParams: itemData3237.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3237.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3237.stringifyParams) + '"></div>');
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
  var docParamList3272 = opt_data.params.soydoc.docParams;
  var docParamListLen3272 = docParamList3272.length;
  for (var docParamIndex3272 = 0; docParamIndex3272 < docParamListLen3272; docParamIndex3272++) {
    var docParamData3272 = docParamList3272[docParamIndex3272];
    output += cl.lDoc.nDemo.gModalDemo.Template.docParams({stringifyParams: docParamData3272.description}, null, opt_ijData);
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
  var lb__soy3279 = '{';
  lb__soy3279 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3279);
  var rb__soy3281 = '}';
  rb__soy3281 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3281);
  var iLimit3283 = opt_data.stringifyParams.length;
  for (var i3283 = 0; i3283 < iLimit3283; i3283++) {
    output += (opt_data.stringifyParams[i3283] == lb__soy3279) ? soy.$$escapeHtml(opt_data.stringifyParams[i3283]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3283] == rb__soy3281) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3283]) + ((i3283 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3283 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3283] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3283]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3283] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3283]) + ((i3283 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3283 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3283] == ',') ? (opt_data.stringifyParams[i3283 - 1] == rb__soy3281 || opt_data.stringifyParams[i3283 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3283]) + '<br>' : (opt_data.stringifyParams[i3283] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3283]) + ' ' : (opt_data.stringifyParams[i3283] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3283]);
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
