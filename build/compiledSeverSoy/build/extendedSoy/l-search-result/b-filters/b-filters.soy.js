// This file was automatically generated from b-filters.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bFilters.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bFilters == 'undefined') { sm.lSearchResult.bFilters = {}; }
if (typeof sm.lSearchResult.bFilters.Template == 'undefined') { sm.lSearchResult.bFilters.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilters.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<form class="b-filters" method="GET" action="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(((opt_data.params == null) ? null : opt_data.params.url) != null ? ((opt_data.params == null) ? null : opt_data.params.url) : '')) + '">' + sm.lSearchResult.bFilterClasses.Template.base({params: {data: {header: {title: '\u0412 \u043A\u0430\u043A\u043E\u0439 \u043A\u043B\u0430\u0441\u0441 \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u0434\u0430\u0442\u044C \u0440\u0435\u0431\u0435\u043D\u043A\u0430?'}, name: 'classes'}}}, null, opt_ijData);
  var filterList2322 = opt_data.params.filters;
  var filterListLen2322 = filterList2322.length;
  for (var filterIndex2322 = 0; filterIndex2322 < filterListLen2322; filterIndex2322++) {
    var filterData2322 = filterList2322[filterIndex2322];
    output += sm.lSearchResult.bFilter.Template.base({params: filterData2322}, null, opt_ijData);
  }
  output += '<div class="b-filters__submit-button">\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C</div></form>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilters.Template.base.soyTemplateName = 'sm.lSearchResult.bFilters.Template.base';
}
