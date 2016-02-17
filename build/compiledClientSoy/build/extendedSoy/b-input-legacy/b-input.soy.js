// This file was automatically generated from b-input.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.bInput.InputTemplate.
 */

goog.provide('gorod.bInput.InputTemplate');

goog.require('soy');
goog.require('soydata');
goog.require('goog.asserts');
goog.require('gorod.ValidateTemplate');
goog.require('gorod.bIcon.IconTemplate');
goog.require('gorod.iUtils');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bInput.InputTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var modifier__soy222 = {'email': 'mail', 'phone': 'phone', 'password': 'key', 'name': 'user', 'lastname': 'user'};
  var stateInput__soy223 = {'default': 'gray', 'active': 'blue', 'filled': 'black', 'error': 'red', 'disabled': ((opt_data.params == null) ? null : opt_data.params.value) ? 'black' : 'gray'};
  var paramsType__soy224 = ((opt_data.params == null) ? null : opt_data.params.type) ? opt_data.params : soy.$$augmentMap(opt_data.params, {type: 'text'});
  var paramsTypeState__soy225 = ((paramsType__soy224 == null) ? null : paramsType__soy224.autofocus) ? soy.$$augmentMap(paramsType__soy224, {state: 'active'}) : paramsType__soy224;
  var paramsTypeStateToo__soy226 = ((paramsTypeState__soy225 == null) ? null : paramsTypeState__soy225.state) ? paramsTypeState__soy225 : paramsTypeState__soy225.value ? soy.$$augmentMap(paramsTypeState__soy225, {state: 'filled'}) : soy.$$augmentMap(paramsTypeState__soy225, {state: 'default'});
  var paramsEx__soy227 = {params: paramsTypeStateToo__soy226, modifier: modifier__soy222, state: stateInput__soy223};
  var hash__soy228 = '' + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.hash) ? '' + ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.hash) : '' + gorod.iUtils.ext_generateId(null, null, opt_ijData));
  hash__soy228 = soydata.$$markUnsanitizedTextForInternalBlocks(hash__soy228);
  var theme__soy234 = ' b-input_theme_' + (((opt_data.params.style == null) ? null : opt_data.params.style.theme) != null ? ((opt_data.params.style == null) ? null : opt_data.params.style.theme) : 'default');
  var size__soy235 = ' b-input_size_' + (((opt_data.params.style == null) ? null : opt_data.params.style.size) != null ? ((opt_data.params.style == null) ? null : opt_data.params.style.size) : 'medium');
  var placeholder_alias__soy236 = ! (((opt_data.params == null) ? null : opt_data.params.type) == 'text') && ! ((opt_data.params == null) ? null : opt_data.params.placeholder) ? (((opt_data.params == null) ? null : opt_data.params.type) == 'email' ? '\u0412\u0430\u0448 e-mail' : ((opt_data.params == null) ? null : opt_data.params.type) == 'phone' ? '\u0412\u0430\u0448 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D' : ((opt_data.params == null) ? null : opt_data.params.type) == 'password' ? '\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C' : ((opt_data.params == null) ? null : opt_data.params.type) == 'name' ? '\u0412\u0430\u0448\u0435 \u0438\u043C\u044F' : ((opt_data.params == null) ? null : opt_data.params.type) == 'lastname' != null ? ((opt_data.params == null) ? null : opt_data.params.type) == 'lastname' : '\u0412\u0430\u0448\u0430 \u0444\u0430\u043C\u0438\u043B\u0438\u044F') : '';
  var placeholder_alias_two__soy237 = ((opt_data.params == null) ? null : opt_data.params.placeholder) != null ? ((opt_data.params == null) ? null : opt_data.params.placeholder) : placeholder_alias__soy236;
  var errorPlaceholder__soy238 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errorPlaceholder) != null ? ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errorPlaceholder) : null;
  var errorMessage__soy239 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errors) != null ? ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errors) : null;
  var validateData__soy240 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.validate) != null ? ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.validate) : null;
  var showCnt__soy241 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.showCounter) == true;
  var placeholder__soy242 = '' + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.state) == 'error' && ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errorPlaceholder)) ? '' + ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errorPlaceholder) : ((opt_data.params == null) ? null : opt_data.params.placeholder) ? '' + ((opt_data.params == null) ? null : opt_data.params.placeholder) : '' + placeholder_alias_two__soy237);
  placeholder__soy242 = soydata.$$markUnsanitizedTextForInternalBlocks(placeholder__soy242);
  var params_customDataParams__soy252 = '';
  if ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customData) {
    var customList255 = (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customData;
    var customListLen255 = customList255.length;
    for (var customIndex255 = 0; customIndex255 < customListLen255; customIndex255++) {
      var customData255 = customList255[customIndex255];
      params_customDataParams__soy252 += ' data-' + soy.$$escapeHtml(customData255.key) + '=' + soy.$$escapeHtml(customData255.item);
    }
  }
  params_customDataParams__soy252 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(params_customDataParams__soy252);
  var customDataParams__soy261 = '' + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customDataString) ? soy.$$escapeHtml(params_customDataParams__soy252) + ' + \' \' + ' + soy.$$escapeHtml((opt_data.params == null) ? null : opt_data.params.customDataString) : '');
  customDataParams__soy261 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(customDataParams__soy261);
  var classList__soy267 = '' + soy.$$escapeHtml(theme__soy234) + soy.$$escapeHtml(size__soy235) + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.autofocus) ? ' b-input_focus ' : '') + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.state) == 'error' ? ' b-input_error ' : '') + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.showCounter) ? ' b-input__margin-bottom ' : '') + ' ' + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customClasses) ? ((paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customClasses) : '') + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'hidden' ? ' i-utils__hidden ' : '');
  classList__soy267 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(classList__soy267);
  var inputSize__soy276 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : (paramsEx__soy227.params.style == null) ? null : paramsEx__soy227.params.style.size) ? ' b-input__input_size_' + ((paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.style.size) : ' b-input__input_size_medium';
  var inputPadding__soy277 = '' + ((! (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'text') || ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : (paramsEx__soy227.params.iconLeft == null) ? null : paramsEx__soy227.params.iconLeft.type)) ? ' b-input__input_padding-left' : '') + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'password' || ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'text' && ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : (paramsEx__soy227.params.iconRight == null) ? null : paramsEx__soy227.params.iconRight.type)) ? ' b-input__input_padding-right' : '');
  inputPadding__soy277 = soydata.$$markUnsanitizedTextForInternalBlocks(inputPadding__soy277);
  var valueInput__soy284 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.value) ? ((paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.value) : '';
  var validateParam__soy285 = {'hash': hash__soy228, 'message': (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errors};
  if (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'hidden') {
    output += '<input type="hidden" name="' + soy.$$escapeHtmlAttribute((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.name) + '" value="' + soy.$$escapeHtmlAttribute(valueInput__soy284) + '" class="b-input__input  ' + soy.$$escapeHtmlAttribute(classList__soy267) + '" >';
  } else {
    output += '<div class="b-input ' + soy.$$escapeHtmlAttribute(classList__soy267) + '" data-params=\'' + soy.$$escapeHtmlAttribute(gorod.iUtils.stringify({json: {'type': (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type, 'validate': validateData__soy240, 'placeholder': placeholder_alias_two__soy237, 'errorPlaceholder': errorPlaceholder__soy238, 'errorMessage': errorMessage__soy239, 'showCounter': showCnt__soy241, 'maxCount': (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.maxlength, 'theme': theme__soy234}}, null, opt_ijData)) + '\' ' + soy.$$filterHtmlAttributes(customDataParams__soy261) + '>' + ((! (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'text')) ? '<span class="b-input__icon-position b-input__icon-position_left ">' + gorod.bInput.InputTemplate.bInputNativeIcons_({paramsEx: paramsEx__soy227}, null, opt_ijData) + '</span>' : ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : (paramsEx__soy227.params.iconLeft == null) ? null : paramsEx__soy227.params.iconLeft.type) ? '<span class="b-input__icon-position b-input__icon-position_left">' + gorod.bIcon.IconTemplate.render({params: (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.iconLeft}, null, opt_ijData) + '</span>' : '');
    var type__soy315 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'password' ? 'password' : 'text';
    output += '<input type="' + soy.$$escapeHtmlAttribute(type__soy315) + '" name="' + soy.$$escapeHtmlAttribute(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.name) != null ? ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.name) : '') + '" value="' + soy.$$escapeHtmlAttribute(valueInput__soy284) + '" placeholder="' + soy.$$escapeHtmlAttribute(placeholder__soy242) + '" class="b-input__input' + soy.$$escapeHtmlAttribute(inputSize__soy276) + ' ' + soy.$$escapeHtmlAttribute(inputPadding__soy277) + soy.$$escapeHtmlAttribute(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.showCounter) ? ' i-countdown-field' : '') + '"' + ((hash__soy228) ? ' data-validate-hash="' + soy.$$escapeHtmlAttribute(hash__soy228) + '" ' : '') + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.autofocus) ? ' autofocus="true" ' : '') + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.autocomplete) == false || ! ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.autocomplete)) ? 'autocomplete="off"' : '') + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.maxlength) ? 'maxlength="' + soy.$$escapeHtmlAttribute((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.maxlength) + '"' : '') + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.state) == 'disabled') ? 'disabled="disabled"' : '') + '/>' + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'password') ? '<span class="b-input__icon-position b-input__icon-position_right">' + gorod.bInput.InputTemplate.bInputTypePasswordIcons_(null, null, opt_ijData) + '</span>' : (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'text' && ((opt_data.params == null) ? null : (opt_data.params.iconRight == null) ? null : opt_data.params.iconRight.type)) ? '<span class="b-input__icon-position b-input__icon-position_right">' + gorod.bIcon.IconTemplate.render({params: (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.iconRight}, null, opt_ijData) + '</span>' : '') + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.showCounter) ? '<div class=\'i-countdown-text b-input__counter b-input__counter-color\'>' + soy.$$escapeHtml((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.maxlength) + '</div>' : '') + '<div class="b-input__errors ">' + gorod.ValidateTemplate.render({params: validateParam__soy285}, null, opt_ijData) + '</div></div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bInput.InputTemplate.render.soyTemplateName = 'gorod.bInput.InputTemplate.render';
}


/**
 * @param {{
 *    paramsEx: (?)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bInput.InputTemplate.bInputNativeIcons_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var modifier__soy370 = (opt_data.paramsEx == null) ? null : opt_data.paramsEx.modifier[(opt_data.paramsEx == null) ? null : (opt_data.paramsEx.params == null) ? null : opt_data.paramsEx.params.type];
  var stateList371 = soy.$$getMapKeys((opt_data.paramsEx == null) ? null : opt_data.paramsEx.state);
  var stateListLen371 = stateList371.length;
  for (var stateIndex371 = 0; stateIndex371 < stateListLen371; stateIndex371++) {
    var stateData371 = stateList371[stateIndex371];
    output += '<div class="b-input__icon b-input__icon-' + soy.$$escapeHtmlAttribute(stateData371) + ' ' + soy.$$escapeHtmlAttribute(opt_data.paramsEx.params.state != stateData371 ? 'i-utils__hidden' : '') + '">' + gorod.bIcon.IconTemplate.render({params: {'type': modifier__soy370 + '_' + ((opt_data.paramsEx == null) ? null : opt_data.paramsEx.state[stateData371])}}, null, opt_ijData) + '</div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bInput.InputTemplate.bInputNativeIcons_.soyTemplateName = 'gorod.bInput.InputTemplate.bInputNativeIcons_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bInput.InputTemplate.bInputTypePasswordIcons_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var states__soy382 = ['default', 'active'];
  var gray__soy383 = {'type': 'eye_gray'};
  var black__soy384 = {'type': 'eye_black'};
  output += '<div class="b-input__icon-pswd b-input__icon-pswd-default">' + gorod.bIcon.IconTemplate.render({params: gray__soy383}, null, opt_ijData) + '</div><div class="b-input__icon-pswd b-input__icon-pswd-bold i-utils__hidden">' + gorod.bIcon.IconTemplate.render({params: black__soy384}, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bInput.InputTemplate.bInputTypePasswordIcons_.soyTemplateName = 'gorod.bInput.InputTemplate.bInputTypePasswordIcons_';
}
