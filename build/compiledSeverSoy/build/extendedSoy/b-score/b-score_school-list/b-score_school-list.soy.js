// This file was automatically generated from b-score_school-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bScoreSchoolList.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bScoreSchoolList == 'undefined') { sm.bScoreSchoolList = {}; }
if (typeof sm.bScoreSchoolList.Template == 'undefined') { sm.bScoreSchoolList.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScoreSchoolList.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bScoreSchoolList.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.bScoreSchoolList.Template.base.soyTemplateName = 'sm.bScoreSchoolList.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScoreSchoolList.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-score b-score_school-list"><div class="b-score__current-criterion-name i-utils__hidden">' + soy.$$escapeHtml(opt_data.params.sortCriteria.name) + '</div><div class="b-score__current-criterion-value">' + sm.bMark.Template.base({params: {value: opt_data.params.sortCriteria.value, display: 'inline', config: {bigText: true, notShowDashes: true}}}, null, opt_ijData) + '</div><div class="b-score__other-marks i-utils__hidden"><div class="b-score__arrow"><div class="b-score__arrow-shadow"></div></div>' + ((opt_data.params.score.length > 0) ? sm.bScoreSchoolList.Template.scoreItems({params: {data: opt_data.params.score}}, null, opt_ijData) : '') + '</div></div>');
};
if (goog.DEBUG) {
  sm.bScoreSchoolList.Template.init.soyTemplateName = 'sm.bScoreSchoolList.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScoreSchoolList.Template.scoreItems = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul><li class="b-score__mark-item">\u041E\u0446\u0435\u043D\u043A\u0438, \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C\u0438</li>';
  var itemList1966 = opt_data.params.data;
  var itemListLen1966 = itemList1966.length;
  for (var itemIndex1966 = 0; itemIndex1966 < itemListLen1966; itemIndex1966++) {
    var itemData1966 = itemList1966[itemIndex1966];
    output += '<li class="b-score__mark-item"><div class="b-score__mark-name">' + soy.$$escapeHtml(itemData1966.name) + '</div><div class="b-score__mark-value">' + sm.bMark.Template.base({params: {value: itemData1966.value, display: 'number'}}, null, opt_ijData) + '</div></li>';
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bScoreSchoolList.Template.scoreItems.soyTemplateName = 'sm.bScoreSchoolList.Template.scoreItems';
}
