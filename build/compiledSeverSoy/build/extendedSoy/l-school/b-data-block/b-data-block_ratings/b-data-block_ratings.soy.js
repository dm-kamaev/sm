// This file was automatically generated from b-data-block_ratings.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlockRatings.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bDataBlockRatings == 'undefined') { sm.lSchool.bDataBlockRatings = {}; }
if (typeof sm.lSchool.bDataBlockRatings.Template == 'undefined') { sm.lSchool.bDataBlockRatings.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockRatings.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bDataBlockRatings.Template.init({params: {header: opt_data.params.header, headerType: opt_data.params.headerType ? opt_data.params.headerType : 3, modifier: opt_data.params.modifier ? 'b-data-block_ratings' + opt_data.params.modifier : 'b-data-block_ratings', content: opt_data.params.content}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockRatings.Template.base.soyTemplateName = 'sm.lSchool.bDataBlockRatings.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockRatings.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul class="b-data-block__content">';
  var ratingList3946 = opt_data.params.content;
  var ratingListLen3946 = ratingList3946.length;
  for (var ratingIndex3946 = 0; ratingIndex3946 < ratingListLen3946; ratingIndex3946++) {
    var ratingData3946 = ratingList3946[ratingIndex3946];
    output += sm.lSchool.bDataBlockRatings.Template.ratingItem_({params: {name: ratingData3946.name, place: ratingData3946.place, href: ratingData3946.href}}, null, opt_ijData);
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockRatings.Template.content.soyTemplateName = 'sm.lSchool.bDataBlockRatings.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockRatings.Template.ratingItem_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((((opt_data.params == null) ? null : opt_data.params.name) != '\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u00AB\u041C\u0435\u043B\u0430\u00BB') ? '<li class="b-data-block__item"><div class="b-data-block__place-wrapper"><div class="b-data-block__place-value">' + soy.$$escapeHtml(opt_data.params.place) + '</div></div>' + ((opt_data.params.href) ? '<a  class="b-data-block__item-content b-data-block__item-content_text-color_red" href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.href)) + '">' + soy.$$escapeHtml(opt_data.params.name) + '</a>' : '<div class="b-data-block__item-content">' + soy.$$escapeHtml(opt_data.params.name) + '</div>') + '</li>' : '');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockRatings.Template.ratingItem_.soyTemplateName = 'sm.lSchool.bDataBlockRatings.Template.ratingItem_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockRatings.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block__line"></div><h3 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h3>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockRatings.Template.header.soyTemplateName = 'sm.lSchool.bDataBlockRatings.Template.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockRatings.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block' + ((opt_data.params.modifier) ? ' ' + soy.$$escapeHtmlAttribute(opt_data.params.modifier) : '') + '">' + ((opt_data.params.header) ? sm.lSchool.bDataBlockRatings.Template.header({params: {header: opt_data.params.header}}, null, opt_ijData) : '') + ((opt_data.params.content) ? sm.lSchool.bDataBlockRatings.Template.content(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockRatings.Template.init.soyTemplateName = 'sm.lSchool.bDataBlockRatings.Template.init';
}
