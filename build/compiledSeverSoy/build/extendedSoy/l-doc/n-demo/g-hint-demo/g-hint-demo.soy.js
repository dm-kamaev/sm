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
  var itemList2845 = opt_data.params.data;
  var itemListLen2845 = itemList2845.length;
  for (var itemIndex2845 = 0; itemIndex2845 < itemListLen2845; itemIndex2845++) {
    var itemData2845 = itemList2845[itemIndex2845];
    output += ((itemData2845.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2845.description) + '</h2>' : '') + ((itemData2845.showParams) ? cl.lDoc.nDemo.gHintDemo.Template.params({stringifyParams: itemData2845.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gHintDemo.Template.template({params: itemData2845.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gHintDemo.Template.template({params: itemData2845.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gHintDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2871 = opt_data.params.data;
  var itemListLen2871 = itemList2871.length;
  for (var itemIndex2871 = 0; itemIndex2871 < itemListLen2871; itemIndex2871++) {
    var itemData2871 = itemList2871[itemIndex2871];
    output += ((itemData2871.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2871.description) + '</h2>' : '') + ((itemData2871.showParams) ? cl.lDoc.nDemo.gHintDemo.Template.params({stringifyParams: itemData2871.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2871.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2871.stringifyParams) + '"></div>');
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
  var docParamList2906 = opt_data.params.soydoc.docParams;
  var docParamListLen2906 = docParamList2906.length;
  for (var docParamIndex2906 = 0; docParamIndex2906 < docParamListLen2906; docParamIndex2906++) {
    var docParamData2906 = docParamList2906[docParamIndex2906];
    output += cl.lDoc.nDemo.gHintDemo.Template.docParams({stringifyParams: docParamData2906.description}, null, opt_ijData);
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
  var lb__soy2913 = '{';
  lb__soy2913 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2913);
  var rb__soy2915 = '}';
  rb__soy2915 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2915);
  var iLimit2917 = opt_data.stringifyParams.length;
  for (var i2917 = 0; i2917 < iLimit2917; i2917++) {
    output += (opt_data.stringifyParams[i2917] == lb__soy2913) ? soy.$$escapeHtml(opt_data.stringifyParams[i2917]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2917] == rb__soy2915) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2917]) + ((i2917 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2917 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2917] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2917]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2917] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2917]) + ((i2917 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2917 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2917] == ',') ? (opt_data.stringifyParams[i2917 - 1] == rb__soy2915 || opt_data.stringifyParams[i2917 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2917]) + '<br>' : (opt_data.stringifyParams[i2917] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2917]) + ' ' : (opt_data.stringifyParams[i2917] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2917]);
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
