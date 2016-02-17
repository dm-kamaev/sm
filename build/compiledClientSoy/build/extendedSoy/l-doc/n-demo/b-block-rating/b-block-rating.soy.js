// This file was automatically generated from b-block-rating.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockRating.Template.
 */

goog.provide('sm.lDoc.nDemo.bBlockRating.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.bRating.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockRating.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bRating.Template.base({params: {marks: [1, 3, 4, 2], averageMark: 2.5}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockRating.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockRating.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockRating.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bRating.Template.base({params: {marks: [1, 3, 4, 2], averageMark: 2.5}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockRating.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockRating.Template.doc';
}
