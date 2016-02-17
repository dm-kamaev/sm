// This file was automatically generated from b-school-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bSchoolList.Template.
 */

goog.provide('sm.lSearchResult.bSchoolList.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.lSearchResult.bSchoolListItem.Template');
goog.require('sm.lSearchResult.bSort.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bSchoolList.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<div class="b-school-list"><div class="b-school-list__header"><div class="b-school-list__line"></div><div class="b-school-list__sort">' + sm.lSearchResult.bSort.Template.base(null, null, opt_ijData) + '</div></div><div class="b-school-list__body">';
  var schoolList2331 = opt_data.params.schools;
  var schoolListLen2331 = schoolList2331.length;
  for (var schoolIndex2331 = 0; schoolIndex2331 < schoolListLen2331; schoolIndex2331++) {
    var schoolData2331 = schoolList2331[schoolIndex2331];
    output += sm.lSearchResult.bSchoolListItem.Template.base({params: {id: schoolData2331.id, url: schoolData2331.url, name: schoolData2331.name, score: schoolData2331.score, currentCriterion: schoolData2331.currentCriterion, description: schoolData2331.description, metroStations: schoolData2331.metroStations, ratings: schoolData2331.ratings}}, null, opt_ijData);
  }
  output += '</div><div class="b-school-list__loader i-utils__hidden"><div class="b-school-list__loader-image"></div><div class="b-school-list__loader-text">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0441\u043F\u0438\u0441\u043E\u043A...</div></div><div class="b-school-list__footer"><div class="b-school-list__show-more-button ' + ((opt_data.params.schools.length < 10) ? 'i-utils__hidden' : '') + '">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451</div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bSchoolList.Template.base.soyTemplateName = 'sm.lSearchResult.bSchoolList.Template.base';
}
