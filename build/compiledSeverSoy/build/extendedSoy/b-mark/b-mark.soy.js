// This file was automatically generated from b-mark.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bMark.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bMark == 'undefined') { sm.bMark = {}; }
if (typeof sm.bMark.Template == 'undefined') { sm.bMark.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bMark.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var value__soy462 = Math.round(opt_data.params.value * 10) / 10;
  var color__soy463 = '' + ((value__soy462 >= 4) ? 'green' : (value__soy462 >= 3) ? 'yellow' : (value__soy462 > 0) ? 'red' : 'grey');
  color__soy463 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(color__soy463);
  output += '<div class="b-mark b-mark_' + soy.$$escapeHtmlAttribute(color__soy463) + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.display) == 'inline' ? 'b-mark_inline' : '') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.display) == 'number' ? 'b-mark_number' : '') + ' ' + ((opt_data.params.config) ? soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.config.bigText) ? 'b-mark_bigText' : '') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.config.bigText) ? 'b-mark_no-dash' : '') : '') + '">' + ((((opt_data.params == null) ? null : opt_data.params.display) == 'inline') ? sm.bMark.Template.inline({params: {value: value__soy462, config: opt_data.params.config}}, null, opt_ijData) : (((opt_data.params == null) ? null : opt_data.params.display) == 'stars') ? sm.bMark.Template.stars({params: {value: value__soy462, starsConfig: opt_data.params.starsConfig}}, null, opt_ijData) : (((opt_data.params == null) ? null : opt_data.params.display) == 'number') ? sm.bMark.Template.number({params: {value: value__soy462}}, null, opt_ijData) : sm.bMark.Template.simple({params: {value: value__soy462}}, null, opt_ijData)) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bMark.Template.base.soyTemplateName = 'sm.bMark.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bMark.Template.simple = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-mark__circle"><div class="b-mark__mark">' + sm.bMark.Template.value(opt_data, null, opt_ijData) + '</div></div>');
};
if (goog.DEBUG) {
  sm.bMark.Template.simple.soyTemplateName = 'sm.bMark.Template.simple';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bMark.Template.inline = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-mark__circle"></div><div class="b-mark__mark">' + sm.bMark.Template.value(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.bMark.Template.inline.soyTemplateName = 'sm.bMark.Template.inline';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bMark.Template.stars = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bStars.Template.base({params: {data: {mark: opt_data.params.value}, config: opt_data.params.starsConfig}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.bMark.Template.stars.soyTemplateName = 'sm.bMark.Template.stars';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bMark.Template.number = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-mark__mark">' + sm.bMark.Template.value({params: {value: opt_data.params.value}}, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.bMark.Template.number.soyTemplateName = 'sm.bMark.Template.number';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bMark.Template.value = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((opt_data.params.value > 0) ? soy.$$escapeHtml(Math.floor(opt_data.params.value)) + ((Math.floor(opt_data.params.value) != opt_data.params.value) ? ',' + soy.$$escapeHtml(Math.round((opt_data.params.value - Math.floor(opt_data.params.value)) * 10)) : '') : (opt_data.params.config) ? soy.$$escapeHtml(((opt_data.params == null) ? null : opt_data.params.config.notShowDashes) ? '' : '\u2014') : '\u2014');
};
if (goog.DEBUG) {
  sm.bMark.Template.value.soyTemplateName = 'sm.bMark.Template.value';
}
