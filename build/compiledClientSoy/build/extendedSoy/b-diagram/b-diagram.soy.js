// This file was automatically generated from b-diagram.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bDiagram.Template.
 */

goog.provide('sm.bDiagram.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.bMark.Template');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bDiagram.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="b-diagram ' + soy.$$escapeHtmlAttribute(opt_data.params.display ? 'b-diagram_' + opt_data.params.display : '') + '" data-max-value="' + soy.$$escapeHtmlAttribute(opt_data.params.maxValue != null ? opt_data.params.maxValue : 1) + '">';
  var itemList38 = opt_data.params.data;
  var itemListLen38 = itemList38.length;
  for (var itemIndex38 = 0; itemIndex38 < itemListLen38; itemIndex38++) {
    var itemData38 = itemList38[itemIndex38];
    output += '<div class="b-diagram__item"><div class="b-diagram__label">' + soy.$$escapeHtml(itemData38.name) + ((itemData38.description) ? '<div class="b-diagram__item-description">' + soy.$$escapeHtml(itemData38.description) + '</div>' : '') + '</div>' + ((((opt_data.params == null) ? null : opt_data.params.display) == 'bars') ? '<div class="b-diagram__number-value">' + soy.$$escapeHtml(Math.round(itemData38.value)) + '</div>' : '') + '<div class="b-diagram__value">' + ((((opt_data.params == null) ? null : opt_data.params.display) == 'marks') ? sm.bMark.Template.base({params: {value: itemData38.value, display: 'inline'}}, null, opt_ijData) : (((opt_data.params == null) ? null : opt_data.params.display) == 'stars') ? sm.bMark.Template.base({params: {value: itemData38.value, display: 'stars', starsConfig: opt_data.params.starsConfig != null ? opt_data.params.starsConfig : {style: {size: 'large'}}}}, null, opt_ijData) : (((opt_data.params == null) ? null : opt_data.params.display) == 'text') ? soy.$$escapeHtml(itemData38.value) : (((opt_data.params == null) ? null : opt_data.params.display) == 'bars') ? sm.bDiagram.Template.bars({params: {value: Math.round(itemData38.value), averageValue: itemData38.averageValue, description: itemData38.description, maxValue: opt_data.params.maxValue, range: opt_data.params.range}}, null, opt_ijData) : sm.bDiagram.Template.default({params: {value: itemData38.value, maxValue: opt_data.params.maxValue}}, null, opt_ijData)) + '</div></div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bDiagram.Template.base.soyTemplateName = 'sm.bDiagram.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bDiagram.Template.default = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-diagram__bar-filled" data-value="' + soy.$$escapeHtmlAttribute(opt_data.params.value) + '" style="width: ' + soy.$$escapeHtmlAttribute(soy.$$filterCssValue(opt_data.params.value * 100 / opt_data.params.maxValue + '%')) + ';"></div><div class="b-diagram__bar" style="width: ' + soy.$$escapeHtmlAttribute(soy.$$filterCssValue((opt_data.params.maxValue - opt_data.params.value) * 100 / opt_data.params.maxValue + '%')) + ';"></div>');
};
if (goog.DEBUG) {
  sm.bDiagram.Template.default.soyTemplateName = 'sm.bDiagram.Template.default';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bDiagram.Template.bars = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var range__soy80 = ((opt_data.params == null) ? null : opt_data.params.range) != null ? ((opt_data.params == null) ? null : opt_data.params.range) : 0;
  output += '<div class="b-diagram__bar-filled' + soy.$$escapeHtmlAttribute(opt_data.params.value < opt_data.params.averageValue - range__soy80 ? ' b-diagram__bar-filled_red' : opt_data.params.value > opt_data.params.averageValue + range__soy80 ? ' b-diagram__bar-filled_green' : '') + '" data-value="' + soy.$$escapeHtmlAttribute(opt_data.params.value) + '" style="width: ' + soy.$$escapeHtmlAttribute(soy.$$filterCssValue(opt_data.params.value * 100 / opt_data.params.maxValue + '%')) + ';"></div><div class="b-diagram__bar" style="width: ' + soy.$$escapeHtmlAttribute(soy.$$filterCssValue((opt_data.params.maxValue - opt_data.params.value) * 100 / opt_data.params.maxValue + '%')) + ';"></div><div class="b-diagram__under-bar" style="width: ' + soy.$$escapeHtmlAttribute(soy.$$filterCssValue(opt_data.params.averageValue * 100 / opt_data.params.maxValue + '%')) + ';"></div><div class="b-diagram__circle"></div><div class="b-diagram__tooltip" style="left: ' + soy.$$escapeHtmlAttribute(soy.$$filterCssValue(opt_data.params.value * 100 / opt_data.params.maxValue + '%')) + ';"><div class="b-diagram__tooltip-arrow"></div><div class="b-diagram__tooltip-description"><div class="b-diagram__tooltip-arrow-shadow"></div><div class="b-diagram__tooltip-content"><div class="b-diagram__tooltip-mark">' + soy.$$escapeHtml(opt_data.params.value) + '<br><span class="b-diagram__tooltip-bold-text">';
  var lastDigit__soy96 = opt_data.params.value / 10 - Math.floor(opt_data.params.value / 10);
  var tenDigit__soy97 = opt_data.params.value / 100 - Math.floor(opt_data.params.value / 100);
  output += ((tenDigit__soy97 * 100 - lastDigit__soy96 * 10 == 1 || lastDigit__soy96 * 10 > 4 || lastDigit__soy96 == 0) ? '\u0431\u0430\u043B\u043B\u043E\u0432' : (lastDigit__soy96 * 10 > 1) ? '\u0431\u0430\u043B\u043B\u0430' : '\u0431\u0430\u043B\u043B ' + soy.$$escapeHtml(lastDigit__soy96)) + '</span></div><div class="b-diagram__tooltip-average-mark">\u0412 \u0441\u0440\u0435\u0434\u043D\u0435\u043C \u043F\u043E \u041C\u043E\u0441\u043A\u0432\u0435 \u2014<br><span class="b-diagram__tooltip-bold-text">' + soy.$$escapeHtml(opt_data.params.averageValue) + ' ';
  var lDigit__soy109 = opt_data.params.averageValue / 10 - Math.floor(opt_data.params.averageValue / 10);
  var tDigit__soy110 = opt_data.params.averageValue / 100 - Math.floor(opt_data.params.averageValue / 100);
  output += ((tDigit__soy110 * 100 - lDigit__soy109 * 10 == 1 || lDigit__soy109 * 10 > 4) ? '\u0431\u0430\u043B\u043B\u043E\u0432' : (lDigit__soy109 * 10 > 1) ? '\u0431\u0430\u043B\u043B\u0430' : '\u0431\u0430\u043B\u043B') + '</span></div></div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bDiagram.Template.bars.soyTemplateName = 'sm.bDiagram.Template.bars';
}
