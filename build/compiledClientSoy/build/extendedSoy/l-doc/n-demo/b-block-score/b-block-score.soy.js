// This file was automatically generated from b-block-score.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockScore.Template.
 */

goog.provide('sm.lDoc.nDemo.bBlockScore.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.bScore.Template');
goog.require('sm.bScoreSchoolList.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockScore.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bScore.Template.base({params: {reviewCount: 10, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], totalScore: 4}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockScore.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockScore.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockScore.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Default view Template:<br><br><div class="l-doc__code">sm.bScore.Template.base</div><br><br>Params:<br><br><div class="l-doc__code">reviewCount: ?number,<br>score: list<[<br><div class="l-doc__code-indent">name: ?string,</div><div class="l-doc__code-indent">value: ?number</div>]>,<br>totalScore: ?number</div><br><br>' + sm.bScore.Template.base({params: {reviewCount: 10, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], totalScore: 4}}, null, opt_ijData) + '<br><br>School list view Template:<br><br><div class="l-doc__code">sm.bScoreSchoolList.Template.base</div><br><br>Params:<br><br><div class="l-doc__code">score: list<[<br><div class="l-doc__code-indent">name: ?string,</div><div class="l-doc__code-indent">value: ?number</div>]>,<br>sortCriteria: [<br><div class="l-doc__code-indent">name: ?string,</div><div class="l-doc__code-indent">value: ?number</div>]</div><br><br>' + sm.bScoreSchoolList.Template.base({params: {score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], sortCriteria: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 2.3}}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockScore.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockScore.Template.doc';
}
