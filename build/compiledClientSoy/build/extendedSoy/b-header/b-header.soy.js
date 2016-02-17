// This file was automatically generated from b-header.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bHeader.Template.
 */

goog.provide('sm.bHeader.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.bLink.Template');
goog.require('sm.bSearch.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bHeader.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-header"><div class="b-header__body">' + ((! opt_data.params.notShowLink) ? '<div class="b-header__link-search">' + sm.bLink.Template.base({params: {data: {name: '\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u0448\u043A\u043E\u043B', url: '/search'}}}, null, opt_ijData) + '</div>' : '') + '<div class="b-header__main"><div class="b-header__wrap"><div class="b-header__title"><span class="b-header__stars"><span class="b-header__star b-header__star_first">t</span><span class="b-header__star b-header__star_second">t</span><span class="b-header__star b-header__star_third">t</span><span class="b-header__star b-header__star_forth">t</span><span class="b-header__star b-header__star_fifth">t</span></span><h1 class="b-header__header">' + ((opt_data.params.url) ? '<a class="b-header__link" href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.url)) + '">\u0448\u043A\u043E\u043B\u044B \u00AB\u043C\u0435\u043B\u0430\u00BB</a>' : '\u0448\u043A\u043E\u043B\u044B \u00AB\u043C\u0435\u043B\u0430\u00BB') + '</h1><span class="b-header__stars"><span class="b-header__star b-header__star_fifth">t</span><span class="b-header__star b-header__star_forth">t</span><span class="b-header__star b-header__star_third">t</span><span class="b-header__star b-header__star_second">t</span><span class="b-header__star b-header__star_first">t</span></span></div></div></div>' + ((opt_data.params.url) ? '<div class="b-header__search">' + sm.bSearch.Template.base({params: {placeholder: '\u041D\u0430\u0439\u0442\u0438 \u0448\u043A\u043E\u043B\u0443', text: (opt_data.params == null) ? null : opt_data.params.searchText, theme: 'min', redirect: (opt_data.params == null) ? null : opt_data.params.searchRedirect, templates: {search: (opt_data.params == null) ? null : opt_data.params.templates.search, item: (opt_data.params == null) ? null : opt_data.params.templates.item, text: (opt_data.params == null) ? null : opt_data.params.templates.text, value: (opt_data.params == null) ? null : opt_data.params.templates.value}}}, null, opt_ijData) + '</div>' : '') + '</div></div>');
};
if (goog.DEBUG) {
  sm.bHeader.Template.base.soyTemplateName = 'sm.bHeader.Template.base';
}
