// This file was automatically generated from b-school-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bSchoolList.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bSchoolList == 'undefined') { sm.lSearchResult.bSchoolList = {}; }
if (typeof sm.lSearchResult.bSchoolList.Template == 'undefined') { sm.lSearchResult.bSchoolList.Template = {}; }


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
  var schoolList2332 = opt_data.params.schools;
  var schoolListLen2332 = schoolList2332.length;
  for (var schoolIndex2332 = 0; schoolIndex2332 < schoolListLen2332; schoolIndex2332++) {
    var schoolData2332 = schoolList2332[schoolIndex2332];
    output += sm.lSearchResult.bSchoolListItem.Template.base({params: {id: schoolData2332.id, url: schoolData2332.url, name: schoolData2332.name, score: schoolData2332.score, currentCriterion: schoolData2332.currentCriterion, description: schoolData2332.description, metroStations: schoolData2332.metroStations, ratings: schoolData2332.ratings}}, null, opt_ijData);
  }
  output += '</div><div class="b-school-list__loader i-utils__hidden"><div class="b-school-list__loader-image"></div><div class="b-school-list__loader-text">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0441\u043F\u0438\u0441\u043E\u043A...</div></div><div class="b-school-list__footer"><div class="b-school-list__show-more-button ' + ((opt_data.params.schools.length < 10) ? 'i-utils__hidden' : '') + '">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451</div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bSchoolList.Template.base.soyTemplateName = 'sm.lSearchResult.bSchoolList.Template.base';
}
