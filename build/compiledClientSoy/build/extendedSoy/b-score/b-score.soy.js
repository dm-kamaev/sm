// This file was automatically generated from b-score.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bScore.Template.
 */

goog.provide('sm.bScore.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.bDiagram.Template');
goog.require('sm.bMark.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScore.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bScore.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.bScore.Template.base.soyTemplateName = 'sm.bScore.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScore.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-score"><div class="b-score__section b-score__section_left"><div class="b-score__average">' + sm.bMark.Template.base({params: {value: opt_data.params.totalScore}}, null, opt_ijData) + '</div><div class="b-score__delimiter"></div><div class="b-score__comments-amount">' + ((! opt_data.params.reviewCount || opt_data.params.reviewCount < 5) ? '\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E' : soy.$$escapeHtml(opt_data.params.reviewCount)) + ' \u043E\u0446\u0435\u043D\u043E\u043A</div></div><div class="b-score__section b-score__section_right">' + sm.bDiagram.Template.base({params: {data: opt_data.params.score, display: 'marks'}}, null, opt_ijData) + '</div></div>');
};
if (goog.DEBUG) {
  sm.bScore.Template.init.soyTemplateName = 'sm.bScore.Template.init';
}
