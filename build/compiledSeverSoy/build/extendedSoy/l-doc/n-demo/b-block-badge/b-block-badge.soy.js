// This file was automatically generated from b-block-badge.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockBadge.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockBadge == 'undefined') { sm.lDoc.nDemo.bBlockBadge = {}; }
if (typeof sm.lDoc.nDemo.bBlockBadge.Template == 'undefined') { sm.lDoc.nDemo.bBlockBadge.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockBadge.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bBadge.Template.base({params: {data: ['\u0421\u0442\u043E \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u041C\u043E\u0441\u043A\u0432\u044B', '250 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u041F\u043E\u0434\u043C\u043E\u0441\u043A\u043E\u0432\u044C\u044F']}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockBadge.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockBadge.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockBadge.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Default view Template:<br><br><div class="l-doc__code">sm.bBadge.Template.base</div><br><br>Params:<br><br><div class="l-doc__code">data: list< string >, <span class="l-doc__comment">- array of values (metros or ratings for example)</span><br>display: ?string | [\'metro\'] <span class="l-doc__comment">- type of display</span></div><br><br>Ratings view:<br><br>' + sm.bBadge.Template.base({params: {data: ['\u0421\u0442\u043E \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u041C\u043E\u0441\u043A\u0432\u044B', '250 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u041F\u043E\u0434\u043C\u043E\u0441\u043A\u043E\u0432\u044C\u044F']}}, null, opt_ijData) + '<br><br>Metro view:<br><br>' + sm.bBadge.Template.base({params: {data: ['\u0410\u0440\u0431\u0430\u0442\u0441\u043A\u0430\u044F', '\u041A\u0440\u044B\u043B\u0430\u0442\u0441\u043A\u043E\u0435'], display: 'metro'}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockBadge.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockBadge.Template.doc';
}
