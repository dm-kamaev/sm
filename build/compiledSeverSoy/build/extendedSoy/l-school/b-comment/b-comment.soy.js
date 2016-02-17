// This file was automatically generated from b-comment.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bComment.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bComment == 'undefined') { sm.lSchool.bComment = {}; }
if (typeof sm.lSchool.bComment.Template == 'undefined') { sm.lSchool.bComment.Template = {}; }


/**
 * @param {{
 *    params: {author: string, rank: string, sections: !Array.<{name: string, value: number}>, text: string}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bComment.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var params = goog.asserts.assertObject(opt_data.params, "expected parameter 'params' of type [author: string, rank: string, sections: list<[name: string, value: int]>, text: string].");
  var output = '<div class="b-comment">';
  if (params.sections.length) {
    output += '<div class="b-comment__header">';
    var sectionList1981 = params.sections;
    var sectionListLen1981 = sectionList1981.length;
    for (var sectionIndex1981 = 0; sectionIndex1981 < sectionListLen1981; sectionIndex1981++) {
      var sectionData1981 = sectionList1981[sectionIndex1981];
      output += sm.lSchool.bComment.Template.section_({params: {name: sectionData1981.name, rating: sectionData1981.value}}, null, opt_ijData);
    }
    output += '</div>';
  }
  output += '<div class="b-comment__wrap">' + ((('' + params.text).length > 430) ? '<span class="b-comment__text">' + soy.$$escapeHtml(soy.$$truncate(params.text, 430, true)) + '</span><span class="b-comment__text b-comment__text_hidden">' + soy.$$escapeHtml(params.text) + '</span><div class="b-comment__spoiler">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E</div>' : '<span class="b-comment__text">' + soy.$$escapeHtml(params.text) + '</span>') + '</div><div class="b-comment__footer"><img class="b-comment__avatar" align="top" src="/images/l-school/b-comment/person.png"><div class="b-comment__author">' + soy.$$escapeHtml(params.author) + ', ' + soy.$$escapeHtml(params.rank) + '</div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bComment.Template.base.soyTemplateName = 'sm.lSchool.bComment.Template.base';
}


/**
 * @param {{
 *    params: {name: string, rating: number}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bComment.Template.section_ = function(opt_data, opt_ignored, opt_ijData) {
  var params = goog.asserts.assertObject(opt_data.params, "expected parameter 'params' of type [name: string, rating: int].");
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((params.rating > 0) ? '<div class="b-comment__header-section"><div class="b-comment__header-section-name">' + soy.$$escapeHtml(params.name) + '</div><div class="b-comment__stars-rating">' + sm.bStars.Template.base({params: {data: {mark: params.rating}, isClickable: false}}, null, opt_ijData) + '</div></div>' : '');
};
if (goog.DEBUG) {
  sm.lSchool.bComment.Template.section_.soyTemplateName = 'sm.lSchool.bComment.Template.section_';
}
