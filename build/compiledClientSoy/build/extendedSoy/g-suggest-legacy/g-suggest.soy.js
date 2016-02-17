// This file was automatically generated from g-suggest.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.gSuggest.SuggestTemplate.
 */

goog.provide('gorod.gSuggest.SuggestTemplate');

goog.require('soy');
goog.require('soydata');
goog.require('gorod.bInput.InputTemplate');
goog.require('gorod.bList.ListTemplate');
goog.require('gorod.iUtils');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.gSuggest.SuggestTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var classes__soy1128 = '' + ((! (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.visible) == null || ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.visible))) ? 'g-suggest i-utils__hidden' : 'g-suggest');
  classes__soy1128 = soydata.$$markUnsanitizedTextForInternalBlocks(classes__soy1128);
  var dataParams__soy1134 = {args: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.args, sourceArray: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.sourceArray, sourceUrl: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.sourceUrl, argName: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.argName, typeRequest: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.typeRequest, minLength: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.minLength, cacheEnabled: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.cacheEnabled, filtrationEnabled: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.filtrationEnabled, templates: {search: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.templates.search, item: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.templates.item, text: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.templates.text, value: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.templates.value}};
  output += '<div class="' + soy.$$escapeHtmlAttribute(classes__soy1128) + '" data-params=\'' + soy.$$escapeHtmlAttribute(gorod.iUtils.stringify({json: dataParams__soy1134}, null, opt_ijData)) + '\'>' + gorod.gSuggest.SuggestTemplate.gSuggestInitInput_({params: {data: {text: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.text, placeholder: ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) : ''}, customClasses: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses, input: (opt_data.params == null) ? null : opt_data.params.input}}, null, opt_ijData) + gorod.gSuggest.SuggestTemplate.gSuggestInitValue_({params: {data: {value: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value, name: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name}}}, null, opt_ijData) + gorod.gSuggest.SuggestTemplate.gSuggestInitList_({params: {list: (opt_data.params == null) ? null : opt_data.params.list}}, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.gSuggest.SuggestTemplate.render.soyTemplateName = 'gorod.gSuggest.SuggestTemplate.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.gSuggest.SuggestTemplate.gSuggestInitInput_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var classes__soy1149 = 'g-suggest__input ' + ((opt_data.params == null) ? null : opt_data.params.customClasses);
  var inputParams__soy1150 = ((opt_data.params == null) ? null : opt_data.params.input) ? {type: 'text'} : soy.$$augmentMap((opt_data.params == null) ? null : opt_data.params.input, {value: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.text, placeholder: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder, customClasses: classes__soy1149});
  output += gorod.bInput.InputTemplate.render({params: inputParams__soy1150}, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.gSuggest.SuggestTemplate.gSuggestInitInput_.soyTemplateName = 'gorod.gSuggest.SuggestTemplate.gSuggestInitInput_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.gSuggest.SuggestTemplate.gSuggestInitValue_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<input type="hidden" name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '" value="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) + '" class="g-suggest__value" />');
};
if (goog.DEBUG) {
  gorod.gSuggest.SuggestTemplate.gSuggestInitValue_.soyTemplateName = 'gorod.gSuggest.SuggestTemplate.gSuggestInitValue_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.gSuggest.SuggestTemplate.gSuggestInitList_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var listParams__soy1160 = ((opt_data.params == null) ? null : opt_data.params.list) ? soy.$$augmentMap((opt_data.params == null) ? null : opt_data.params.list, {selectOnHover: 'true', list: [], extraClasses: 'g-suggest__list i-utils__hidden'}) : {selectOnHover: 'true', list: [], extraClasses: 'g-suggest__list i-utils__hidden'};
  output += gorod.bList.ListTemplate.render({params: listParams__soy1160}, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.gSuggest.SuggestTemplate.gSuggestInitList_.soyTemplateName = 'gorod.gSuggest.SuggestTemplate.gSuggestInitList_';
}
