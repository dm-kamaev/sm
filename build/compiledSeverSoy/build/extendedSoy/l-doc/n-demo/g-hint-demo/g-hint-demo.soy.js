// This file was automatically generated from g-hint-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gHintDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gHintDemo == 'undefined') { cl.lDoc.nDemo.gHintDemo = {}; }
if (typeof cl.lDoc.nDemo.gHintDemo.Template == 'undefined') { cl.lDoc.nDemo.gHintDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.hintDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gHintDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.hintDemo.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.hintDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gButton.Template.button(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gHintDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList2844 = opt_data.params.data;
  var itemListLen2844 = itemList2844.length;
  for (var itemIndex2844 = 0; itemIndex2844 < itemListLen2844; itemIndex2844++) {
    var itemData2844 = itemList2844[itemIndex2844];
    output += ((itemData2844.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2844.description) + '</h2>' : '') + ((itemData2844.showParams) ? cl.lDoc.nDemo.gHintDemo.Template.params({stringifyParams: itemData2844.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gHintDemo.Template.template({params: itemData2844.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gHintDemo.Template.template({params: itemData2844.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gHintDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2870 = opt_data.params.data;
  var itemListLen2870 = itemList2870.length;
  for (var itemIndex2870 = 0; itemIndex2870 < itemListLen2870; itemIndex2870++) {
    var itemData2870 = itemList2870[itemIndex2870];
    output += ((itemData2870.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2870.description) + '</h2>' : '') + ((itemData2870.showParams) ? cl.lDoc.nDemo.gHintDemo.Template.params({stringifyParams: itemData2870.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2870.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2870.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gHintDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList2905 = opt_data.params.soydoc.docParams;
  var docParamListLen2905 = docParamList2905.length;
  for (var docParamIndex2905 = 0; docParamIndex2905 < docParamListLen2905; docParamIndex2905++) {
    var docParamData2905 = docParamList2905[docParamIndex2905];
    output += cl.lDoc.nDemo.gHintDemo.Template.docParams({stringifyParams: docParamData2905.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy2912 = '{';
  lb__soy2912 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2912);
  var rb__soy2914 = '}';
  rb__soy2914 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2914);
  var iLimit2916 = opt_data.stringifyParams.length;
  for (var i2916 = 0; i2916 < iLimit2916; i2916++) {
    output += (opt_data.stringifyParams[i2916] == lb__soy2912) ? soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2916] == rb__soy2914) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + ((i2916 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2916 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2916] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2916] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + ((i2916 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2916 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2916] == ',') ? (opt_data.stringifyParams[i2916 - 1] == rb__soy2914 || opt_data.stringifyParams[i2916 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + '<br>' : (opt_data.stringifyParams[i2916] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + ' ' : (opt_data.stringifyParams[i2916] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2916]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.docParams';
}
