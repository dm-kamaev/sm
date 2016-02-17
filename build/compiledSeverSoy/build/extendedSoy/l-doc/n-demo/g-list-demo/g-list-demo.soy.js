// This file was automatically generated from g-list-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gListDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gListDemo == 'undefined') { cl.lDoc.nDemo.gListDemo = {}; }
if (typeof cl.lDoc.nDemo.gListDemo.Template == 'undefined') { cl.lDoc.nDemo.gListDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.listDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gListDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.listDemo.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.listDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gList.Template.list(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gListDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3089 = opt_data.params.data;
  var itemListLen3089 = itemList3089.length;
  for (var itemIndex3089 = 0; itemIndex3089 < itemListLen3089; itemIndex3089++) {
    var itemData3089 = itemList3089[itemIndex3089];
    output += ((itemData3089.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3089.description) + '</h2>' : '') + ((itemData3089.showParams) ? cl.lDoc.nDemo.gListDemo.Template.params({stringifyParams: itemData3089.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gListDemo.Template.template({params: itemData3089.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gListDemo.Template.template({params: itemData3089.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gListDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3115 = opt_data.params.data;
  var itemListLen3115 = itemList3115.length;
  for (var itemIndex3115 = 0; itemIndex3115 < itemListLen3115; itemIndex3115++) {
    var itemData3115 = itemList3115[itemIndex3115];
    output += ((itemData3115.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3115.description) + '</h2>' : '') + ((itemData3115.showParams) ? cl.lDoc.nDemo.gListDemo.Template.params({stringifyParams: itemData3115.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3115.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3115.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gListDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3150 = opt_data.params.soydoc.docParams;
  var docParamListLen3150 = docParamList3150.length;
  for (var docParamIndex3150 = 0; docParamIndex3150 < docParamListLen3150; docParamIndex3150++) {
    var docParamData3150 = docParamList3150[docParamIndex3150];
    output += cl.lDoc.nDemo.gListDemo.Template.docParams({stringifyParams: docParamData3150.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3157 = '{';
  lb__soy3157 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3157);
  var rb__soy3159 = '}';
  rb__soy3159 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3159);
  var iLimit3161 = opt_data.stringifyParams.length;
  for (var i3161 = 0; i3161 < iLimit3161; i3161++) {
    output += (opt_data.stringifyParams[i3161] == lb__soy3157) ? soy.$$escapeHtml(opt_data.stringifyParams[i3161]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3161] == rb__soy3159) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3161]) + ((i3161 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3161 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3161] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3161]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3161] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3161]) + ((i3161 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3161 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3161] == ',') ? (opt_data.stringifyParams[i3161 - 1] == rb__soy3159 || opt_data.stringifyParams[i3161 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3161]) + '<br>' : (opt_data.stringifyParams[i3161] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3161]) + ' ' : (opt_data.stringifyParams[i3161] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3161]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.docParams';
}
