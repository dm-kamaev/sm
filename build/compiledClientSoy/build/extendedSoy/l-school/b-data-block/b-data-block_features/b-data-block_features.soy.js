// This file was automatically generated from b-data-block_features.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlockFeatures.Template.
 */

goog.provide('sm.lSchool.bDataBlockFeatures.Template');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFeatures.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bDataBlockFeatures.Template.init({params: {header: opt_data.params.header, headerType: opt_data.params.headerType ? opt_data.params.headerType : 2, modifier: opt_data.params.modifier ? 'b-data-block_features' + opt_data.params.modifier : 'b-data-block_features', content: opt_data.params.content}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFeatures.Template.base.soyTemplateName = 'sm.lSchool.bDataBlockFeatures.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFeatures.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul class="b-data-block__content">';
  var featureList3755 = opt_data.params.content;
  var featureListLen3755 = featureList3755.length;
  for (var featureIndex3755 = 0; featureIndex3755 < featureListLen3755; featureIndex3755++) {
    var featureData3755 = featureList3755[featureIndex3755];
    output += '<li class="b-data-block__item"><div class="b-data-block__dash">\u2014</div>' + soy.$$escapeHtml(featureData3755) + '</li>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFeatures.Template.content.soyTemplateName = 'sm.lSchool.bDataBlockFeatures.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFeatures.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block' + ((opt_data.params.modifier) ? ' ' + soy.$$escapeHtmlAttribute(opt_data.params.modifier) : '') + '">' + ((opt_data.params.header) ? sm.lSchool.bDataBlockFeatures.Template.header({params: {header: opt_data.params.header}}, null, opt_ijData) : '') + ((opt_data.params.content) ? sm.lSchool.bDataBlockFeatures.Template.content(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFeatures.Template.init.soyTemplateName = 'sm.lSchool.bDataBlockFeatures.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFeatures.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block__line"></div>' + ((opt_data.params.headerType == 2) ? '<h2 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h2>' : '<h3 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h3>'));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFeatures.Template.header.soyTemplateName = 'sm.lSchool.bDataBlockFeatures.Template.header';
}
