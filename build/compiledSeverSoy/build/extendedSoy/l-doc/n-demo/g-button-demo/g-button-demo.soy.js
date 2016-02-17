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
  var itemList2598 = opt_data.params.data;
  var itemListLen2598 = itemList2598.length;
  for (var itemIndex2598 = 0; itemIndex2598 < itemListLen2598; itemIndex2598++) {
    var itemData2598 = itemList2598[itemIndex2598];
    output += ((itemData2598.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2598.description) + '</h2>' : '') + ((itemData2598.showParams) ? cl.lDoc.nDemo.gButtonDemo.Template.params({stringifyParams: itemData2598.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gButtonDemo.Template.template({params: itemData2598.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gButtonDemo.Template.template({params: itemData2598.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gButtonDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2624 = opt_data.params.data;
  var itemListLen2624 = itemList2624.length;
  for (var itemIndex2624 = 0; itemIndex2624 < itemListLen2624; itemIndex2624++) {
    var itemData2624 = itemList2624[itemIndex2624];
    output += ((itemData2624.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2624.description) + '</h2>' : '') + ((itemData2624.showParams) ? cl.lDoc.nDemo.gButtonDemo.Template.params({stringifyParams: itemData2624.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2624.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2624.stringifyParams) + '"></div>');
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
  var docParamList2659 = opt_data.params.soydoc.docParams;
  var docParamListLen2659 = docParamList2659.length;
  for (var docParamIndex2659 = 0; docParamIndex2659 < docParamListLen2659; docParamIndex2659++) {
    var docParamData2659 = docParamList2659[docParamIndex2659];
    output += cl.lDoc.nDemo.gButtonDemo.Template.docParams({stringifyParams: docParamData2659.description}, null, opt_ijData);
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
  var lb__soy2666 = '{';
  lb__soy2666 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2666);
  var rb__soy2668 = '}';
  rb__soy2668 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2668);
  var iLimit2670 = opt_data.stringifyParams.length;
  for (var i2670 = 0; i2670 < iLimit2670; i2670++) {
    output += (opt_data.stringifyParams[i2670] == lb__soy2666) ? soy.$$escapeHtml(opt_data.stringifyParams[i2670]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2670] == rb__soy2668) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2670]) + ((i2670 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2670 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2670] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2670]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2670] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2670]) + ((i2670 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2670 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2670] == ',') ? (opt_data.stringifyParams[i2670 - 1] == rb__soy2668 || opt_data.stringifyParams[i2670 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2670]) + '<br>' : (opt_data.stringifyParams[i2670] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2670]) + ' ' : (opt_data.stringifyParams[i2670] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2670]);
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
