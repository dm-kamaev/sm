// This file was automatically generated from l-search.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearch.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearch == 'undefined') { sm.lSearch = {}; }
if (typeof sm.lSearch.Template == 'undefined') { sm.lSearch.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>\u0428\u043A\u043E\u043B\u044B \u041C\u0435\u043B\u0430</title><link href=\'https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link href=\'https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link rel="stylesheet" href="/clobl.build.css"><link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"><link rel="stylesheet" href="/styles.css"></head><body><div class="l-search">' + sm.bHeader.Template.base({params: {url: ''}}, null, opt_ijData) + '<div class="l-search__body">' + sm.lSearch.Template.header_({params: {city: opt_data.params.currentCity}}, null, opt_ijData) + sm.lSearch.Template.search_({params: {examples: opt_data.params.examples, templates: {search: opt_data.params.searchTemplates.search, item: opt_data.params.searchTemplates.item, text: opt_data.params.searchTemplates.text, value: opt_data.params.searchTemplates.value}}}, null, opt_ijData) + sm.bPopularSchools.Template.base({params: {popularSchools: opt_data.params.popularSchools}}, null, opt_ijData) + '</div><div class="l-search__footer"><div class="l-search__horisontal-line"></div>' + sm.lSchool.bFooter.Template.base(null, null, opt_ijData) + '</div></div><script type="text/javascript" src="/external.min.js"><\/script><script type="text/javascript">var CLOSURE_NO_DEPS = true;<\/script><script type="text/javascript" src="/l-search.js"><\/script></body></html>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.base.soyTemplateName = 'sm.lSearch.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.header_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__header"><div class="l-search__title">\u0428\u043A\u043E\u043B\u044B <span class="l-search__title-space">\u00AB\u041C\u0435\u043B\u0430\u00BB</span></div><div class="l-search__geoposition"><div class="b-icon_img_red-pin l-search__pin"></div><div class="l-search__city">' + soy.$$escapeHtml(opt_data.params.city) + '</div></div><div class="l-search__inscription">\u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u0448\u043A\u043E\u043B\u0443, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0432\u0430\u0448\u0435\u043C\u0443 \u0440\u0435\u0431\u0451\u043D\u043A\u0443</div></div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.header_.soyTemplateName = 'sm.lSearch.Template.header_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.search_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__top-menu"><div class="l-search__left-text">\u0427\u0442\u043E \u0432\u044B \u0438\u0449\u0435\u0442\u0435?</div><div class="l-search__search"><div class="l-search__search-field">' + sm.bSearch.Template.base({params: {placeholder: '', theme: 'main', redirect: true, templates: {search: (opt_data.params == null) ? null : opt_data.params.templates.search, item: (opt_data.params == null) ? null : opt_data.params.templates.item, text: (opt_data.params == null) ? null : opt_data.params.templates.text, value: (opt_data.params == null) ? null : opt_data.params.templates.value}}}, null, opt_ijData) + '</div></div>' + sm.lSearch.Template.button_({params: {text: '\u041D\u0430\u0439\u0442\u0438 \u0448\u043A\u043E\u043B\u0443', theme: 'search'}}, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.search_.soyTemplateName = 'sm.lSearch.Template.search_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.banner_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__rating-img"></div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.banner_.soyTemplateName = 'sm.lSearch.Template.banner_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.content_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__content"><div class="l-search__item"><div class="l-search__content-title">\u0425\u043E\u0440\u043E\u0448\u043A\u043E\u043B\u0430</div><img class="l-search__advertising-img" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.images[0])) + '" /><div class="l-search__advertising-address">\u043C. \u041E\u043A\u0442\u044F\u0431\u0440\u044C\u0441\u043A\u043E\u0435 \u043F\u043E\u043B\u0435, \u0421\u043E\u043A\u043E\u043B, \u0443\u043B. \u041C\u0430\u0440\u0448\u0430\u043B\u0430 \u0422\u0443\u0445\u0430\u0447\u0435\u0432\u0441\u043A\u043E\u0433\u043E, 45, \u043A. 2</div><div class="l-search__content-text">\u041F\u0440\u043E\u0433\u0438\u043C\u043D\u0430\u0437\u0438\u044F (\u0434\u0435\u0442\u0441\u043A\u0438\u0439 \u0441\u0430\u0434 \u0438 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0430\u044F \u0448\u043A\u043E\u043B\u0430), \u0434\u0435\u043A\u043B\u0430\u0440\u0438\u0440\u0443\u044E\u0449\u0430\u044F \u0441\u0432\u043E\u0438\u043C \u0433\u043B\u0430\u0432\u043D\u044B\u043C \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E\u043C \u043C\u0435\u0442\u043E\u0434 \u0440\u043E\u0432\u0435\u0441\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F</div><div class="l-search__advertising-footer">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</div></div><div class="l-search__item l-search__item_even"><div class="l-search__content-title">\u0422\u0435\u0441\u0442 \u0434\u043B\u044F \u0448\u043A\u043E\u043B\u044C\u043D\u0438\u043A\u0430</div><div class="l-search__content-text">\u0427\u0430\u0441\u0442\u043E \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0438 \u0434\u0443\u043C\u0430\u044E\u0442,<br> \u0447\u0442\u043E \u0445\u043E\u0440\u043E\u0448\u043E \u0437\u043D\u0430\u044E\u0442 \u0441\u0432\u043E\u0435\u0433\u043E \u0440\u0435\u0431\u0451\u043D\u043A\u0430, \u043D\u043E \u043D\u0435 \u0432\u0441\u0435\u0433\u0434\u0430 \u044D\u0442\u043E \u0442\u0430\u043A.<div class="l-search__content-emptyline"></div>\u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u043C\u044B \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0442\u0435\u0441\u0442 \u0447\u0442\u043E\u0431\u044B \u0432\u0430\u0448 \u0440\u0435\u0431\u0451\u043D\u043E\u043A \u0441\u0430\u043C \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u043B \u043E \u0441\u0435\u0431\u0435</div><div class="l-search__content-button">' + sm.lSearch.Template.button_({params: {text: '\u041F\u0440\u043E\u0439\u0442\u0438 \u0442\u0435\u0441\u0442', theme: 'content'}}, null, opt_ijData) + '</div></div><div class="l-search__item"><div class="l-search__content-title">\u041F\u043E\u0434\u0431\u043E\u0440\u043A\u0438 \u0448\u043A\u043E\u043B</div><ul class="l-search__list"><li>\u0414\u043B\u044F \u043E\u0442\u043B\u0438\u0447\u043D\u0438\u043A\u0430</li><li>\u0414\u043B\u044F \u0434\u0432\u043E\u0435\u0447\u043D\u0438\u043A\u0430</li><li>\u0421 \u0433\u0443\u043C\u0430\u043D\u0438\u0442\u0430\u0440\u043D\u044B\u043C \u0443\u043A\u043B\u043E\u043D\u043E\u043C</li><li>\u0421 \u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u0443\u043A\u043B\u043E\u043D\u043E\u043C</li><li>\u0414\u043B\u044F \u0431\u0443\u0434\u0443\u0449\u0435\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u043C\u0435\u043D\u0430</li><li>\u0412\u044B\u0441\u043E\u043A\u0438\u0439 \u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u0415\u0413\u042D</li><li>\u041D\u043E\u0432\u0430\u0442\u043E\u0440\u0441\u043A\u0438\u0435 \u0448\u043A\u043E\u043B\u044B</li></ul></div><div class="l-search__item l-search__item_even l-search__item_last"><img class="l-search__article-img" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.images[1])) + '" /><div class="l-search__article-quote">\u00AB\u0426\u0435\u043B\u044C \u0448\u043A\u043E\u043B\u044B \u2014 \u0441\u043B\u043E\u043C\u0430\u0442\u044C \u0432\u043E\u043B\u044E \u0440\u0435\u0431\u0435\u043D\u043A\u0430\u00BB</div><div class="l-search__article-title">\u0410\u043D\u0442\u043E\u043D \u0414\u043E\u043B\u0438\u043D \u2014 \u043E \u0448\u043A\u043E\u043B\u0435 \u0441 \u0448\u0435\u0441\u0442\u0438 \u043B\u0435\u0442, \u043F\u043E\u0434\u043B\u0438\u043D\u043D\u043E\u0439 \u0441\u0432\u043E\u0431\u043E\u0434\u0435 \u0438 \u0443\u0447\u0438\u0442\u0435\u043B\u044F\u0445 \u043A\u0430\u043A \u043D\u0435\u0432\u043E\u043B\u044C\u043D\u044B\u0445 \u043F\u0430\u043B\u0430\u0447\u0430\u0445</div></div></div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.content_.soyTemplateName = 'sm.lSearch.Template.content_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.button_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__button l-search__button_' + soy.$$escapeHtmlAttribute(opt_data.params.theme) + '"><span class="l-search__button-text">' + soy.$$escapeHtml(opt_data.params.text) + '</span></div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.button_.soyTemplateName = 'sm.lSearch.Template.button_';
}
