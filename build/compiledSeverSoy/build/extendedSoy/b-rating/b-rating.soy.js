// This file was automatically generated from b-rating.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bRating.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bRating == 'undefined') { sm.bRating = {}; }
if (typeof sm.bRating.Template == 'undefined') { sm.bRating.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bRating.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class=" b-rating' + ((opt_data.params.theme) ? ' b-rating_' + soy.$$escapeHtmlAttribute(opt_data.params.theme) + '-theme' : '') + '">' + ((! opt_data.params.noMarks) ? sm.bRating.Template.marks_({params: {marks: opt_data.params.marks, averageMark: opt_data.params.averageMark}}, null, opt_ijData) : '') + ((! opt_data.params.noSectionNames) ? sm.bRating.Template.sectionNames_(null, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.bRating.Template.base.soyTemplateName = 'sm.bRating.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bRating.Template.marks_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="b-rating__marks"><div class="b-rating__section"><div class="b-rating__mark b-rating__mark_average' + ((! opt_data.params.averageMark > 0) ? ' b-rating__mark_null-average' : '') + '">' + soy.$$escapeHtml(opt_data.params.averageMark > 0 ? Math.round(opt_data.params.averageMark * 10) / 10 : '\u2014') + '</div></div>';
  var markList591 = opt_data.params.marks;
  var markListLen591 = markList591.length;
  for (var markIndex591 = 0; markIndex591 < markListLen591; markIndex591++) {
    var markData591 = markList591[markIndex591];
    output += '<div class="b-rating__section"><div class="b-rating__mark b-rating__mark_ordinary">' + soy.$$escapeHtml(markData591 > 0 ? Math.round(markData591 * 10) / 10 : '\u2014') + '</div></div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bRating.Template.marks_.soyTemplateName = 'sm.bRating.Template.marks_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bRating.Template.sectionNames_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var sectionNames__soy598 = ['\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B', '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430'];
  output += '<div class="b-rating__sections">';
  var sectionNameList600 = sectionNames__soy598;
  var sectionNameListLen600 = sectionNameList600.length;
  for (var sectionNameIndex600 = 0; sectionNameIndex600 < sectionNameListLen600; sectionNameIndex600++) {
    var sectionNameData600 = sectionNameList600[sectionNameIndex600];
    output += '<div class="b-rating__section"><div class=" b-rating__section-name' + ((sectionNameIndex600 == 0) ? ' b-rating__section-name_average' : '') + '">' + soy.$$escapeHtml(sectionNameData600) + '</div></div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bRating.Template.sectionNames_.soyTemplateName = 'sm.bRating.Template.sectionNames_';
}
