// This file was automatically generated from b-results.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bResults.Template.
 */

goog.provide('sm.lSchool.bResults.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.bDiagram.Template');
goog.require('sm.iFactory.TemplateFactoryStendhal.INSTANCE');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bResults.Template.results = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var ege__soy2127 = '' + sm.lSchool.bResults.Template.label_({params: {label: '\u0415\u0413\u042D'}}, null, opt_ijData);
  ege__soy2127 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(ege__soy2127);
  var gia__soy2130 = '' + sm.lSchool.bResults.Template.label_({params: {label: '\u0413\u0418\u0410'}}, null, opt_ijData);
  gia__soy2130 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(gia__soy2130);
  var olymp__soy2133 = '' + sm.lSchool.bResults.Template.label_({params: {label: '\u041E\u041B\u0418\u041C\u041F\u0418\u0410\u0414\u042B'}}, null, opt_ijData);
  olymp__soy2133 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(olymp__soy2133);
  var egeContent__soy2136 = '' + sm.lSchool.bResults.Template.content_({params: {data: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.ege, config: {type: 'ege'}}}, null, opt_ijData);
  egeContent__soy2136 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(egeContent__soy2136);
  var giaContent__soy2139 = '' + sm.lSchool.bResults.Template.content_({params: {data: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.gia, config: {type: 'gia'}}}, null, opt_ijData);
  giaContent__soy2139 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(giaContent__soy2139);
  output += '<div class="b-results">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'tab', renderParams: {data: {tabs: [{label: ege__soy2127, content: egeContent__soy2136}, {label: gia__soy2130, content: giaContent__soy2139}, {label: olymp__soy2133, content: olymp__soy2133}]}, config: {theme: 'red'}}}}, null, opt_ijData)) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bResults.Template.results.soyTemplateName = 'sm.lSchool.bResults.Template.results';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bResults.Template.label_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<h3 class="b-results__label">' + soy.$$escapeHtml(opt_data.params.label) + '</h3>');
};
if (goog.DEBUG) {
  sm.lSchool.bResults.Template.label_.soyTemplateName = 'sm.lSchool.bResults.Template.label_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bResults.Template.content_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var content__soy2151 = '' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'list', renderParams: {data: {items: (opt_data.params.data == null) ? null : opt_data.params.data.years}}}}, null, opt_ijData));
  content__soy2151 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(content__soy2151);
  if (opt_data.params.data) {
    var maxValue__soy2156 = opt_data.params.config.type == 'ege' ? 100 : 5;
    output += '<div class="b-results__content">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'dropdown', renderParams: {data: {opener: '2015', content: content__soy2151}, config: {customClasses: ['b-results__dropdown']}}}}, null, opt_ijData));
    var yearResultsList2160 = (opt_data.params.data == null) ? null : opt_data.params.data.results;
    var yearResultsListLen2160 = yearResultsList2160.length;
    for (var yearResultsIndex2160 = 0; yearResultsIndex2160 < yearResultsListLen2160; yearResultsIndex2160++) {
      var yearResultsData2160 = yearResultsList2160[yearResultsIndex2160];
      output += '<div class="b-results__inner-content">' + ((yearResultsData2160.top) ? '<div class="b-results__content-item"><div class="b-results__item-label">\u0412\u044B\u0448\u0435 \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u043F\u043E \u043C\u043E\u0441\u043A\u0432\u0435</div><div class="b-results__item-data">' + sm.bDiagram.Template.base({params: {data: yearResultsData2160.top, maxValue: maxValue__soy2156, display: 'bars', range: (opt_data.params.data == null) ? null : opt_data.params.data.range}}, null, opt_ijData) + '</div></div>' : '') + ((yearResultsData2160.middle) ? '<div class="b-results__content-item"><div class="b-results__item-label">\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C</div><div class="b-results__item-data">' + sm.bDiagram.Template.base({params: {data: yearResultsData2160.middle, maxValue: maxValue__soy2156, display: 'bars', range: (opt_data.params.data == null) ? null : opt_data.params.data.range}}, null, opt_ijData) + '</div></div>' : '') + ((yearResultsData2160.bottom) ? '<div class="b-results__content-item"><div class="b-results__item-label">\u041D\u0438\u0436\u0435 \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E</div><div class="b-results__item-data">' + sm.bDiagram.Template.base({params: {data: yearResultsData2160.bottom, maxValue: maxValue__soy2156, display: 'bars', range: (opt_data.params.data == null) ? null : opt_data.params.data.range}}, null, opt_ijData) + '</div></div>' : '') + '</div>';
    }
    output += '</div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bResults.Template.content_.soyTemplateName = 'sm.lSchool.bResults.Template.content_';
}
