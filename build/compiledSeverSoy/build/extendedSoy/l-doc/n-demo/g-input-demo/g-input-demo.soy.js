// This file was automatically generated from g-input-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gInputDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gInputDemo == 'undefined') { cl.lDoc.nDemo.gInputDemo = {}; }
if (typeof cl.lDoc.nDemo.gInputDemo.Template == 'undefined') { cl.lDoc.nDemo.gInputDemo.Template = {}; }


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
  var itemList2967 = opt_data.params.data;
  var itemListLen2967 = itemList2967.length;
  for (var itemIndex2967 = 0; itemIndex2967 < itemListLen2967; itemIndex2967++) {
    var itemData2967 = itemList2967[itemIndex2967];
    output += ((itemData2967.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2967.description) + '</h2>' : '') + ((itemData2967.showParams) ? cl.lDoc.nDemo.gInputDemo.Template.params({stringifyParams: itemData2967.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gInputDemo.Template.template({params: itemData2967.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gInputDemo.Template.template({params: itemData2967.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gInputDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2993 = opt_data.params.data;
  var itemListLen2993 = itemList2993.length;
  for (var itemIndex2993 = 0; itemIndex2993 < itemListLen2993; itemIndex2993++) {
    var itemData2993 = itemList2993[itemIndex2993];
    output += ((itemData2993.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2993.description) + '</h2>' : '') + ((itemData2993.showParams) ? cl.lDoc.nDemo.gInputDemo.Template.params({stringifyParams: itemData2993.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2993.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2993.stringifyParams) + '"></div>');
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
  var docParamList3028 = opt_data.params.soydoc.docParams;
  var docParamListLen3028 = docParamList3028.length;
  for (var docParamIndex3028 = 0; docParamIndex3028 < docParamListLen3028; docParamIndex3028++) {
    var docParamData3028 = docParamList3028[docParamIndex3028];
    output += cl.lDoc.nDemo.gInputDemo.Template.docParams({stringifyParams: docParamData3028.description}, null, opt_ijData);
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
  var lb__soy3035 = '{';
  lb__soy3035 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3035);
  var rb__soy3037 = '}';
  rb__soy3037 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3037);
  var iLimit3039 = opt_data.stringifyParams.length;
  for (var i3039 = 0; i3039 < iLimit3039; i3039++) {
    output += (opt_data.stringifyParams[i3039] == lb__soy3035) ? soy.$$escapeHtml(opt_data.stringifyParams[i3039]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3039] == rb__soy3037) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3039]) + ((i3039 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3039 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3039] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3039]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3039] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3039]) + ((i3039 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3039 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3039] == ',') ? (opt_data.stringifyParams[i3039 - 1] == rb__soy3037 || opt_data.stringifyParams[i3039 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3039]) + '<br>' : (opt_data.stringifyParams[i3039] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3039]) + ' ' : (opt_data.stringifyParams[i3039] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3039]);
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
