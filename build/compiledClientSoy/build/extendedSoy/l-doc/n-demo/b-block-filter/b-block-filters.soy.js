// This file was automatically generated from b-block-filters.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockFilters.Template.
 */

goog.provide('sm.lDoc.nDemo.bBlockFilters.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.lSearchResult.bFilters.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockFilters.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bFilters.Template.base({params: {filters: [{data: {filters: [{label: '\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A', value: '1'}, {label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A', value: '2'}], header: {title: '\u042F\u0437\u044B\u043A\u0438 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440', help: '\u042F\u0437\u044B\u043A \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440'}, name: 'myFilter'}, config: {cannotBeHidden: false}}, {data: {filters: [{label: '\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A', value: '1'}, {label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A', value: '2'}], header: {title: '\u042F\u0437\u044B\u043A\u0438 2 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440', help: '\u042F\u0437\u044B\u043A 2 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440'}, name: 'myFilter2'}, config: {cannotBeHidden: false}}], url: 'url'}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockFilters.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockFilters.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockFilters.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockFilters.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockFilters.Template.doc';
}
