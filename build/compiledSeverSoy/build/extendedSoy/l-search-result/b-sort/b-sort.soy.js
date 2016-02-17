// This file was automatically generated from b-sort.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bSort.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bSort == 'undefined') { sm.lSearchResult.bSort = {}; }
if (typeof sm.lSearchResult.bSort.Template == 'undefined') { sm.lSearchResult.bSort.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bSort.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var switcher__soy2383 = '' + sm.lSearchResult.bSort.Template.switcher_(null, null, opt_ijData);
  switcher__soy2383 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(switcher__soy2383);
  var content__soy2385 = '' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'list', renderParams: {data: {items: [{label: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430'}, {label: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435'}, {label: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438'}, {label: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430'}, {label: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430'}]}}}}, null, opt_ijData));
  content__soy2385 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(content__soy2385);
  output += '<div class="b-sort">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'dropdown', renderParams: {data: {opener: switcher__soy2383, content: content__soy2385}}}}, null, opt_ijData)) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bSort.Template.base.soyTemplateName = 'sm.lSearchResult.bSort.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bSort.Template.switcher_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class="g-dropdown__switcher-text">\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E  <span class="g-dropdown__switcher-custom-text">\u0441\u0440\u0435\u0434\u043D\u0435\u0439 \u043E\u0446\u0435\u043D\u043A\u0435</span></span><img class="g-dropdown__switcher-image" src="/images/l-search-result/b-sort/downArrow.png">');
};
if (goog.DEBUG) {
  sm.lSearchResult.bSort.Template.switcher_.soyTemplateName = 'sm.lSearchResult.bSort.Template.switcher_';
}
