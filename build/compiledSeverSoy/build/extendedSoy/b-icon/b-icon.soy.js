// This file was automatically generated from b-icon.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bIcon.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bIcon == 'undefined') { sm.bIcon = {}; }
if (typeof sm.bIcon.Template == 'undefined') { sm.bIcon.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bIcon.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-icon"><div class="b-icon__content ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.spriteCssClass) != null ? ((opt_data.params == null) ? null : opt_data.params.spriteCssClass) : '') + '"></div></div>');
};
if (goog.DEBUG) {
  sm.bIcon.Template.base.soyTemplateName = 'sm.bIcon.Template.base';
}
