// This file was automatically generated from b-school-list-item.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bSchoolListItem.Template.
 */

goog.provide('sm.lSearchResult.bSchoolListItem.Template');

goog.require('soy');
goog.require('soydata');
goog.require('cl.iUtils.Utils');
goog.require('sm.bBadge.Template');
goog.require('sm.bScoreSchoolList.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bSchoolListItem.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-school-list-item" data-params="' + soy.$$escapeHtmlAttribute(cl.iUtils.Utils.stringify({json: opt_data.params}, null, opt_ijData)) + '"><div class="b-school-list-item__section"><a href="/school/' + soy.$$escapeHtmlAttribute(opt_data.params.url) + '" class="b-school-list-item__name">' + soy.$$escapeHtml(opt_data.params.name.light) + ((opt_data.params.name.bold) ? '<span class="b-school-list-item__name_bold">' + soy.$$escapeHtml(opt_data.params.name.bold) + '</span>' : '') + '</a><div class="b-school-list-item__score">' + sm.bScoreSchoolList.Template.base({params: {score: opt_data.params.score, sortCriteria: opt_data.params.currentCriterion}}, null, opt_ijData) + '</div></div>' + ((opt_data.params.metroStations.length > 0 || opt_data.params.ratings.length > 0) ? '<div class="b-school-list-item__section b-school-list-item__section_badges">' + ((opt_data.params.metroStations.length > 0) ? '<div class="b-school-list-item__metro-stations">' + sm.bBadge.Template.base({params: {data: opt_data.params.metroStations, display: 'metro'}}, null, opt_ijData) + '</div>' : '') + ((opt_data.params.ratings.length > 0) ? '<div class="b-school-list-item__ratings">' + sm.bBadge.Template.base({params: {data: opt_data.params.ratings}}, null, opt_ijData) + '</div>' : '') + '</div>' : '') + ((opt_data.params.description) ? '<div class="b-school-list-item__section"><div class="b-school-list-item__description">' + soy.$$escapeHtml(opt_data.params.description) + '</div></div>' : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bSchoolListItem.Template.base.soyTemplateName = 'sm.lSearchResult.bSchoolListItem.Template.base';
}
