// This file was automatically generated from b-filter_classes.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bFilterClasses.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bFilterClasses == 'undefined') { sm.lSearchResult.bFilterClasses = {}; }
if (typeof sm.lSearchResult.bFilterClasses.Template == 'undefined') { sm.lSearchResult.bFilterClasses.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bFilterClasses.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.base.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.rootClassName = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('b-filter b-filter_classes');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.rootClassName.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.rootClassName';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.filters = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<div class="b-filter__filters"><div class="b-filter__filter b-filter__filter_center">';
  for (var i2250 = 0; i2250 < 11; i2250++) {
    output += '<input type="radio" id="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '-' + soy.$$escapeHtmlAttribute(i2250 + 1) + '" class="b-filter__input" name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '" value="' + soy.$$escapeHtmlAttribute(i2250 + 1) + '"/><label for="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '-' + soy.$$escapeHtmlAttribute(i2250 + 1) + '" class="b-filter__input-label ' + soy.$$escapeHtmlAttribute(i2250 > 3 ? 'b-filter__input-label_middle ' : '') + soy.$$escapeHtmlAttribute(i2250 > 8 ? 'b-filter__input-label_high' : '') + '">' + soy.$$escapeHtml(i2250 + 1) + '</label>';
  }
  output += '</div><div class="b-filter__filter"><input type="checkbox" class="b-filter__input-ordinary" id="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '-after-school" name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '" value="0"/><label for="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '-after-school" class="b-filter__input-label-ordinary">\u0414\u0435\u0442\u0441\u043A\u0438\u0439 \u0441\u0430\u0434 \u043F\u0440\u0438 \u0448\u043A\u043E\u043B\u0435</label></div><div class="b-filter__reset i-utils__hidden">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.filters.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.filters';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.showFiltersButton = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.showFiltersButton.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.showFiltersButton';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(sm.lSearchResult.bFilterClasses.Template.rootClassName(null, null, opt_ijData)) + '">' + sm.lSearchResult.bFilterClasses.Template.header(opt_data, null, opt_ijData) + sm.lSearchResult.bFilterClasses.Template.filters(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.init.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__header"><span class="b-filter__title">' + soy.$$escapeHtml((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.header == null) ? null : opt_data.params.data.header.title) + '</span>' + (((opt_data.params == null) ? null : (opt_data.params.header == null) ? null : opt_data.params.header.help) ? '<div class="b-filter__help" data-help="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.header == null) ? null : opt_data.params.data.header.help) + '"><img src="/images/l-search-result/b-filter/b-filter__help.png"/></div>' : '') + ((! ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.cannotBeHidden)) ? sm.lSearchResult.bFilterClasses.Template.showFiltersButton(null, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.header.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.filter = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__section ' + soy.$$escapeHtmlAttribute(opt_data.params.hidden ? 'i-utils__hidden' : '') + '"><div class="b-filter__filter"><input type="checkbox" class="b-filter__input" id="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '-' + soy.$$escapeHtmlAttribute(opt_data.params.id) + '" name="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '" value="' + soy.$$escapeHtmlAttribute(opt_data.params.filter.value) + '"/><label for="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '-' + soy.$$escapeHtmlAttribute(opt_data.params.id) + '" class="b-filter__input-label">' + soy.$$escapeHtml(opt_data.params.filter.label) + '</label></div></div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.filter.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.filter';
}
