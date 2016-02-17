// This file was automatically generated from b-data-block_links.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlockLinks.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bDataBlockLinks == 'undefined') { sm.lSchool.bDataBlockLinks = {}; }
if (typeof sm.lSchool.bDataBlockLinks.Template == 'undefined') { sm.lSchool.bDataBlockLinks.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockLinks.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bDataBlockLinks.Template.init({params: {modifier: opt_data.params.modifier ? 'b-data-block_links' + opt_data.params.modifier : 'b-data-block_links', headerType: opt_data.params.headerType, header: opt_data.params.header, content: opt_data.params.content}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockLinks.Template.base.soyTemplateName = 'sm.lSchool.bDataBlockLinks.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockLinks.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul class="b-data-block__content">';
  var linkItemList3906 = opt_data.params.content;
  var linkItemListLen3906 = linkItemList3906.length;
  for (var linkItemIndex3906 = 0; linkItemIndex3906 < linkItemListLen3906; linkItemIndex3906++) {
    var linkItemData3906 = linkItemList3906[linkItemIndex3906];
    output += '<li class="b-data-block__item"><a class="b-data-block__item-content_text-color_red b-data-block__item-content" href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(linkItemData3906.href)) + '">' + soy.$$escapeHtml(linkItemData3906.name) + '</a></li>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockLinks.Template.content.soyTemplateName = 'sm.lSchool.bDataBlockLinks.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockLinks.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block' + ((opt_data.params.modifier) ? ' ' + soy.$$escapeHtmlAttribute(opt_data.params.modifier) : '') + '">' + ((opt_data.params.header) ? sm.lSchool.bDataBlockLinks.Template.header({params: {header: opt_data.params.header}}, null, opt_ijData) : '') + ((opt_data.params.content) ? sm.lSchool.bDataBlockLinks.Template.content(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockLinks.Template.init.soyTemplateName = 'sm.lSchool.bDataBlockLinks.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockLinks.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block__line"></div>' + ((opt_data.params.headerType == 2) ? '<h2 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h2>' : '<h3 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h3>'));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockLinks.Template.header.soyTemplateName = 'sm.lSchool.bDataBlockLinks.Template.header';
}
