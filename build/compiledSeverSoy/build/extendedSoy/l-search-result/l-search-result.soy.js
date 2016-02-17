// This file was automatically generated from l-search-result.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.Template == 'undefined') { sm.lSearchResult.Template = {}; }


/**
 * @param {{
 *    params: {countResults: number, data: {filters: {filters: !Array.<{config: {cannotBeHidden: boolean}, data: {filters: !Array.<{label: string, value: string}>, header: {help: string, title: string}, name: string}}>, url: string}, schools: !Array.<{currentCriterion: {name: string, value: number}, description: string, id: number, metroStations: !Array.<string>, name: {bold: string, light: string}, ratings: !Array.<string>, score: !Array.<{name: string, value: number}>, url: string}>}, searchSettings: {data: {page: number, searcParams: {areaId: number, metroId: number, name: string}}, method: string, url: string}, searchText: string, templates: {item: string, search: string, text: string, value: string}}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var params = goog.asserts.assertObject(opt_data.params, "expected parameter 'params' of type [countResults: float|int, data: [filters: [filters: list<[config: [cannotBeHidden: bool], data: [filters: list<[label: string, value: string]>, header: [help: string, title: string], name: string]]>, url: string], schools: list<[currentCriterion: [name: string, value: float|int], description: string, id: float|int, metroStations: list<string>, name: [bold: string, light: string], ratings: list<string>, score: list<[name: string, value: float|int]>, url: string]>], searchSettings: [data: [page: float|int, searcParams: [areaId: float|int, metroId: float|int, name: string]], method: string, url: string], searchText: string, templates: [item: string, search: string, text: string, value: string]].");
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u043D\u0430 \u0428\u043A\u043E\u043B\u0430\u0445 \u041C\u0435\u043B\u0430</title><link href=\'https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link href=\'https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link rel="stylesheet" href="/clobl.build.css"><link rel="stylesheet" href="/styles.css"><link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"></head><body><div class="l-search-result" data-params="' + soy.$$escapeHtmlAttribute(gorod.iUtils.stringify({json: params.searchSettings}, null, opt_ijData)) + '"><div class="l-search-result__header">' + sm.bHeader.Template.base({params: {url: '/', searchText: params.searchText, searchRedirect: true, templates: {search: params.templates.search, item: params.templates.item, text: params.templates.text, value: params.templates.value}, notShowLink: 'true'}}, null, opt_ijData) + '</div><div class="l-search-result__body">' + sm.lSearchResult.Template.leftMenu_(opt_data, null, opt_ijData) + '<div class="l-search-result__results-section"><div class="l-search-result__list-header">' + sm.lSearchResult.Template.listHeader_(opt_data, null, opt_ijData) + '</div><div class="l-search-result__list-body' + soy.$$escapeHtmlAttribute(params.countResults ? '' : ' i-utils__hidden') + '">' + sm.lSearchResult.bSchoolList.Template.base({params: {schools: params.data.schools}}, null, opt_ijData) + '</div></div></div></div><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"><\/script><script type="text/javascript" src="/external.min.js"><\/script><script type="text/javascript">var CLOSURE_NO_DEPS = true;<\/script><script type="text/javascript" src="/l-search-result.js"><\/script></body></html>');
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.base.soyTemplateName = 'sm.lSearchResult.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.listHeader_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search-result__list-header"><span class="l-search-result__list-header-text">' + ((opt_data.params.searchText.length) ? '\u041F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 <span class="l-search-result__list-header-text l-search-result__list-header-text_strong">\u00AB' + soy.$$escapeHtml(opt_data.params.searchText) + '\u00BB</span> ' : '\u041F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443 ') + '\u043C\u044B <span class="l-search-result__list-header-text l-search-result__list-header-text_change">' + sm.lSearchResult.Template.generateHeaderText({params: {countResults: opt_data.params.countResults}}, null, opt_ijData) + '</span></span></div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.listHeader_.soyTemplateName = 'sm.lSearchResult.Template.listHeader_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.generateHeaderText = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.params.countResults == 0) {
    output += '\u043D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E.';
  } else {
    output += '\u043D\u0430\u0448\u043B\u0438 <span class="l-search-result__list-header-text l-search-result__list-header-text_strong l-search-result__list-header-text_amount">' + soy.$$escapeHtml(opt_data.params.countResults) + ' ';
    if (opt_data.params.countResults > 100) {
      var lastTwoNumbers__soy1920 = opt_data.params.countResults % 100;
      output += sm.lSearchResult.Template.getEnding_({params: {number: lastTwoNumbers__soy1920}}, null, opt_ijData);
    } else {
      output += sm.lSearchResult.Template.getEnding_({params: {number: opt_data.params.countResults}}, null, opt_ijData);
    }
    output += '</span>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.generateHeaderText.soyTemplateName = 'sm.lSearchResult.Template.generateHeaderText';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.getEnding_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.params.number >= 11 && opt_data.params.number <= 19) {
    output += '\u0448\u043A\u043E\u043B';
  } else {
    var lastNumber__soy1932 = opt_data.params.number % 10;
    output += (lastNumber__soy1932 == 1) ? '\u0448\u043A\u043E\u043B\u0443' : (lastNumber__soy1932 >= 2 && lastNumber__soy1932 <= 4) ? '\u0448\u043A\u043E\u043B\u044B' : '\u0448\u043A\u043E\u043B';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.getEnding_.soyTemplateName = 'sm.lSearchResult.Template.getEnding_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.leftMenu_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search-result__left-menu">' + sm.lSearchResult.Template.filters_(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.leftMenu_.soyTemplateName = 'sm.lSearchResult.Template.leftMenu_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.filters_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search-result__filters">' + sm.lSearchResult.bFilters.Template.base({params: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.filters}, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.filters_.soyTemplateName = 'sm.lSearchResult.Template.filters_';
}
