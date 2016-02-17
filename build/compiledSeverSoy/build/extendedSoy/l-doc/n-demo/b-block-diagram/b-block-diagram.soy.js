// This file was automatically generated from b-block-diagram.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockDiagram.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockDiagram == 'undefined') { sm.lDoc.nDemo.bBlockDiagram = {}; }
if (typeof sm.lDoc.nDemo.bBlockDiagram.Template == 'undefined') { sm.lDoc.nDemo.bBlockDiagram.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockDiagram.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bDiagram.Template.base({params: {data: [{name: 'Name1', value: 7}, {name: 'Name2', value: 3}], maxValue: 10}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockDiagram.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockDiagram.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockDiagram.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Template:<br><br><div class="b-block-mark__code">sm.bDiagram.Template.base</div><br><br>Params:<br><br><div class="b-block-mark__code">data: list<[ <br><span class="b-block-diagram__code-indent">name: string,</span><br><span class="b-block-diagram__code-indent">value: string</span><br><span class="b-block-diagram__code-indent">averageValue:  ?string</span><br><span class="b-block-diagram__code-indent">description:  ?string</span><br>]>,<br>display: ?string | [\'text\', \'stars\', \'marks\', \'bars\', \'default\']  <span class="b-block-mark__comment">- display stylization</span><br>maxValue: ?number  <span class="b-block-mark__comment">- maximal value</span><br>starsConfig: ?[]  <span class="b-block-mark__comment">- config for stars</span></div><br><br><br>Simple example for default display:<br>' + sm.bDiagram.Template.base({params: {data: [{Name: 'Name1', value: 7}, {name: 'Name2', value: 3}], maxValue: 10}}, null, opt_ijData) + '<br><br>Text(display: \'text\') example:<br>' + sm.bDiagram.Template.base({params: {data: [{name: 'name1', value: '\u0427\u0442\u043E-\u0442\u043E \u0441 \u0447\u0435\u043C-\u0442\u043E 1'}, {name: 'name2', value: '\u0427\u0442\u043E-\u0442\u043E \u0431\u0435\u0437 \u0447\u0435\u0433\u043E-\u0442\u043E 2'}], display: 'text'}}, null, opt_ijData) + '<br><br>Marks(display: \'marks\') example:<br>' + sm.bDiagram.Template.base({params: {data: [{name: 'name1', value: 4.5}, {name: 'name2', value: 1.3}], display: 'marks'}}, null, opt_ijData) + '<br><br>Stars(display: \'stars\') example:<br>' + sm.bDiagram.Template.base({params: {data: [{name: 'name1', value: 4.5}, {name: 'name2', value: 1.3}], display: 'stars'}}, null, opt_ijData) + '<br><br>Bars(display: \'bars\') example:<br>' + sm.bDiagram.Template.base({params: {data: [{name: 'name1', value: 4.5, averageValue: 4, description: 'description'}, {name: 'name2', value: 1.3, averageValue: 2}], display: 'bars', maxValue: 10}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockDiagram.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockDiagram.Template.doc';
}
