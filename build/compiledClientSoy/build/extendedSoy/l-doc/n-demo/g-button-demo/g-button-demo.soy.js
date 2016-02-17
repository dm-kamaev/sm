// This file was automatically generated from g-button-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gButtonDemo.Template.
 */

goog.provide('cl.lDoc.nDemo.gButtonDemo.Template');

goog.require('soy');
goog.require('soydata');
goog.require('cl.gButton.Template');


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
  var itemList2722 = opt_data.params.data;
  var itemListLen2722 = itemList2722.length;
  for (var itemIndex2722 = 0; itemIndex2722 < itemListLen2722; itemIndex2722++) {
    var itemData2722 = itemList2722[itemIndex2722];
    output += ((itemData2722.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2722.description) + '</h2>' : '') + ((itemData2722.showParams) ? cl.lDoc.nDemo.gButtonDemo.Template.params({stringifyParams: itemData2722.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gButtonDemo.Template.template({params: itemData2722.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gButtonDemo.Template.template({params: itemData2722.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gButtonDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2748 = opt_data.params.data;
  var itemListLen2748 = itemList2748.length;
  for (var itemIndex2748 = 0; itemIndex2748 < itemListLen2748; itemIndex2748++) {
    var itemData2748 = itemList2748[itemIndex2748];
    output += ((itemData2748.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2748.description) + '</h2>' : '') + ((itemData2748.showParams) ? cl.lDoc.nDemo.gButtonDemo.Template.params({stringifyParams: itemData2748.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2748.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2748.stringifyParams) + '"></div>');
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
  var docParamList2783 = opt_data.params.soydoc.docParams;
  var docParamListLen2783 = docParamList2783.length;
  for (var docParamIndex2783 = 0; docParamIndex2783 < docParamListLen2783; docParamIndex2783++) {
    var docParamData2783 = docParamList2783[docParamIndex2783];
    output += cl.lDoc.nDemo.gButtonDemo.Template.docParams({stringifyParams: docParamData2783.description}, null, opt_ijData);
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
  var lb__soy2790 = '{';
  lb__soy2790 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2790);
  var rb__soy2792 = '}';
  rb__soy2792 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2792);
  var iLimit2794 = opt_data.stringifyParams.length;
  for (var i2794 = 0; i2794 < iLimit2794; i2794++) {
    output += (opt_data.stringifyParams[i2794] == lb__soy2790) ? soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2794] == rb__soy2792) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + ((i2794 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2794 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2794] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2794] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + ((i2794 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2794 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2794] == ',') ? (opt_data.stringifyParams[i2794 - 1] == rb__soy2792 || opt_data.stringifyParams[i2794 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + '<br>' : (opt_data.stringifyParams[i2794] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + ' ' : (opt_data.stringifyParams[i2794] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2794]);
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
