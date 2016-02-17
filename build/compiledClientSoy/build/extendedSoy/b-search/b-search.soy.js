// This file was automatically generated from b-search.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bSearch.Template.
 */

goog.provide('sm.bSearch.Template');

goog.require('soy');
goog.require('soydata');
goog.require('gorod.gSuggest.SuggestTemplate');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bSearch.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-search b-search_theme_' + soy.$$escapeHtmlAttribute(opt_data.params.theme) + '" data-params="{&quot;redirect&quot;:' + soy.$$escapeHtmlAttribute(opt_data.params.redirect) + '}" >' + ((opt_data.params.theme == 'main') ? '' : '<span class="b-icon_img_search b-search__icon' + ((! opt_data.params.text) ? ' b-search__icon_disabled' : '') + '"></span>') + gorod.gSuggest.SuggestTemplate.render({params: {data: {text: (opt_data.params == null) ? null : opt_data.params.text, minLength: 3, placeholder: (opt_data.params == null) ? null : opt_data.params.placeholder, sourceUrl: '/api/school/search/suggest', argName: 'searchString'}, config: {customClasses: 'b-search__input', filtrationEnabled: false, templates: {search: (opt_data.params == null) ? null : opt_data.params.templates.search, item: (opt_data.params == null) ? null : opt_data.params.templates.item, text: (opt_data.params == null) ? null : opt_data.params.templates.text, value: (opt_data.params == null) ? null : opt_data.params.templates.value}}, list: {theme: 'stendhal', color: 'sienna'}}}, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.bSearch.Template.base.soyTemplateName = 'sm.bSearch.Template.base';
}
