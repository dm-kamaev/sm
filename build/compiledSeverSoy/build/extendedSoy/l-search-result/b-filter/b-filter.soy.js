// This file was automatically generated from b-filter.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bFilter.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bFilter == 'undefined') { sm.lSearchResult.bFilter = {}; }
if (typeof sm.lSearchResult.bFilter.Template == 'undefined') { sm.lSearchResult.bFilter.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bFilter.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.base.soyTemplateName = 'sm.lSearchResult.bFilter.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.rootClassName = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('b-filter');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.rootClassName.soyTemplateName = 'sm.lSearchResult.bFilter.Template.rootClassName';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(sm.lSearchResult.bFilter.Template.rootClassName(null, null, opt_ijData)) + '">' + sm.lSearchResult.bFilter.Template.header(opt_data, null, opt_ijData) + sm.lSearchResult.bFilter.Template.filters(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.init.soyTemplateName = 'sm.lSearchResult.bFilter.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__header"><span class="b-filter__title">' + soy.$$escapeHtml((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.header == null) ? null : opt_data.params.data.header.title) + '</span>' + (((opt_data.params == null) ? null : (opt_data.params.header == null) ? null : opt_data.params.header.help) ? '<div class="b-filter__help" data-help="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.header == null) ? null : opt_data.params.data.header.help) + '"><img src="/images/l-search-result/b-filter/b-filter__help.png"/></div>' : '') + ((! ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.cannotBeHidden)) ? sm.lSearchResult.bFilter.Template.showFiltersButton(null, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.header.soyTemplateName = 'sm.lSearchResult.bFilter.Template.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.filters = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var filToShow__soy2210 = ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.filtersToShow) ? ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.filtersToShow) - 1 : 5;
  output += '<div class="b-filter__filters' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.cannotBeHidden) ? '' : ' i-utils__hidden') + '">';
  var iLimit2214 = opt_data.params.data.filters.length;
  for (var i2214 = 0; i2214 < iLimit2214; i2214++) {
    output += sm.lSearchResult.bFilter.Template.filter({params: {filter: opt_data.params.data.filters[i2214], hidden: i2214 > filToShow__soy2210 ? true : false, name: opt_data.params.data.name, id: i2214}}, null, opt_ijData);
  }
  output += ((opt_data.params.data.filters.length > filToShow__soy2210) ? '<div class="b-filter__show-button">\u0415\u0449\u0435 ' + soy.$$escapeHtml(opt_data.params.data.filters.length - filToShow__soy2210 - 1) + ' \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432</div>' : '') + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.filters.soyTemplateName = 'sm.lSearchResult.bFilter.Template.filters';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.filter = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__section ' + soy.$$escapeHtmlAttribute(opt_data.params.hidden ? 'i-utils__hidden' : '') + '"><div class="b-filter__filter"><input type="checkbox" class="b-filter__input" id="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '-' + soy.$$escapeHtmlAttribute(opt_data.params.id) + '" name="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '" value="' + soy.$$escapeHtmlAttribute(opt_data.params.filter.value) + '"/><label for="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '-' + soy.$$escapeHtmlAttribute(opt_data.params.id) + '" class="b-filter__input-label">' + soy.$$escapeHtml(opt_data.params.filter.label) + '</label></div></div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.filter.soyTemplateName = 'sm.lSearchResult.bFilter.Template.filter';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.showFiltersButton = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__show-filters-button"><div class="b-filter__show-filters-icon b-icon_img_filter-arrow-down"></div></div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.showFiltersButton.soyTemplateName = 'sm.lSearchResult.bFilter.Template.showFiltersButton';
}
