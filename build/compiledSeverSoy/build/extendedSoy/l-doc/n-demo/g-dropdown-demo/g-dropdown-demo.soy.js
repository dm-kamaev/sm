// This file was automatically generated from g-dropdown-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gDropdownDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gDropdownDemo == 'undefined') { cl.lDoc.nDemo.gDropdownDemo = {}; }
if (typeof cl.lDoc.nDemo.gDropdownDemo.Template == 'undefined') { cl.lDoc.nDemo.gDropdownDemo.Template = {}; }


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
  var itemList2723 = opt_data.params.data;
  var itemListLen2723 = itemList2723.length;
  for (var itemIndex2723 = 0; itemIndex2723 < itemListLen2723; itemIndex2723++) {
    var itemData2723 = itemList2723[itemIndex2723];
    output += ((itemData2723.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2723.description) + '</h2>' : '') + ((itemData2723.showParams) ? cl.lDoc.nDemo.gDropdownDemo.Template.params({stringifyParams: itemData2723.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gDropdownDemo.Template.template({params: itemData2723.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gDropdownDemo.Template.template({params: itemData2723.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gDropdownDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2749 = opt_data.params.data;
  var itemListLen2749 = itemList2749.length;
  for (var itemIndex2749 = 0; itemIndex2749 < itemListLen2749; itemIndex2749++) {
    var itemData2749 = itemList2749[itemIndex2749];
    output += ((itemData2749.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2749.description) + '</h2>' : '') + ((itemData2749.showParams) ? cl.lDoc.nDemo.gDropdownDemo.Template.params({stringifyParams: itemData2749.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2749.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2749.stringifyParams) + '"></div>');
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
  var docParamList2783 = opt_data.params.soydoc.docParams;
  var docParamListLen2783 = docParamList2783.length;
  for (var docParamIndex2783 = 0; docParamIndex2783 < docParamListLen2783; docParamIndex2783++) {
    var docParamData2783 = docParamList2783[docParamIndex2783];
    output += cl.lDoc.nDemo.gDropdownDemo.Template.docParams({stringifyParams: docParamData2783.description}, null, opt_ijData);
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
