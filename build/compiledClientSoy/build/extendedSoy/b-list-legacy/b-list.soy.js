// This file was automatically generated from b-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.bList.ListTemplate.
 */

goog.provide('gorod.bList.ListTemplate');

goog.require('soy');
goog.require('soydata');
goog.require('goog.asserts');
goog.require('gorod.iUtils');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul class="b-list b-list_' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.theme) ? opt_data.params.theme : 'default') + '-theme b-list_color_' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.color) != null ? ((opt_data.params == null) ? null : opt_data.params.color) : 'blue') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.extraClasses) != null ? ((opt_data.params == null) ? null : opt_data.params.extraClasses) : '') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.customClassesForMaxHeight) != null ? ((opt_data.params == null) ? null : opt_data.params.customClassesForMaxHeight) : '') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.customClassesForMaxHeight) ? 'b-list_max-height' : '') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.uppercase) ? 'b-bouton_uppercase' : '') + ' b-list_hover_' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.selectOnHover) ? 'off' : 'on') + '" data-params="' + soy.$$escapeHtmlAttribute(gorod.iUtils.stringify({json: {'initialSelectedIndex': ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) ? Math.floor((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) : null, 'selectOnHover': ((opt_data.params == null) ? null : opt_data.params.selectOnHover) != null ? ((opt_data.params == null) ? null : opt_data.params.selectOnHover) : null, 'selectOnClick': ((opt_data.params == null) ? null : opt_data.params.selectOnClick) != null ? ((opt_data.params == null) ? null : opt_data.params.selectOnClick) : null}}, null, opt_ijData)) + '">' + gorod.bList.ListTemplate.init_(opt_data, null, opt_ijData) + '</ul>');
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.render.soyTemplateName = 'gorod.bList.ListTemplate.render';
}


/**
 * @param {{
 *    params: (?)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.init_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var itemList423 = (opt_data.params == null) ? null : opt_data.params.list;
  var itemListLen423 = itemList423.length;
  for (var itemIndex423 = 0; itemIndex423 < itemListLen423; itemIndex423++) {
    var itemData423 = itemList423[itemIndex423];
    output += ((itemData423 == null) ? null : itemData423.href) ? gorod.bList.ListTemplate.drawLink_({item: itemData423, isSelected: ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) == 0 && itemIndex423 == 0 ? true : ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) + 1 == itemIndex423 ? true : false}, null, opt_ijData) : ((itemData423 == null) ? null : itemData423.text) ? gorod.bList.ListTemplate.drawControl_({item: itemData423, isSelected: ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) == 0 && itemIndex423 == 0 ? true : ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) + 1 == itemIndex423 ? true : false}, null, opt_ijData) : gorod.bList.ListTemplate.drawHR_(null, null, opt_ijData);
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.init_.soyTemplateName = 'gorod.bList.ListTemplate.init_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.drawHR_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li class="b-list__hr"></li>');
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.drawHR_.soyTemplateName = 'gorod.bList.ListTemplate.drawHR_';
}


/**
 * @param {{
 *    item: (?),
 *    isSelected: boolean
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.drawLink_ = function(opt_data, opt_ignored, opt_ijData) {
  goog.asserts.assert(goog.isBoolean(opt_data.isSelected) || opt_data.isSelected === 1 || opt_data.isSelected === 0, "expected param 'isSelected' of type boolean.");
  var isSelected = /** @type {boolean} */ (!!opt_data.isSelected);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li class="b-list__item b-list__item_link ' + soy.$$escapeHtmlAttribute(((opt_data.item == null) ? null : opt_data.item.extraClasses) != null ? ((opt_data.item == null) ? null : opt_data.item.extraClasses) : '') + ' ' + soy.$$escapeHtmlAttribute(isSelected == true ? 'b-list__item_selected' : '') + '"><a class="b-list__link" href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri((opt_data.item == null) ? null : opt_data.item.href)) + '">' + soy.$$escapeHtml((opt_data.item == null) ? null : opt_data.item.text) + '</a></li>');
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.drawLink_.soyTemplateName = 'gorod.bList.ListTemplate.drawLink_';
}


/**
 * @param {{
 *    item: (?),
 *    isSelected: boolean
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.drawControl_ = function(opt_data, opt_ignored, opt_ijData) {
  goog.asserts.assert(goog.isBoolean(opt_data.isSelected) || opt_data.isSelected === 1 || opt_data.isSelected === 0, "expected param 'isSelected' of type boolean.");
  var isSelected = /** @type {boolean} */ (!!opt_data.isSelected);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li class="b-list__item ' + soy.$$escapeHtmlAttribute(((opt_data.item == null) ? null : opt_data.item.extraClasses) != null ? ((opt_data.item == null) ? null : opt_data.item.extraClasses) : '') + ' ' + soy.$$escapeHtmlAttribute(isSelected == true ? 'b-list__item_selected' : '') + '">' + (((opt_data.item == null) ? null : opt_data.item.text) ? soy.$$escapeHtml(opt_data.item.text) : '') + '</li>');
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.drawControl_.soyTemplateName = 'gorod.bList.ListTemplate.drawControl_';
}
