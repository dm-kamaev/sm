// This file was automatically generated from b-block-mark.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockMark.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockMark == 'undefined') { sm.lDoc.nDemo.bBlockMark = {}; }
if (typeof sm.lDoc.nDemo.bBlockMark.Template == 'undefined') { sm.lDoc.nDemo.bBlockMark.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockMark.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bMark.Template.base({params: {value: 4.4}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockMark.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockMark.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockMark.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Template:<br><br><div class="b-block-mark__code">sm.bMark.Template.base</div><br><br>Params:<br><br><div class="b-block-mark__code">value: number <span class="b-block-mark__comment"> - mark value </span><br>display: ?string | [\'inline\', \'stars\', \'default\']  <span class="b-block-mark__comment">- display stylization</span><br>starsConfig: ?[]  <span class="b-block-mark__comment">- config for stars</span><br>config: [<br><div class="b-block-mark__code-indent">bigText: ?boolean<span class="b-block-mark__comment">- Make font size marks bigger</span></div><div class="b-block-mark__code-indent">notShowDashes: ?boolean<span class="b-block-mark__comment">- for inline view, if true not show dash at "0" value of mark<br></span></div>]</div><br><br><br>Simple example for default display:<br>' + sm.bMark.Template.base({params: {value: 4.4}}, null, opt_ijData) + sm.bMark.Template.base({params: {value: 3.2}}, null, opt_ijData) + sm.bMark.Template.base({params: {value: 2.1}}, null, opt_ijData) + sm.bMark.Template.base({params: {value: 0}}, null, opt_ijData) + '<br><br><div><div class="b-block-mark__inline">Inline (for display: inline) example:<br>' + sm.bMark.Template.base({params: {value: 4.4, display: 'inline'}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 3.2, display: 'inline'}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 2.1, display: 'inline'}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 0, display: 'inline'}}, null, opt_ijData) + '</div><div class="b-block-mark__inline">Inline (for display: inline and bigText = true) example:<br>' + sm.bMark.Template.base({params: {value: 4.4, display: 'inline', config: {bigText: true}}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 3.2, display: 'inline', config: {bigText: true}}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 2.1, display: 'inline', config: {bigText: true}}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 0, display: 'inline'}}, null, opt_ijData) + '</div><div class="b-block-mark__inline">Inline (for display: inline and notShowDashes=true) example:<br>' + sm.bMark.Template.base({params: {value: 4.4, display: 'inline', config: {notShowDashes: true}}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 3.2, display: 'inline', config: {notShowDashes: true}}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 2.1, display: 'inline', config: {notShowDashes: true}}}, null, opt_ijData) + '<br>' + sm.bMark.Template.base({params: {value: 0, display: 'inline', config: {notShowDashes: true}}}, null, opt_ijData) + '</div></div><br><br>Stars (for display: stars) example:<br>' + sm.bMark.Template.base({params: {value: 3, display: 'stars'}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockMark.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockMark.Template.doc';
}
