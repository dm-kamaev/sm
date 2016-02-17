// This file was automatically generated from b-data-block.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlock.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bDataBlock == 'undefined') { sm.lSchool.bDataBlock = {}; }
if (typeof sm.lSchool.bDataBlock.Template == 'undefined') { sm.lSchool.bDataBlock.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlock.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bDataBlock.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlock.Template.base.soyTemplateName = 'sm.lSchool.bDataBlock.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlock.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block' + ((opt_data.params.modifier) ? ' ' + soy.$$escapeHtmlAttribute(opt_data.params.modifier) : '') + '">' + ((opt_data.params.header) ? sm.lSchool.bDataBlock.Template.header({params: {header: opt_data.params.header}}, null, opt_ijData) : '') + ((opt_data.params.content) ? sm.lSchool.bDataBlock.Template.content(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlock.Template.init.soyTemplateName = 'sm.lSchool.bDataBlock.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlock.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block__line"></div>' + ((opt_data.params.headerType == 2) ? '<h2 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h2>' : '<h3 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h3>'));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlock.Template.header.soyTemplateName = 'sm.lSchool.bDataBlock.Template.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlock.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul class="b-data-block__content">';
  var itemList2052 = opt_data.params.content;
  var itemListLen2052 = itemList2052.length;
  for (var itemIndex2052 = 0; itemIndex2052 < itemListLen2052; itemIndex2052++) {
    var itemData2052 = itemList2052[itemIndex2052];
    output += '<li class="b-data-block__item">' + soy.$$escapeHtml(itemData2052) + '</li>';
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlock.Template.content.soyTemplateName = 'sm.lSchool.bDataBlock.Template.content';
}
