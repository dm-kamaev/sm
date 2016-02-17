// This file was automatically generated from b-icon.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.bIcon.IconTemplate.
 */

goog.provide('gorod.bIcon.IconTemplate');

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
gorod.bIcon.IconTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(gorod.bIcon.IconTemplate.init_(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.render.soyTemplateName = 'gorod.bIcon.IconTemplate.render';
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
gorod.bIcon.IconTemplate.init_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class=" b-icon' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.extraClasses) ? ' ' + opt_data.params.extraClasses : '') + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.fading) ? ' b-icon_fading' : '') + soy.$$escapeHtmlAttribute(gorod.bIcon.IconTemplate.initDefaultClasses_(opt_data, null, opt_ijData)) + soy.$$escapeHtmlAttribute(gorod.bIcon.IconTemplate.initTypeClasses_(opt_data, null, opt_ijData)) + soy.$$escapeHtmlAttribute(gorod.bIcon.IconTemplate.initStateClasses_(opt_data, null, opt_ijData)) + '" data-params=\'' + soy.$$escapeHtmlAttribute(gorod.bIcon.IconTemplate.generateJSON_(opt_data, null, opt_ijData)) + '\' ></span>');
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.init_.soyTemplateName = 'gorod.bIcon.IconTemplate.init_';
}


/**
 * @param {{
 *    params: (?|null|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bIcon.IconTemplate.initDefaultClasses_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  goog.asserts.assert(opt_data.params == null || opt_data.params != null, "expected param 'params' of type ?|null|undefined.");
  var params = /** @type {?|null|undefined} */ (opt_data.params);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((! ((params == null) ? null : params.typePressed)) ? ' b-icon_default-pressed' : '') + ((! ((params == null) ? null : params.typeHover)) ? ' b-icon_default-hover' : '') + ((! ((params == null) ? null : params.typeActive)) ? ' b-icon_default-active' : '') + ((! ((params == null) ? null : params.typeDummy)) ? ' b-icon_default-dummy' : '') + ((! ((params == null) ? null : params.typeDisabled)) ? ' b-icon_default-disabled' : ''));
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.initDefaultClasses_.soyTemplateName = 'gorod.bIcon.IconTemplate.initDefaultClasses_';
}


/**
 * @param {{
 *    params: (?|null|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bIcon.IconTemplate.initTypeClasses_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  goog.asserts.assert(opt_data.params == null || opt_data.params != null, "expected param 'params' of type ?|null|undefined.");
  var params = /** @type {?|null|undefined} */ (opt_data.params);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((((params == null) ? null : (params.state == null) ? null : params.state.disabled) && ((params == null) ? null : params.typeDisabled)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typeDisabled) : (((params == null) ? null : (params.state == null) ? null : params.state.dummy) && ((params == null) ? null : params.typeDummy)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typeDummy) : (((params == null) ? null : (params.state == null) ? null : params.state.active) && ((params == null) ? null : params.typeActive)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typeActive) : (((params == null) ? null : (params.state == null) ? null : params.state.hover) && ((params == null) ? null : params.typeHover)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typeHover) : (((params == null) ? null : (params.state == null) ? null : params.state.pressed) && ((params == null) ? null : params.typePressed)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typePressed) : ' b-icon_img_' + soy.$$escapeHtml((params == null) ? null : params.type));
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.initTypeClasses_.soyTemplateName = 'gorod.bIcon.IconTemplate.initTypeClasses_';
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
gorod.bIcon.IconTemplate.initStateClasses_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.pressed) ? ' b-icon_state_pressed' : '') + (((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.hover) ? ' b-icon_state_hover' : '') + (((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.active) ? ' b-icon_state_active' : '') + (((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.dummy) ? ' b-icon_state_dummy' : '') + (((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.disabled) ? ' b-icon_state_disabled' : ''));
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.initStateClasses_.soyTemplateName = 'gorod.bIcon.IconTemplate.initStateClasses_';
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
gorod.bIcon.IconTemplate.generateJSON_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var jsonParams__soy217 = {'type': {'default': ((opt_data.params == null) ? null : opt_data.params.type) != null ? ((opt_data.params == null) ? null : opt_data.params.type) : '', 'pressed': ((opt_data.params == null) ? null : opt_data.params.typePressed) != null ? ((opt_data.params == null) ? null : opt_data.params.typePressed) : '', 'hover': ((opt_data.params == null) ? null : opt_data.params.typeHover) != null ? ((opt_data.params == null) ? null : opt_data.params.typeHover) : '', 'active': ((opt_data.params == null) ? null : opt_data.params.typeActive) != null ? ((opt_data.params == null) ? null : opt_data.params.typeActive) : '', 'dummy': ((opt_data.params == null) ? null : opt_data.params.typeDummy) != null ? ((opt_data.params == null) ? null : opt_data.params.typeDummy) : '', 'disabled': ((opt_data.params == null) ? null : opt_data.params.typeDisabled) != null ? ((opt_data.params == null) ? null : opt_data.params.typeDisabled) : ''}, 'state': {'pressed': ((opt_data.params.state == null) ? null : opt_data.params.state.pressed) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.pressed) : '', 'hover': ((opt_data.params.state == null) ? null : opt_data.params.state.hover) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.hover) : '', 'active': ((opt_data.params.state == null) ? null : opt_data.params.state.active) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.active) : '', 'dummy': ((opt_data.params.state == null) ? null : opt_data.params.state.dummy) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.dummy) : '', 'disabled': ((opt_data.params.state == null) ? null : opt_data.params.state.disabled) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.disabled) : ''}};
  output += soy.$$escapeHtml(gorod.iUtils.stringify({json: jsonParams__soy217}, null, opt_ijData));
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.generateJSON_.soyTemplateName = 'gorod.bIcon.IconTemplate.generateJSON_';
}
