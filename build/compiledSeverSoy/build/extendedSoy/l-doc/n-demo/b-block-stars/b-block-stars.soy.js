// This file was automatically generated from b-block-stars.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockStars.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockStars == 'undefined') { sm.lDoc.nDemo.bBlockStars = {}; }
if (typeof sm.lDoc.nDemo.bBlockStars.Template == 'undefined') { sm.lDoc.nDemo.bBlockStars.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockStars.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bStars.Template.base({params: {data: {mark: 4}}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockStars.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockStars.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockStars.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<br>NOT CLICKABLE:<br>' + sm.bStars.Template.base({params: {data: {mark: 1}, config: {style: {theme: 'colored'}}}}, null, opt_ijData) + '<br>' + sm.bStars.Template.base({params: {data: {mark: 2}}}, null, opt_ijData) + '<br>' + sm.bStars.Template.base({params: {data: {mark: 3}}}, null, opt_ijData) + '<br>' + sm.bStars.Template.base({params: {data: {mark: 4}}}, null, opt_ijData) + '<br>' + sm.bStars.Template.base({params: {data: {mark: 5}}}, null, opt_ijData) + '<br><br>COLORED:<br>' + sm.bStars.Template.base({params: {data: {mark: 3}, config: {style: {theme: 'colored'}, isClickable: true}}}, null, opt_ijData) + '<br><br>LARGE:<br>' + sm.bStars.Template.base({params: {data: {mark: 5}, config: {style: {size: 'large'}}}}, null, opt_ijData) + '<br><br>LARGE COLORED:<br>' + sm.bStars.Template.base({params: {data: {mark: 4}, config: {style: {size: 'large', theme: 'colored'}, isClickable: true}}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockStars.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockStars.Template.doc';
}
