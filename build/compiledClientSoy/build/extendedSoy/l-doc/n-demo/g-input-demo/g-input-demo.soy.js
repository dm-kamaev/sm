// This file was automatically generated from g-input-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gInputDemo.Template.
 */

goog.provide('cl.lDoc.nDemo.gInputDemo.Template');

goog.require('soy');
goog.require('soydata');
goog.require('cl.gInput.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.inputDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gInputDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.inputDemo.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.inputDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gInput.Template.input(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gInputDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList2966 = opt_data.params.data;
  var itemListLen2966 = itemList2966.length;
  for (var itemIndex2966 = 0; itemIndex2966 < itemListLen2966; itemIndex2966++) {
    var itemData2966 = itemList2966[itemIndex2966];
    output += ((itemData2966.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2966.description) + '</h2>' : '') + ((itemData2966.showParams) ? cl.lDoc.nDemo.gInputDemo.Template.params({stringifyParams: itemData2966.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gInputDemo.Template.template({params: itemData2966.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gInputDemo.Template.template({params: itemData2966.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gInputDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2992 = opt_data.params.data;
  var itemListLen2992 = itemList2992.length;
  for (var itemIndex2992 = 0; itemIndex2992 < itemListLen2992; itemIndex2992++) {
    var itemData2992 = itemList2992[itemIndex2992];
    output += ((itemData2992.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2992.description) + '</h2>' : '') + ((itemData2992.showParams) ? cl.lDoc.nDemo.gInputDemo.Template.params({stringifyParams: itemData2992.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2992.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2992.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gInputDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3027 = opt_data.params.soydoc.docParams;
  var docParamListLen3027 = docParamList3027.length;
  for (var docParamIndex3027 = 0; docParamIndex3027 < docParamListLen3027; docParamIndex3027++) {
    var docParamData3027 = docParamList3027[docParamIndex3027];
    output += cl.lDoc.nDemo.gInputDemo.Template.docParams({stringifyParams: docParamData3027.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3034 = '{';
  lb__soy3034 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3034);
  var rb__soy3036 = '}';
  rb__soy3036 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3036);
  var iLimit3038 = opt_data.stringifyParams.length;
  for (var i3038 = 0; i3038 < iLimit3038; i3038++) {
    output += (opt_data.stringifyParams[i3038] == lb__soy3034) ? soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3038] == rb__soy3036) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + ((i3038 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3038 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3038] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3038] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + ((i3038 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3038 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3038] == ',') ? (opt_data.stringifyParams[i3038 - 1] == rb__soy3036 || opt_data.stringifyParams[i3038 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + '<br>' : (opt_data.stringifyParams[i3038] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + ' ' : (opt_data.stringifyParams[i3038] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3038]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.docParams';
}
