// This file was automatically generated from g-dropdown-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gDropdownDemo.Template.
 */

goog.provide('cl.lDoc.nDemo.gDropdownDemo.Template');

goog.require('soy');
goog.require('soydata');
goog.require('cl.iFactory.FactoryManager.INSTANCE');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.dropdownDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gDropdownDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.dropdownDemo.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.dropdownDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(cl.iFactory.FactoryManager.INSTANCE.renderTemplate({params: {factory: 'abstract', type: 'dropdown', renderParams: opt_data.params}}, null, opt_ijData)));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(cl.iFactory.FactoryManager.INSTANCE.renderTemplate({params: {factory: 'abstract', type: 'dropdown', renderParams: {data: {opener: 'dropdown', content: 'CONTENT!'}}}}, null, opt_ijData)));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gDropdownDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList2601 = opt_data.params.data;
  var itemListLen2601 = itemList2601.length;
  for (var itemIndex2601 = 0; itemIndex2601 < itemListLen2601; itemIndex2601++) {
    var itemData2601 = itemList2601[itemIndex2601];
    output += ((itemData2601.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2601.description) + '</h2>' : '') + ((itemData2601.showParams) ? cl.lDoc.nDemo.gDropdownDemo.Template.params({stringifyParams: itemData2601.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gDropdownDemo.Template.template({params: itemData2601.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gDropdownDemo.Template.template({params: itemData2601.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gDropdownDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2627 = opt_data.params.data;
  var itemListLen2627 = itemList2627.length;
  for (var itemIndex2627 = 0; itemIndex2627 < itemListLen2627; itemIndex2627++) {
    var itemData2627 = itemList2627[itemIndex2627];
    output += ((itemData2627.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2627.description) + '</h2>' : '') + ((itemData2627.showParams) ? cl.lDoc.nDemo.gDropdownDemo.Template.params({stringifyParams: itemData2627.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2627.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2627.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gDropdownDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList2661 = opt_data.params.soydoc.docParams;
  var docParamListLen2661 = docParamList2661.length;
  for (var docParamIndex2661 = 0; docParamIndex2661 < docParamListLen2661; docParamIndex2661++) {
    var docParamData2661 = docParamList2661[docParamIndex2661];
    output += cl.lDoc.nDemo.gDropdownDemo.Template.docParams({stringifyParams: docParamData2661.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy2668 = '{';
  lb__soy2668 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2668);
  var rb__soy2670 = '}';
  rb__soy2670 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2670);
  var iLimit2672 = opt_data.stringifyParams.length;
  for (var i2672 = 0; i2672 < iLimit2672; i2672++) {
    output += (opt_data.stringifyParams[i2672] == lb__soy2668) ? soy.$$escapeHtml(opt_data.stringifyParams[i2672]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2672] == rb__soy2670) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2672]) + ((i2672 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2672 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2672] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2672]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2672] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2672]) + ((i2672 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2672 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2672] == ',') ? (opt_data.stringifyParams[i2672 - 1] == rb__soy2670 || opt_data.stringifyParams[i2672 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2672]) + '<br>' : (opt_data.stringifyParams[i2672] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2672]) + ' ' : (opt_data.stringifyParams[i2672] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2672]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.docParams';
}
