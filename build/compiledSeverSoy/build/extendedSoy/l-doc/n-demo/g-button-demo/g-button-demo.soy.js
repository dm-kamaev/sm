// This file was automatically generated from g-button-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gButtonDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gButtonDemo == 'undefined') { cl.lDoc.nDemo.gButtonDemo = {}; }
if (typeof cl.lDoc.nDemo.gButtonDemo.Template == 'undefined') { cl.lDoc.nDemo.gButtonDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.buttonDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gButtonDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.buttonDemo.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.buttonDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gButton.Template.button(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gButtonDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList2597 = opt_data.params.data;
  var itemListLen2597 = itemList2597.length;
  for (var itemIndex2597 = 0; itemIndex2597 < itemListLen2597; itemIndex2597++) {
    var itemData2597 = itemList2597[itemIndex2597];
    output += ((itemData2597.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2597.description) + '</h2>' : '') + ((itemData2597.showParams) ? cl.lDoc.nDemo.gButtonDemo.Template.params({stringifyParams: itemData2597.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gButtonDemo.Template.template({params: itemData2597.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gButtonDemo.Template.template({params: itemData2597.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gButtonDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2623 = opt_data.params.data;
  var itemListLen2623 = itemList2623.length;
  for (var itemIndex2623 = 0; itemIndex2623 < itemListLen2623; itemIndex2623++) {
    var itemData2623 = itemList2623[itemIndex2623];
    output += ((itemData2623.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2623.description) + '</h2>' : '') + ((itemData2623.showParams) ? cl.lDoc.nDemo.gButtonDemo.Template.params({stringifyParams: itemData2623.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2623.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2623.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gButtonDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList2658 = opt_data.params.soydoc.docParams;
  var docParamListLen2658 = docParamList2658.length;
  for (var docParamIndex2658 = 0; docParamIndex2658 < docParamListLen2658; docParamIndex2658++) {
    var docParamData2658 = docParamList2658[docParamIndex2658];
    output += cl.lDoc.nDemo.gButtonDemo.Template.docParams({stringifyParams: docParamData2658.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy2665 = '{';
  lb__soy2665 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2665);
  var rb__soy2667 = '}';
  rb__soy2667 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2667);
  var iLimit2669 = opt_data.stringifyParams.length;
  for (var i2669 = 0; i2669 < iLimit2669; i2669++) {
    output += (opt_data.stringifyParams[i2669] == lb__soy2665) ? soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2669] == rb__soy2667) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + ((i2669 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2669 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2669] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2669] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + ((i2669 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2669 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2669] == ',') ? (opt_data.stringifyParams[i2669 - 1] == rb__soy2667 || opt_data.stringifyParams[i2669 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + '<br>' : (opt_data.stringifyParams[i2669] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + ' ' : (opt_data.stringifyParams[i2669] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2669]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.docParams';
}
