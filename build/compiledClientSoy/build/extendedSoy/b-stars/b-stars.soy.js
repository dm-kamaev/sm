// This file was automatically generated from b-stars.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bStars.Template.
 */

goog.provide('sm.bStars.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bStars.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var sizeClass__soy647 = ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : (opt_data.params.config.style == null) ? null : opt_data.params.config.style.size) ? ' b-stars_size_' + ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : (opt_data.params.config.style == null) ? null : opt_data.params.config.style.size) : '';
  var themeClass__soy648 = ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : (opt_data.params.config.style == null) ? null : opt_data.params.config.style.theme) ? ' b-stars__star_theme_' + ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : (opt_data.params.config.style == null) ? null : opt_data.params.config.style.theme) : '';
  var pointerClass__soy649 = ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.isClickable) ? ' b-stars_clickable' : '';
  var count__soy650 = opt_data.params.data.mark > 5 ? 5 : opt_data.params.data.mark;
  output += '<div class="b-stars' + soy.$$escapeHtmlAttribute(sizeClass__soy647) + soy.$$escapeHtmlAttribute(themeClass__soy648) + soy.$$escapeHtmlAttribute(pointerClass__soy649) + '"><input class="b-stars__hidden-input" type="hidden" name="' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) != null ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) : 'score') + '" value="' + soy.$$escapeHtmlAttribute(count__soy650) + '" />';
  for (var i660 = 0; i660 < 5; i660++) {
    var class__soy661 = 'b-stars__star ' + (i660 < count__soy650 ? 'b-stars__star_selected' : 'b-star__star_not-selected');
    output += '<div class=' + soy.$$escapeHtmlAttributeNospace(class__soy661) + '>t</div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bStars.Template.base.soyTemplateName = 'sm.bStars.Template.base';
}
