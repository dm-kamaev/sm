// This file was automatically generated from b-comments.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bComments.Template.
 */

goog.provide('sm.lSchool.bComments.Template');

goog.require('soy');
goog.require('soydata');
goog.require('goog.asserts');
goog.require('sm.lSchool.bComment.Template');


/**
 * @param {{
 *    params: {comments: !Array.<{author: string, rank: string, sections: !Array.<{name: string, value: number}>, text: string}>}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bComments.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var params = goog.asserts.assertObject(opt_data.params, "expected parameter 'params' of type [comments: list<[author: string, rank: string, sections: list<[name: string, value: int]>, text: string]>].");
  var output = '<div class="b-comments">';
  var commentList2016 = params.comments;
  var commentListLen2016 = commentList2016.length;
  for (var commentIndex2016 = 0; commentIndex2016 < commentListLen2016; commentIndex2016++) {
    var commentData2016 = commentList2016[commentIndex2016];
    output += sm.lSchool.bComment.Template.base({params: {author: commentData2016.author, rank: commentData2016.rank, text: commentData2016.text, sections: commentData2016.sections}}, null, opt_ijData);
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bComments.Template.base.soyTemplateName = 'sm.lSchool.bComments.Template.base';
}
