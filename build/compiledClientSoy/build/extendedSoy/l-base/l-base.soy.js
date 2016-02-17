// This file was automatically generated from l-base.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lBase.Template.
 */

goog.provide('sm.lBase.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lBase.Template.index = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var layoutTitle__soy1408 = opt_data.title != null ? opt_data.title : 'School Market';
  output += '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><title>' + soy.$$escapeHtmlRcdata(opt_data.title) + '</title>' + sm.lBase.Template.css_(opt_data, null, opt_ijData) + '</head><body>' + ((opt_data.html) ? soy.$$escapeHtml(opt_data.html) : sm.lBase.Template.html_({title: layoutTitle__soy1408}, null, opt_ijData)) + sm.lBase.Template.js_(opt_data, null, opt_ijData) + '</body></html>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lBase.Template.index.soyTemplateName = 'sm.lBase.Template.index';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lBase.Template.html_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-base"><h1>' + soy.$$escapeHtml(opt_data.title) + '</h1><p>Welcome to ' + soy.$$escapeHtml(opt_data.title) + '!!!</p></div>');
};
if (goog.DEBUG) {
  sm.lBase.Template.html_.soyTemplateName = 'sm.lBase.Template.html_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lBase.Template.css_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.css) {
    var itemList1433 = opt_data.css;
    var itemListLen1433 = itemList1433.length;
    for (var itemIndex1433 = 0; itemIndex1433 < itemListLen1433; itemIndex1433++) {
      var itemData1433 = itemList1433[itemIndex1433];
      output += '<link rel=\'stylesheet\' href=\'' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(itemData1433)) + '\' />';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lBase.Template.css_.soyTemplateName = 'sm.lBase.Template.css_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lBase.Template.js_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.js) {
    var itemList1441 = opt_data.js;
    var itemListLen1441 = itemList1441.length;
    for (var itemIndex1441 = 0; itemIndex1441 < itemListLen1441; itemIndex1441++) {
      var itemData1441 = itemList1441[itemIndex1441];
      output += '<script type="text/javascript" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(itemData1441)) + '"><\/script>';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lBase.Template.js_.soyTemplateName = 'sm.lBase.Template.js_';
}
