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
  var itemList3088 = opt_data.params.data;
  var itemListLen3088 = itemList3088.length;
  for (var itemIndex3088 = 0; itemIndex3088 < itemListLen3088; itemIndex3088++) {
    var itemData3088 = itemList3088[itemIndex3088];
    output += ((itemData3088.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3088.description) + '</h2>' : '') + ((itemData3088.showParams) ? cl.lDoc.nDemo.gListDemo.Template.params({stringifyParams: itemData3088.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gListDemo.Template.template({params: itemData3088.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gListDemo.Template.template({params: itemData3088.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gListDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3114 = opt_data.params.data;
  var itemListLen3114 = itemList3114.length;
  for (var itemIndex3114 = 0; itemIndex3114 < itemListLen3114; itemIndex3114++) {
    var itemData3114 = itemList3114[itemIndex3114];
    output += ((itemData3114.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3114.description) + '</h2>' : '') + ((itemData3114.showParams) ? cl.lDoc.nDemo.gListDemo.Template.params({stringifyParams: itemData3114.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3114.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3114.stringifyParams) + '"></div>');
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
  var docParamList3149 = opt_data.params.soydoc.docParams;
  var docParamListLen3149 = docParamList3149.length;
  for (var docParamIndex3149 = 0; docParamIndex3149 < docParamListLen3149; docParamIndex3149++) {
    var docParamData3149 = docParamList3149[docParamIndex3149];
    output += cl.lDoc.nDemo.gListDemo.Template.docParams({stringifyParams: docParamData3149.description}, null, opt_ijData);
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
  var lb__soy3156 = '{';
  lb__soy3156 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3156);
  var rb__soy3158 = '}';
  rb__soy3158 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3158);
  var iLimit3160 = opt_data.stringifyParams.length;
  for (var i3160 = 0; i3160 < iLimit3160; i3160++) {
    output += (opt_data.stringifyParams[i3160] == lb__soy3156) ? soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3160] == rb__soy3158) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + ((i3160 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3160 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3160] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3160] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + ((i3160 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3160 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3160] == ',') ? (opt_data.stringifyParams[i3160 - 1] == rb__soy3158 || opt_data.stringifyParams[i3160 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + '<br>' : (opt_data.stringifyParams[i3160] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + ' ' : (opt_data.stringifyParams[i3160] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3160]);
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
