// This file was automatically generated from b-data-block_information.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlockInformation.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bDataBlockInformation == 'undefined') { sm.lSchool.bDataBlockInformation = {}; }
if (typeof sm.lSchool.bDataBlockInformation.Template == 'undefined') { sm.lSchool.bDataBlockInformation.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockInformation.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bDataBlockInformation.Template.init({params: {modifier: opt_data.params.modifier ? 'b-data-block_information' + opt_data.params.modifier : 'b-data-block_information', content: opt_data.params.content}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockInformation.Template.base.soyTemplateName = 'sm.lSchool.bDataBlockInformation.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockInformation.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul class="b-data-block__content">' + ((opt_data.params.content.classes != '') ? '<li class="b-data-block__item">' + soy.$$escapeHtml(opt_data.params.content.classes) + '</li>' : '') + ((opt_data.params.content.kindergarten != '') ? '<li class="b-data-block__item">' + soy.$$escapeHtml(opt_data.params.content.kindergarten) + '</li>' : '') + ((opt_data.params.content.extendedDayCost != '') ? '<li class="b-data-block__item">' + soy.$$escapeHtml(opt_data.params.content.extendedDayCost) + '</li>' : '') + ((opt_data.params.content.dressCode == true) ? '<li class="b-data-block__item">\u0428\u043A\u043E\u043B\u044C\u043D\u0430\u044F \u0444\u043E\u0440\u043C\u0430 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430</li>' : '') + ((opt_data.params.content.directorName != '') ? '<li class="b-data-block__item">\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440 &mdash; ' + soy.$$escapeHtml(opt_data.params.content.directorName) + '</li>' : '') + '</ul>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockInformation.Template.content.soyTemplateName = 'sm.lSchool.bDataBlockInformation.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockInformation.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block' + ((opt_data.params.modifier) ? ' ' + soy.$$escapeHtmlAttribute(opt_data.params.modifier) : '') + '">' + ((opt_data.params.header) ? sm.lSchool.bDataBlockInformation.Template.header({params: {header: opt_data.params.header}}, null, opt_ijData) : '') + ((opt_data.params.content) ? sm.lSchool.bDataBlockInformation.Template.content(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockInformation.Template.init.soyTemplateName = 'sm.lSchool.bDataBlockInformation.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockInformation.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block__line"></div>' + ((opt_data.params.headerType == 2) ? '<h2 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h2>' : '<h3 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h3>'));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockInformation.Template.header.soyTemplateName = 'sm.lSchool.bDataBlockInformation.Template.header';
}
