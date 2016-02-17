// This file was automatically generated from b-popular-schools.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bPopularSchools.Template.
 */

goog.provide('sm.bPopularSchools.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.bMark.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bPopularSchools.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="b-popular-schools"><div class="b-popular-schools__title">\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0448\u043A\u043E\u043B\u044B</div>';
  var schoolList533 = (opt_data.params == null) ? null : opt_data.params.popularSchools;
  var schoolListLen533 = schoolList533.length;
  for (var schoolIndex533 = 0; schoolIndex533 < schoolListLen533; schoolIndex533++) {
    var schoolData533 = schoolList533[schoolIndex533];
    output += '<a class="b-popular-schools__school-link" href="/school/' + soy.$$escapeHtmlAttribute(schoolData533.url) + '"><div class="b-popular-schools__school' + ((schoolIndex533 == schoolListLen533 - 1) ? ' b-popular-schools__school_last' : '') + '"><div class="b-popular-schools__school-rating">' + sm.bMark.Template.base({params: {value: schoolData533.totalScore}}, null, opt_ijData) + '</div><div class="b-popular-schools__school-name">' + soy.$$escapeHtml(schoolData533.name) + '</div>' + ((schoolData533.description) ? '<div class="b-popular-schools__school-description">' + soy.$$escapeHtml(schoolData533.description) + '</div>' : '');
    if (((schoolData533 == null) ? null : schoolData533.metro).length > 0) {
      output += '<div class="b-popular-schools__metro"><div class="b-popular-schools__metro-icon b-icon_img_metro"></div>';
      var metroStationList554 = (schoolData533 == null) ? null : schoolData533.metro;
      var metroStationListLen554 = metroStationList554.length;
      for (var metroStationIndex554 = 0; metroStationIndex554 < metroStationListLen554; metroStationIndex554++) {
        var metroStationData554 = metroStationList554[metroStationIndex554];
        output += '<span class="b-popular-schools__metro-stations">' + soy.$$escapeHtml(metroStationData554) + ((! (metroStationIndex554 == metroStationListLen554 - 1)) ? ',' : '') + '</span> ';
      }
      output += '</div>';
    }
    output += '</div></a>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bPopularSchools.Template.base.soyTemplateName = 'sm.bPopularSchools.Template.base';
}
