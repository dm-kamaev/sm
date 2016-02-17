// This file was automatically generated from b-badge.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bBadge.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bBadge == 'undefined') { sm.bBadge = {}; }
if (typeof sm.bBadge.Template == 'undefined') { sm.bBadge.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bBadge.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="b-badge"><div class="b-badge__icon ' + soy.$$escapeHtmlAttribute(opt_data.params.display == 'metro' ? 'b-icon_img_metro' : 'b-badge_star') + '">' + soy.$$escapeHtml(opt_data.params.display == 'metro' ? '' : 't') + '</div><div class="b-badge__content">';
  var dataItemList8 = opt_data.params.data;
  var dataItemListLen8 = dataItemList8.length;
  for (var dataItemIndex8 = 0; dataItemIndex8 < dataItemListLen8; dataItemIndex8++) {
    var dataItemData8 = dataItemList8[dataItemIndex8];
    output += ((((opt_data.params == null) ? null : opt_data.params.display) == 'metro') ? sm.bBadge.Template.metroItem_({params: {station: dataItemData8}}, null, opt_ijData) : sm.bBadge.Template.ratingItem_({params: {ratingName: dataItemData8}}, null, opt_ijData)) + ((! (dataItemIndex8 == dataItemListLen8 - 1)) ? ', ' : '');
  }
  output += '</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bBadge.Template.base.soyTemplateName = 'sm.bBadge.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bBadge.Template.metroItem_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<a href="/search?name=\u043C\u0435\u0442\u0440\u043E%20' + soy.$$escapeUri(opt_data.params.station) + '" class="b-badge__item b-badge__item_active">' + soy.$$escapeHtml(opt_data.params.station) + '</a>');
};
if (goog.DEBUG) {
  sm.bBadge.Template.metroItem_.soyTemplateName = 'sm.bBadge.Template.metroItem_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bBadge.Template.ratingItem_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-badge__item">' + soy.$$escapeHtml(opt_data.params.ratingName) + '</div>');
};
if (goog.DEBUG) {
  sm.bBadge.Template.ratingItem_.soyTemplateName = 'sm.bBadge.Template.ratingItem_';
}
