// This file was automatically generated from b-link.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bLink.Template.
 */

goog.provide('sm.bLink.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bLink.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<a href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.data.url)) + '" class="b-link">' + soy.$$escapeHtml(opt_data.params.data.name) + '</a>');
};
if (goog.DEBUG) {
  sm.bLink.Template.base.soyTemplateName = 'sm.bLink.Template.base';
}
