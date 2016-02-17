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
  var itemList2724 = opt_data.params.data;
  var itemListLen2724 = itemList2724.length;
  for (var itemIndex2724 = 0; itemIndex2724 < itemListLen2724; itemIndex2724++) {
    var itemData2724 = itemList2724[itemIndex2724];
    output += ((itemData2724.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2724.description) + '</h2>' : '') + ((itemData2724.showParams) ? cl.lDoc.nDemo.gDropdownDemo.Template.params({stringifyParams: itemData2724.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gDropdownDemo.Template.template({params: itemData2724.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gDropdownDemo.Template.template({params: itemData2724.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gDropdownDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2750 = opt_data.params.data;
  var itemListLen2750 = itemList2750.length;
  for (var itemIndex2750 = 0; itemIndex2750 < itemListLen2750; itemIndex2750++) {
    var itemData2750 = itemList2750[itemIndex2750];
    output += ((itemData2750.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2750.description) + '</h2>' : '') + ((itemData2750.showParams) ? cl.lDoc.nDemo.gDropdownDemo.Template.params({stringifyParams: itemData2750.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2750.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2750.stringifyParams) + '"></div>');
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
  var docParamList2784 = opt_data.params.soydoc.docParams;
  var docParamListLen2784 = docParamList2784.length;
  for (var docParamIndex2784 = 0; docParamIndex2784 < docParamListLen2784; docParamIndex2784++) {
    var docParamData2784 = docParamList2784[docParamIndex2784];
    output += cl.lDoc.nDemo.gDropdownDemo.Template.docParams({stringifyParams: docParamData2784.description}, null, opt_ijData);
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
  var lb__soy2791 = '{';
  lb__soy2791 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2791);
  var rb__soy2793 = '}';
  rb__soy2793 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2793);
  var iLimit2795 = opt_data.stringifyParams.length;
  for (var i2795 = 0; i2795 < iLimit2795; i2795++) {
    output += (opt_data.stringifyParams[i2795] == lb__soy2791) ? soy.$$escapeHtml(opt_data.stringifyParams[i2795]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2795] == rb__soy2793) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2795]) + ((i2795 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2795 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2795] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2795]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2795] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2795]) + ((i2795 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2795 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2795] == ',') ? (opt_data.stringifyParams[i2795 - 1] == rb__soy2793 || opt_data.stringifyParams[i2795 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2795]) + '<br>' : (opt_data.stringifyParams[i2795] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2795]) + ' ' : (opt_data.stringifyParams[i2795] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2795]);
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
