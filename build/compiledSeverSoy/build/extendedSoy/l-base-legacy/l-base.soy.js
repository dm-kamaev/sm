// This file was automatically generated from l-base.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lBase.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lBase == 'undefined') { cl.lBase = {}; }
if (typeof cl.lBase.Template == 'undefined') { cl.lBase.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lBase.Template.index = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var layoutTitle__soy1448 = opt_data.title != null ? opt_data.title : 'School Market';
  output += '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><title>' + soy.$$escapeHtmlRcdata(opt_data.title) + '</title>' + cl.lBase.Template.css_(opt_data, null, opt_ijData) + '</head><body>' + ((opt_data.html) ? soy.$$escapeHtml(opt_data.html) : cl.lBase.Template.html_({title: layoutTitle__soy1448}, null, opt_ijData)) + cl.lBase.Template.js_(opt_data, null, opt_ijData) + '</body></html>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lBase.Template.index.soyTemplateName = 'cl.lBase.Template.index';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lBase.Template.html_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-base"><h1>' + soy.$$escapeHtml(opt_data.title) + '</h1><p>Welcome to ' + soy.$$escapeHtml(opt_data.title) + '!!!</p></div>');
};
if (goog.DEBUG) {
  cl.lBase.Template.html_.soyTemplateName = 'cl.lBase.Template.html_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lBase.Template.css_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.css) {
    var itemList1473 = opt_data.css;
    var itemListLen1473 = itemList1473.length;
    for (var itemIndex1473 = 0; itemIndex1473 < itemListLen1473; itemIndex1473++) {
      var itemData1473 = itemList1473[itemIndex1473];
      output += '<link rel=\'stylesheet\' href=\'' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(itemData1473)) + '\' />';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lBase.Template.css_.soyTemplateName = 'cl.lBase.Template.css_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lBase.Template.js_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.js) {
    var itemList1481 = opt_data.js;
    var itemListLen1481 = itemList1481.length;
    for (var itemIndex1481 = 0; itemIndex1481 < itemListLen1481; itemIndex1481++) {
      var itemData1481 = itemList1481[itemIndex1481];
      output += '<script type="text/javascript" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(itemData1481)) + '"><\/script>';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lBase.Template.js_.soyTemplateName = 'cl.lBase.Template.js_';
}
