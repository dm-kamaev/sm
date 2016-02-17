// This file was automatically generated from b-badge.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bBadge.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bBadge == 'undefined') { sm.bBadge = {}; }
if (typeof sm.bBadge.Template == 'undefined') { sm.bBadge.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bBadge.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="b-badge"><div class="b-badge__icon ' + soy.$$escapeHtmlAttribute(opt_data.params.display == 'metro' ? 'b-icon_img_metro' : 'b-badge_star') + '">' + soy.$$escapeHtml(opt_data.params.display == 'metro' ? '' : 't') + '</div><div class="b-badge__content">';
  var dataItemList8 = opt_data.params.data;
  var dataItemListLen8 = dataItemList8.length;
  for (var dataItemIndex8 = 0; dataItemIndex8 < dataItemListLen8; dataItemIndex8++) {
    var dataItemData8 = dataItemList8[dataItemIndex8];
    output += ((((opt_data.params == null) ? null : opt_data.params.display) == 'metro') ? sm.bBadge.Template.metroItem_({params: {station: dataItemData8}}, null, opt_ijData) : sm.bBadge.Template.ratingItem_({params: {ratingName: dataItemData8}}, null, opt_ijData)) + ((! (dataItemIndex8 == dataItemListLen8 - 1)) ? ', ' : '');
  }
  output += '</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bBadge.Template.base.soyTemplateName = 'sm.bBadge.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bBadge.Template.metroItem_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<a href="/search?name=\u043C\u0435\u0442\u0440\u043E%20' + soy.$$escapeUri(opt_data.params.station) + '" class="b-badge__item b-badge__item_active">' + soy.$$escapeHtml(opt_data.params.station) + '</a>');
};
if (goog.DEBUG) {
  sm.bBadge.Template.metroItem_.soyTemplateName = 'sm.bBadge.Template.metroItem_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bBadge.Template.ratingItem_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-badge__item">' + soy.$$escapeHtml(opt_data.params.ratingName) + '</div>');
};
if (goog.DEBUG) {
  sm.bBadge.Template.ratingItem_.soyTemplateName = 'sm.bBadge.Template.ratingItem_';
}
// This file was automatically generated from b-diagram.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bDiagram.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bDiagram == 'undefined') { sm.bDiagram = {}; }
if (typeof sm.bDiagram.Template == 'undefined') { sm.bDiagram.Template = {}; }


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
// This file was automatically generated from b-header.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bHeader.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bHeader == 'undefined') { sm.bHeader = {}; }
if (typeof sm.bHeader.Template == 'undefined') { sm.bHeader.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bHeader.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-header"><div class="b-header__body">' + ((! opt_data.params.notShowLink) ? '<div class="b-header__link-search">' + sm.bLink.Template.base({params: {data: {name: '\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u0448\u043A\u043E\u043B', url: '/search'}}}, null, opt_ijData) + '</div>' : '') + '<div class="b-header__main"><div class="b-header__wrap"><div class="b-header__title"><span class="b-header__stars"><span class="b-header__star b-header__star_first">t</span><span class="b-header__star b-header__star_second">t</span><span class="b-header__star b-header__star_third">t</span><span class="b-header__star b-header__star_forth">t</span><span class="b-header__star b-header__star_fifth">t</span></span><h1 class="b-header__header">' + ((opt_data.params.url) ? '<a class="b-header__link" href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.url)) + '">\u0448\u043A\u043E\u043B\u044B \u00AB\u043C\u0435\u043B\u0430\u00BB</a>' : '\u0448\u043A\u043E\u043B\u044B \u00AB\u043C\u0435\u043B\u0430\u00BB') + '</h1><span class="b-header__stars"><span class="b-header__star b-header__star_fifth">t</span><span class="b-header__star b-header__star_forth">t</span><span class="b-header__star b-header__star_third">t</span><span class="b-header__star b-header__star_second">t</span><span class="b-header__star b-header__star_first">t</span></span></div></div></div>' + ((opt_data.params.url) ? '<div class="b-header__search">' + sm.bSearch.Template.base({params: {placeholder: '\u041D\u0430\u0439\u0442\u0438 \u0448\u043A\u043E\u043B\u0443', text: (opt_data.params == null) ? null : opt_data.params.searchText, theme: 'min', redirect: (opt_data.params == null) ? null : opt_data.params.searchRedirect, templates: {search: (opt_data.params == null) ? null : opt_data.params.templates.search, item: (opt_data.params == null) ? null : opt_data.params.templates.item, text: (opt_data.params == null) ? null : opt_data.params.templates.text, value: (opt_data.params == null) ? null : opt_data.params.templates.value}}}, null, opt_ijData) + '</div>' : '') + '</div></div>');
};
if (goog.DEBUG) {
  sm.bHeader.Template.base.soyTemplateName = 'sm.bHeader.Template.base';
}
// This file was automatically generated from b-icon.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bIcon.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bIcon == 'undefined') { sm.bIcon = {}; }
if (typeof sm.bIcon.Template == 'undefined') { sm.bIcon.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bIcon.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-icon"><div class="b-icon__content ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.spriteCssClass) != null ? ((opt_data.params == null) ? null : opt_data.params.spriteCssClass) : '') + '"></div></div>');
};
if (goog.DEBUG) {
  sm.bIcon.Template.base.soyTemplateName = 'sm.bIcon.Template.base';
}
// This file was automatically generated from b-icon.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.bIcon.IconTemplate.
 */

if (typeof gorod == 'undefined') { var gorod = {}; }
if (typeof gorod.bIcon == 'undefined') { gorod.bIcon = {}; }
if (typeof gorod.bIcon.IconTemplate == 'undefined') { gorod.bIcon.IconTemplate = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bIcon.IconTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(gorod.bIcon.IconTemplate.init_(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.render.soyTemplateName = 'gorod.bIcon.IconTemplate.render';
}


/**
 * @param {{
 *    params: (?)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bIcon.IconTemplate.init_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class=" b-icon' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.extraClasses) ? ' ' + opt_data.params.extraClasses : '') + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.fading) ? ' b-icon_fading' : '') + soy.$$escapeHtmlAttribute(gorod.bIcon.IconTemplate.initDefaultClasses_(opt_data, null, opt_ijData)) + soy.$$escapeHtmlAttribute(gorod.bIcon.IconTemplate.initTypeClasses_(opt_data, null, opt_ijData)) + soy.$$escapeHtmlAttribute(gorod.bIcon.IconTemplate.initStateClasses_(opt_data, null, opt_ijData)) + '" data-params=\'' + soy.$$escapeHtmlAttribute(gorod.bIcon.IconTemplate.generateJSON_(opt_data, null, opt_ijData)) + '\' ></span>');
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.init_.soyTemplateName = 'gorod.bIcon.IconTemplate.init_';
}


/**
 * @param {{
 *    params: (?|null|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bIcon.IconTemplate.initDefaultClasses_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  goog.asserts.assert(opt_data.params == null || opt_data.params != null, "expected param 'params' of type ?|null|undefined.");
  var params = /** @type {?|null|undefined} */ (opt_data.params);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((! ((params == null) ? null : params.typePressed)) ? ' b-icon_default-pressed' : '') + ((! ((params == null) ? null : params.typeHover)) ? ' b-icon_default-hover' : '') + ((! ((params == null) ? null : params.typeActive)) ? ' b-icon_default-active' : '') + ((! ((params == null) ? null : params.typeDummy)) ? ' b-icon_default-dummy' : '') + ((! ((params == null) ? null : params.typeDisabled)) ? ' b-icon_default-disabled' : ''));
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.initDefaultClasses_.soyTemplateName = 'gorod.bIcon.IconTemplate.initDefaultClasses_';
}


/**
 * @param {{
 *    params: (?|null|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bIcon.IconTemplate.initTypeClasses_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  goog.asserts.assert(opt_data.params == null || opt_data.params != null, "expected param 'params' of type ?|null|undefined.");
  var params = /** @type {?|null|undefined} */ (opt_data.params);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((((params == null) ? null : (params.state == null) ? null : params.state.disabled) && ((params == null) ? null : params.typeDisabled)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typeDisabled) : (((params == null) ? null : (params.state == null) ? null : params.state.dummy) && ((params == null) ? null : params.typeDummy)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typeDummy) : (((params == null) ? null : (params.state == null) ? null : params.state.active) && ((params == null) ? null : params.typeActive)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typeActive) : (((params == null) ? null : (params.state == null) ? null : params.state.hover) && ((params == null) ? null : params.typeHover)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typeHover) : (((params == null) ? null : (params.state == null) ? null : params.state.pressed) && ((params == null) ? null : params.typePressed)) ? ' b-icon_img_' + soy.$$escapeHtml(params.typePressed) : ' b-icon_img_' + soy.$$escapeHtml((params == null) ? null : params.type));
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.initTypeClasses_.soyTemplateName = 'gorod.bIcon.IconTemplate.initTypeClasses_';
}


/**
 * @param {{
 *    params: (?)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bIcon.IconTemplate.initStateClasses_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.pressed) ? ' b-icon_state_pressed' : '') + (((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.hover) ? ' b-icon_state_hover' : '') + (((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.active) ? ' b-icon_state_active' : '') + (((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.dummy) ? ' b-icon_state_dummy' : '') + (((opt_data.params == null) ? null : (opt_data.params.state == null) ? null : opt_data.params.state.disabled) ? ' b-icon_state_disabled' : ''));
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.initStateClasses_.soyTemplateName = 'gorod.bIcon.IconTemplate.initStateClasses_';
}


/**
 * @param {{
 *    params: (?)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bIcon.IconTemplate.generateJSON_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var jsonParams__soy217 = {'type': {'default': ((opt_data.params == null) ? null : opt_data.params.type) != null ? ((opt_data.params == null) ? null : opt_data.params.type) : '', 'pressed': ((opt_data.params == null) ? null : opt_data.params.typePressed) != null ? ((opt_data.params == null) ? null : opt_data.params.typePressed) : '', 'hover': ((opt_data.params == null) ? null : opt_data.params.typeHover) != null ? ((opt_data.params == null) ? null : opt_data.params.typeHover) : '', 'active': ((opt_data.params == null) ? null : opt_data.params.typeActive) != null ? ((opt_data.params == null) ? null : opt_data.params.typeActive) : '', 'dummy': ((opt_data.params == null) ? null : opt_data.params.typeDummy) != null ? ((opt_data.params == null) ? null : opt_data.params.typeDummy) : '', 'disabled': ((opt_data.params == null) ? null : opt_data.params.typeDisabled) != null ? ((opt_data.params == null) ? null : opt_data.params.typeDisabled) : ''}, 'state': {'pressed': ((opt_data.params.state == null) ? null : opt_data.params.state.pressed) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.pressed) : '', 'hover': ((opt_data.params.state == null) ? null : opt_data.params.state.hover) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.hover) : '', 'active': ((opt_data.params.state == null) ? null : opt_data.params.state.active) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.active) : '', 'dummy': ((opt_data.params.state == null) ? null : opt_data.params.state.dummy) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.dummy) : '', 'disabled': ((opt_data.params.state == null) ? null : opt_data.params.state.disabled) != null ? ((opt_data.params.state == null) ? null : opt_data.params.state.disabled) : ''}};
  output += soy.$$escapeHtml(gorod.iUtils.stringify({json: jsonParams__soy217}, null, opt_ijData));
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bIcon.IconTemplate.generateJSON_.soyTemplateName = 'gorod.bIcon.IconTemplate.generateJSON_';
}
// This file was automatically generated from b-input.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.bInput.InputTemplate.
 */

if (typeof gorod == 'undefined') { var gorod = {}; }
if (typeof gorod.bInput == 'undefined') { gorod.bInput = {}; }
if (typeof gorod.bInput.InputTemplate == 'undefined') { gorod.bInput.InputTemplate = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bInput.InputTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var modifier__soy222 = {'email': 'mail', 'phone': 'phone', 'password': 'key', 'name': 'user', 'lastname': 'user'};
  var stateInput__soy223 = {'default': 'gray', 'active': 'blue', 'filled': 'black', 'error': 'red', 'disabled': ((opt_data.params == null) ? null : opt_data.params.value) ? 'black' : 'gray'};
  var paramsType__soy224 = ((opt_data.params == null) ? null : opt_data.params.type) ? opt_data.params : soy.$$augmentMap(opt_data.params, {type: 'text'});
  var paramsTypeState__soy225 = ((paramsType__soy224 == null) ? null : paramsType__soy224.autofocus) ? soy.$$augmentMap(paramsType__soy224, {state: 'active'}) : paramsType__soy224;
  var paramsTypeStateToo__soy226 = ((paramsTypeState__soy225 == null) ? null : paramsTypeState__soy225.state) ? paramsTypeState__soy225 : paramsTypeState__soy225.value ? soy.$$augmentMap(paramsTypeState__soy225, {state: 'filled'}) : soy.$$augmentMap(paramsTypeState__soy225, {state: 'default'});
  var paramsEx__soy227 = {params: paramsTypeStateToo__soy226, modifier: modifier__soy222, state: stateInput__soy223};
  var hash__soy228 = '' + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.hash) ? '' + ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.hash) : '' + gorod.iUtils.ext_generateId(null, null, opt_ijData));
  hash__soy228 = soydata.$$markUnsanitizedTextForInternalBlocks(hash__soy228);
  var theme__soy234 = ' b-input_theme_' + (((opt_data.params.style == null) ? null : opt_data.params.style.theme) != null ? ((opt_data.params.style == null) ? null : opt_data.params.style.theme) : 'default');
  var size__soy235 = ' b-input_size_' + (((opt_data.params.style == null) ? null : opt_data.params.style.size) != null ? ((opt_data.params.style == null) ? null : opt_data.params.style.size) : 'medium');
  var placeholder_alias__soy236 = ! (((opt_data.params == null) ? null : opt_data.params.type) == 'text') && ! ((opt_data.params == null) ? null : opt_data.params.placeholder) ? (((opt_data.params == null) ? null : opt_data.params.type) == 'email' ? '\u0412\u0430\u0448 e-mail' : ((opt_data.params == null) ? null : opt_data.params.type) == 'phone' ? '\u0412\u0430\u0448 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D' : ((opt_data.params == null) ? null : opt_data.params.type) == 'password' ? '\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C' : ((opt_data.params == null) ? null : opt_data.params.type) == 'name' ? '\u0412\u0430\u0448\u0435 \u0438\u043C\u044F' : ((opt_data.params == null) ? null : opt_data.params.type) == 'lastname' != null ? ((opt_data.params == null) ? null : opt_data.params.type) == 'lastname' : '\u0412\u0430\u0448\u0430 \u0444\u0430\u043C\u0438\u043B\u0438\u044F') : '';
  var placeholder_alias_two__soy237 = ((opt_data.params == null) ? null : opt_data.params.placeholder) != null ? ((opt_data.params == null) ? null : opt_data.params.placeholder) : placeholder_alias__soy236;
  var errorPlaceholder__soy238 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errorPlaceholder) != null ? ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errorPlaceholder) : null;
  var errorMessage__soy239 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errors) != null ? ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errors) : null;
  var validateData__soy240 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.validate) != null ? ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.validate) : null;
  var showCnt__soy241 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.showCounter) == true;
  var placeholder__soy242 = '' + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.state) == 'error' && ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errorPlaceholder)) ? '' + ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errorPlaceholder) : ((opt_data.params == null) ? null : opt_data.params.placeholder) ? '' + ((opt_data.params == null) ? null : opt_data.params.placeholder) : '' + placeholder_alias_two__soy237);
  placeholder__soy242 = soydata.$$markUnsanitizedTextForInternalBlocks(placeholder__soy242);
  var params_customDataParams__soy252 = '';
  if ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customData) {
    var customList255 = (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customData;
    var customListLen255 = customList255.length;
    for (var customIndex255 = 0; customIndex255 < customListLen255; customIndex255++) {
      var customData255 = customList255[customIndex255];
      params_customDataParams__soy252 += ' data-' + soy.$$escapeHtml(customData255.key) + '=' + soy.$$escapeHtml(customData255.item);
    }
  }
  params_customDataParams__soy252 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(params_customDataParams__soy252);
  var customDataParams__soy261 = '' + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customDataString) ? soy.$$escapeHtml(params_customDataParams__soy252) + ' + \' \' + ' + soy.$$escapeHtml((opt_data.params == null) ? null : opt_data.params.customDataString) : '');
  customDataParams__soy261 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(customDataParams__soy261);
  var classList__soy267 = '' + soy.$$escapeHtml(theme__soy234) + soy.$$escapeHtml(size__soy235) + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.autofocus) ? ' b-input_focus ' : '') + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.state) == 'error' ? ' b-input_error ' : '') + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.showCounter) ? ' b-input__margin-bottom ' : '') + ' ' + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customClasses) ? ((paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.customClasses) : '') + soy.$$escapeHtml(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'hidden' ? ' i-utils__hidden ' : '');
  classList__soy267 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(classList__soy267);
  var inputSize__soy276 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : (paramsEx__soy227.params.style == null) ? null : paramsEx__soy227.params.style.size) ? ' b-input__input_size_' + ((paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.style.size) : ' b-input__input_size_medium';
  var inputPadding__soy277 = '' + ((! (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'text') || ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : (paramsEx__soy227.params.iconLeft == null) ? null : paramsEx__soy227.params.iconLeft.type)) ? ' b-input__input_padding-left' : '') + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'password' || ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'text' && ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : (paramsEx__soy227.params.iconRight == null) ? null : paramsEx__soy227.params.iconRight.type)) ? ' b-input__input_padding-right' : '');
  inputPadding__soy277 = soydata.$$markUnsanitizedTextForInternalBlocks(inputPadding__soy277);
  var valueInput__soy284 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.value) ? ((paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.value) : '';
  var validateParam__soy285 = {'hash': hash__soy228, 'message': (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.errors};
  if (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'hidden') {
    output += '<input type="hidden" name="' + soy.$$escapeHtmlAttribute((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.name) + '" value="' + soy.$$escapeHtmlAttribute(valueInput__soy284) + '" class="b-input__input  ' + soy.$$escapeHtmlAttribute(classList__soy267) + '" >';
  } else {
    output += '<div class="b-input ' + soy.$$escapeHtmlAttribute(classList__soy267) + '" data-params=\'' + soy.$$escapeHtmlAttribute(gorod.iUtils.stringify({json: {'type': (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type, 'validate': validateData__soy240, 'placeholder': placeholder_alias_two__soy237, 'errorPlaceholder': errorPlaceholder__soy238, 'errorMessage': errorMessage__soy239, 'showCounter': showCnt__soy241, 'maxCount': (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.maxlength, 'theme': theme__soy234}}, null, opt_ijData)) + '\' ' + soy.$$filterHtmlAttributes(customDataParams__soy261) + '>' + ((! (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'text')) ? '<span class="b-input__icon-position b-input__icon-position_left ">' + gorod.bInput.InputTemplate.bInputNativeIcons_({paramsEx: paramsEx__soy227}, null, opt_ijData) + '</span>' : ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : (paramsEx__soy227.params.iconLeft == null) ? null : paramsEx__soy227.params.iconLeft.type) ? '<span class="b-input__icon-position b-input__icon-position_left">' + gorod.bIcon.IconTemplate.render({params: (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.iconLeft}, null, opt_ijData) + '</span>' : '');
    var type__soy315 = ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'password' ? 'password' : 'text';
    output += '<input type="' + soy.$$escapeHtmlAttribute(type__soy315) + '" name="' + soy.$$escapeHtmlAttribute(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.name) != null ? ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.name) : '') + '" value="' + soy.$$escapeHtmlAttribute(valueInput__soy284) + '" placeholder="' + soy.$$escapeHtmlAttribute(placeholder__soy242) + '" class="b-input__input' + soy.$$escapeHtmlAttribute(inputSize__soy276) + ' ' + soy.$$escapeHtmlAttribute(inputPadding__soy277) + soy.$$escapeHtmlAttribute(((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.showCounter) ? ' i-countdown-field' : '') + '"' + ((hash__soy228) ? ' data-validate-hash="' + soy.$$escapeHtmlAttribute(hash__soy228) + '" ' : '') + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.autofocus) ? ' autofocus="true" ' : '') + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.autocomplete) == false || ! ((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.autocomplete)) ? 'autocomplete="off"' : '') + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.maxlength) ? 'maxlength="' + soy.$$escapeHtmlAttribute((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.maxlength) + '"' : '') + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.state) == 'disabled') ? 'disabled="disabled"' : '') + '/>' + ((((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'password') ? '<span class="b-input__icon-position b-input__icon-position_right">' + gorod.bInput.InputTemplate.bInputTypePasswordIcons_(null, null, opt_ijData) + '</span>' : (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.type) == 'text' && ((opt_data.params == null) ? null : (opt_data.params.iconRight == null) ? null : opt_data.params.iconRight.type)) ? '<span class="b-input__icon-position b-input__icon-position_right">' + gorod.bIcon.IconTemplate.render({params: (paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.iconRight}, null, opt_ijData) + '</span>' : '') + (((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.showCounter) ? '<div class=\'i-countdown-text b-input__counter b-input__counter-color\'>' + soy.$$escapeHtml((paramsEx__soy227 == null) ? null : (paramsEx__soy227.params == null) ? null : paramsEx__soy227.params.maxlength) + '</div>' : '') + '<div class="b-input__errors ">' + gorod.ValidateTemplate.render({params: validateParam__soy285}, null, opt_ijData) + '</div></div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bInput.InputTemplate.render.soyTemplateName = 'gorod.bInput.InputTemplate.render';
}


/**
 * @param {{
 *    paramsEx: (?)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bInput.InputTemplate.bInputNativeIcons_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var modifier__soy370 = (opt_data.paramsEx == null) ? null : opt_data.paramsEx.modifier[(opt_data.paramsEx == null) ? null : (opt_data.paramsEx.params == null) ? null : opt_data.paramsEx.params.type];
  var stateList371 = soy.$$getMapKeys((opt_data.paramsEx == null) ? null : opt_data.paramsEx.state);
  var stateListLen371 = stateList371.length;
  for (var stateIndex371 = 0; stateIndex371 < stateListLen371; stateIndex371++) {
    var stateData371 = stateList371[stateIndex371];
    output += '<div class="b-input__icon b-input__icon-' + soy.$$escapeHtmlAttribute(stateData371) + ' ' + soy.$$escapeHtmlAttribute(opt_data.paramsEx.params.state != stateData371 ? 'i-utils__hidden' : '') + '">' + gorod.bIcon.IconTemplate.render({params: {'type': modifier__soy370 + '_' + ((opt_data.paramsEx == null) ? null : opt_data.paramsEx.state[stateData371])}}, null, opt_ijData) + '</div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bInput.InputTemplate.bInputNativeIcons_.soyTemplateName = 'gorod.bInput.InputTemplate.bInputNativeIcons_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bInput.InputTemplate.bInputTypePasswordIcons_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var states__soy382 = ['default', 'active'];
  var gray__soy383 = {'type': 'eye_gray'};
  var black__soy384 = {'type': 'eye_black'};
  output += '<div class="b-input__icon-pswd b-input__icon-pswd-default">' + gorod.bIcon.IconTemplate.render({params: gray__soy383}, null, opt_ijData) + '</div><div class="b-input__icon-pswd b-input__icon-pswd-bold i-utils__hidden">' + gorod.bIcon.IconTemplate.render({params: black__soy384}, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bInput.InputTemplate.bInputTypePasswordIcons_.soyTemplateName = 'gorod.bInput.InputTemplate.bInputTypePasswordIcons_';
}
// This file was automatically generated from b-link.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bLink.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bLink == 'undefined') { sm.bLink = {}; }
if (typeof sm.bLink.Template == 'undefined') { sm.bLink.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bLink.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<a href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.data.url)) + '" class="b-link">' + soy.$$escapeHtml(opt_data.params.data.name) + '</a>');
};
if (goog.DEBUG) {
  sm.bLink.Template.base.soyTemplateName = 'sm.bLink.Template.base';
}
// This file was automatically generated from b-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.bList.ListTemplate.
 */

if (typeof gorod == 'undefined') { var gorod = {}; }
if (typeof gorod.bList == 'undefined') { gorod.bList = {}; }
if (typeof gorod.bList.ListTemplate == 'undefined') { gorod.bList.ListTemplate = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul class="b-list b-list_' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.theme) ? opt_data.params.theme : 'default') + '-theme b-list_color_' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.color) != null ? ((opt_data.params == null) ? null : opt_data.params.color) : 'blue') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.extraClasses) != null ? ((opt_data.params == null) ? null : opt_data.params.extraClasses) : '') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.customClassesForMaxHeight) != null ? ((opt_data.params == null) ? null : opt_data.params.customClassesForMaxHeight) : '') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.customClassesForMaxHeight) ? 'b-list_max-height' : '') + ' ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.uppercase) ? 'b-bouton_uppercase' : '') + ' b-list_hover_' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.selectOnHover) ? 'off' : 'on') + '" data-params="' + soy.$$escapeHtmlAttribute(gorod.iUtils.stringify({json: {'initialSelectedIndex': ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) ? Math.floor((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) : null, 'selectOnHover': ((opt_data.params == null) ? null : opt_data.params.selectOnHover) != null ? ((opt_data.params == null) ? null : opt_data.params.selectOnHover) : null, 'selectOnClick': ((opt_data.params == null) ? null : opt_data.params.selectOnClick) != null ? ((opt_data.params == null) ? null : opt_data.params.selectOnClick) : null}}, null, opt_ijData)) + '">' + gorod.bList.ListTemplate.init_(opt_data, null, opt_ijData) + '</ul>');
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.render.soyTemplateName = 'gorod.bList.ListTemplate.render';
}


/**
 * @param {{
 *    params: (?)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.init_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var itemList423 = (opt_data.params == null) ? null : opt_data.params.list;
  var itemListLen423 = itemList423.length;
  for (var itemIndex423 = 0; itemIndex423 < itemListLen423; itemIndex423++) {
    var itemData423 = itemList423[itemIndex423];
    output += ((itemData423 == null) ? null : itemData423.href) ? gorod.bList.ListTemplate.drawLink_({item: itemData423, isSelected: ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) == 0 && itemIndex423 == 0 ? true : ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) + 1 == itemIndex423 ? true : false}, null, opt_ijData) : ((itemData423 == null) ? null : itemData423.text) ? gorod.bList.ListTemplate.drawControl_({item: itemData423, isSelected: ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) == 0 && itemIndex423 == 0 ? true : ((opt_data.params == null) ? null : opt_data.params.initialSelectedIndex) + 1 == itemIndex423 ? true : false}, null, opt_ijData) : gorod.bList.ListTemplate.drawHR_(null, null, opt_ijData);
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.init_.soyTemplateName = 'gorod.bList.ListTemplate.init_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.drawHR_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li class="b-list__hr"></li>');
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.drawHR_.soyTemplateName = 'gorod.bList.ListTemplate.drawHR_';
}


/**
 * @param {{
 *    item: (?),
 *    isSelected: boolean
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.drawLink_ = function(opt_data, opt_ignored, opt_ijData) {
  goog.asserts.assert(goog.isBoolean(opt_data.isSelected) || opt_data.isSelected === 1 || opt_data.isSelected === 0, "expected param 'isSelected' of type boolean.");
  var isSelected = /** @type {boolean} */ (!!opt_data.isSelected);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li class="b-list__item b-list__item_link ' + soy.$$escapeHtmlAttribute(((opt_data.item == null) ? null : opt_data.item.extraClasses) != null ? ((opt_data.item == null) ? null : opt_data.item.extraClasses) : '') + ' ' + soy.$$escapeHtmlAttribute(isSelected == true ? 'b-list__item_selected' : '') + '"><a class="b-list__link" href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri((opt_data.item == null) ? null : opt_data.item.href)) + '">' + soy.$$escapeHtml((opt_data.item == null) ? null : opt_data.item.text) + '</a></li>');
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.drawLink_.soyTemplateName = 'gorod.bList.ListTemplate.drawLink_';
}


/**
 * @param {{
 *    item: (?),
 *    isSelected: boolean
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.bList.ListTemplate.drawControl_ = function(opt_data, opt_ignored, opt_ijData) {
  goog.asserts.assert(goog.isBoolean(opt_data.isSelected) || opt_data.isSelected === 1 || opt_data.isSelected === 0, "expected param 'isSelected' of type boolean.");
  var isSelected = /** @type {boolean} */ (!!opt_data.isSelected);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li class="b-list__item ' + soy.$$escapeHtmlAttribute(((opt_data.item == null) ? null : opt_data.item.extraClasses) != null ? ((opt_data.item == null) ? null : opt_data.item.extraClasses) : '') + ' ' + soy.$$escapeHtmlAttribute(isSelected == true ? 'b-list__item_selected' : '') + '">' + (((opt_data.item == null) ? null : opt_data.item.text) ? soy.$$escapeHtml(opt_data.item.text) : '') + '</li>');
};
if (goog.DEBUG) {
  gorod.bList.ListTemplate.drawControl_.soyTemplateName = 'gorod.bList.ListTemplate.drawControl_';
}
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
// This file was automatically generated from b-popular-schools.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bPopularSchools.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bPopularSchools == 'undefined') { sm.bPopularSchools = {}; }
if (typeof sm.bPopularSchools.Template == 'undefined') { sm.bPopularSchools.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bPopularSchools.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="b-popular-schools"><div class="b-popular-schools__title">\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0448\u043A\u043E\u043B\u044B</div>';
  var schoolList533 = (opt_data.params == null) ? null : opt_data.params.popularSchools;
  var schoolListLen533 = schoolList533.length;
  for (var schoolIndex533 = 0; schoolIndex533 < schoolListLen533; schoolIndex533++) {
    var schoolData533 = schoolList533[schoolIndex533];
    output += '<a class="b-popular-schools__school-link" href="/school/' + soy.$$escapeHtmlAttribute(schoolData533.url) + '"><div class="b-popular-schools__school' + ((schoolIndex533 == schoolListLen533 - 1) ? ' b-popular-schools__school_last' : '') + '"><div class="b-popular-schools__school-rating">' + sm.bMark.Template.base({params: {value: schoolData533.totalScore}}, null, opt_ijData) + '</div><div class="b-popular-schools__school-name">' + soy.$$escapeHtml(schoolData533.name) + '</div>' + ((schoolData533.description) ? '<div class="b-popular-schools__school-description">' + soy.$$escapeHtml(schoolData533.description) + '</div>' : '');
    if (((schoolData533 == null) ? null : schoolData533.metro).length > 0) {
      output += '<div class="b-popular-schools__metro"><div class="b-popular-schools__metro-icon b-icon_img_metro"></div>';
      var metroStationList554 = (schoolData533 == null) ? null : schoolData533.metro;
      var metroStationListLen554 = metroStationList554.length;
      for (var metroStationIndex554 = 0; metroStationIndex554 < metroStationListLen554; metroStationIndex554++) {
        var metroStationData554 = metroStationList554[metroStationIndex554];
        output += '<span class="b-popular-schools__metro-stations">' + soy.$$escapeHtml(metroStationData554) + ((! (metroStationIndex554 == metroStationListLen554 - 1)) ? ',' : '') + '</span> ';
      }
      output += '</div>';
    }
    output += '</div></a>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bPopularSchools.Template.base.soyTemplateName = 'sm.bPopularSchools.Template.base';
}
// This file was automatically generated from b-rating.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bRating.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bRating == 'undefined') { sm.bRating = {}; }
if (typeof sm.bRating.Template == 'undefined') { sm.bRating.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bRating.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class=" b-rating' + ((opt_data.params.theme) ? ' b-rating_' + soy.$$escapeHtmlAttribute(opt_data.params.theme) + '-theme' : '') + '">' + ((! opt_data.params.noMarks) ? sm.bRating.Template.marks_({params: {marks: opt_data.params.marks, averageMark: opt_data.params.averageMark}}, null, opt_ijData) : '') + ((! opt_data.params.noSectionNames) ? sm.bRating.Template.sectionNames_(null, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.bRating.Template.base.soyTemplateName = 'sm.bRating.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bRating.Template.marks_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="b-rating__marks"><div class="b-rating__section"><div class="b-rating__mark b-rating__mark_average' + ((! opt_data.params.averageMark > 0) ? ' b-rating__mark_null-average' : '') + '">' + soy.$$escapeHtml(opt_data.params.averageMark > 0 ? Math.round(opt_data.params.averageMark * 10) / 10 : '\u2014') + '</div></div>';
  var markList591 = opt_data.params.marks;
  var markListLen591 = markList591.length;
  for (var markIndex591 = 0; markIndex591 < markListLen591; markIndex591++) {
    var markData591 = markList591[markIndex591];
    output += '<div class="b-rating__section"><div class="b-rating__mark b-rating__mark_ordinary">' + soy.$$escapeHtml(markData591 > 0 ? Math.round(markData591 * 10) / 10 : '\u2014') + '</div></div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bRating.Template.marks_.soyTemplateName = 'sm.bRating.Template.marks_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bRating.Template.sectionNames_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var sectionNames__soy598 = ['\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B', '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430'];
  output += '<div class="b-rating__sections">';
  var sectionNameList600 = sectionNames__soy598;
  var sectionNameListLen600 = sectionNameList600.length;
  for (var sectionNameIndex600 = 0; sectionNameIndex600 < sectionNameListLen600; sectionNameIndex600++) {
    var sectionNameData600 = sectionNameList600[sectionNameIndex600];
    output += '<div class="b-rating__section"><div class=" b-rating__section-name' + ((sectionNameIndex600 == 0) ? ' b-rating__section-name_average' : '') + '">' + soy.$$escapeHtml(sectionNameData600) + '</div></div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bRating.Template.sectionNames_.soyTemplateName = 'sm.bRating.Template.sectionNames_';
}
// This file was automatically generated from b-score.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bScore.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bScore == 'undefined') { sm.bScore = {}; }
if (typeof sm.bScore.Template == 'undefined') { sm.bScore.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScore.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bScore.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.bScore.Template.base.soyTemplateName = 'sm.bScore.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScore.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-score"><div class="b-score__section b-score__section_left"><div class="b-score__average">' + sm.bMark.Template.base({params: {value: opt_data.params.totalScore}}, null, opt_ijData) + '</div><div class="b-score__delimiter"></div><div class="b-score__comments-amount">' + ((! opt_data.params.reviewCount || opt_data.params.reviewCount < 5) ? '\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E' : soy.$$escapeHtml(opt_data.params.reviewCount)) + ' \u043E\u0446\u0435\u043D\u043E\u043A</div></div><div class="b-score__section b-score__section_right">' + sm.bDiagram.Template.base({params: {data: opt_data.params.score, display: 'marks'}}, null, opt_ijData) + '</div></div>');
};
if (goog.DEBUG) {
  sm.bScore.Template.init.soyTemplateName = 'sm.bScore.Template.init';
}
// This file was automatically generated from b-search.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bSearch.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bSearch == 'undefined') { sm.bSearch = {}; }
if (typeof sm.bSearch.Template == 'undefined') { sm.bSearch.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bSearch.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-search b-search_theme_' + soy.$$escapeHtmlAttribute(opt_data.params.theme) + '" data-params="{&quot;redirect&quot;:' + soy.$$escapeHtmlAttribute(opt_data.params.redirect) + '}" >' + ((opt_data.params.theme == 'main') ? '' : '<span class="b-icon_img_search b-search__icon' + ((! opt_data.params.text) ? ' b-search__icon_disabled' : '') + '"></span>') + gorod.gSuggest.SuggestTemplate.render({params: {data: {text: (opt_data.params == null) ? null : opt_data.params.text, minLength: 3, placeholder: (opt_data.params == null) ? null : opt_data.params.placeholder, sourceUrl: '/api/school/search/suggest', argName: 'searchString'}, config: {customClasses: 'b-search__input', filtrationEnabled: false, templates: {search: (opt_data.params == null) ? null : opt_data.params.templates.search, item: (opt_data.params == null) ? null : opt_data.params.templates.item, text: (opt_data.params == null) ? null : opt_data.params.templates.text, value: (opt_data.params == null) ? null : opt_data.params.templates.value}}, list: {theme: 'stendhal', color: 'sienna'}}}, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.bSearch.Template.base.soyTemplateName = 'sm.bSearch.Template.base';
}
// This file was automatically generated from b-stars.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bStars.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bStars == 'undefined') { sm.bStars = {}; }
if (typeof sm.bStars.Template == 'undefined') { sm.bStars.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bStars.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var sizeClass__soy647 = ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : (opt_data.params.config.style == null) ? null : opt_data.params.config.style.size) ? ' b-stars_size_' + ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : (opt_data.params.config.style == null) ? null : opt_data.params.config.style.size) : '';
  var themeClass__soy648 = ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : (opt_data.params.config.style == null) ? null : opt_data.params.config.style.theme) ? ' b-stars__star_theme_' + ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : (opt_data.params.config.style == null) ? null : opt_data.params.config.style.theme) : '';
  var pointerClass__soy649 = ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.isClickable) ? ' b-stars_clickable' : '';
  var count__soy650 = opt_data.params.data.mark > 5 ? 5 : opt_data.params.data.mark;
  output += '<div class="b-stars' + soy.$$escapeHtmlAttribute(sizeClass__soy647) + soy.$$escapeHtmlAttribute(themeClass__soy648) + soy.$$escapeHtmlAttribute(pointerClass__soy649) + '"><input class="b-stars__hidden-input" type="hidden" name="' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) != null ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) : 'score') + '" value="' + soy.$$escapeHtmlAttribute(count__soy650) + '" />';
  for (var i660 = 0; i660 < 5; i660++) {
    var class__soy661 = 'b-stars__star ' + (i660 < count__soy650 ? 'b-stars__star_selected' : 'b-star__star_not-selected');
    output += '<div class=' + soy.$$escapeHtmlAttributeNospace(class__soy661) + '>t</div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bStars.Template.base.soyTemplateName = 'sm.bStars.Template.base';
}
// This file was automatically generated from b-validate.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.ValidateTemplate.
 */

if (typeof gorod == 'undefined') { var gorod = {}; }
if (typeof gorod.ValidateTemplate == 'undefined') { gorod.ValidateTemplate = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.ValidateTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<div class="b-validate" data-error-hash="' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.hash) != null ? ((opt_data.params == null) ? null : opt_data.params.hash) : '') + '"><div class="b-validate__message ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.message) ? '' : 'i-utils__hidden') + '">';
  if ((opt_data.params == null) ? null : opt_data.params.message) {
    var messageList675 = (opt_data.params == null) ? null : opt_data.params.message;
    var messageListLen675 = messageList675.length;
    for (var messageIndex675 = 0; messageIndex675 < messageListLen675; messageIndex675++) {
      var messageData675 = messageList675[messageIndex675];
      output += soy.$$escapeHtml(messageData675) + '<br/>';
    }
  }
  output += '</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.ValidateTemplate.render.soyTemplateName = 'gorod.ValidateTemplate.render';
}
// This file was automatically generated from g-button.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gButton.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gButton == 'undefined') { cl.gButton = {}; }
if (typeof cl.gButton.Template == 'undefined') { cl.gButton.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.button = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gButton.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gButton.Template.button.soyTemplateName = 'cl.gButton.Template.button';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.data));
};
if (goog.DEBUG) {
  cl.gButton.Template.body.soyTemplateName = 'cl.gButton.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-button');
};
if (goog.DEBUG) {
  cl.gButton.Template.rootClass.soyTemplateName = 'cl.gButton.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gButton.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gButton.Template.base.soyTemplateName = 'cl.gButton.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gButton.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gButton.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList698 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen698 = itemList698.length;
    for (var itemIndex698 = 0; itemIndex698 < itemListLen698; itemIndex698++) {
      var itemData698 = itemList698[itemIndex698];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData698.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData698.data);
    }
    output += '}" ';
  }
  output += cl.gButton.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gButton.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gButton.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gButton.Template.init.soyTemplateName = 'cl.gButton.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gButton.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gButton.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gButton.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList725 = opt_data.params.config.customClasses;
    var classListLen725 = classList725.length;
    for (var classIndex725 = 0; classIndex725 < classListLen725; classIndex725++) {
      var classData725 = classList725[classIndex725];
      output += ' ' + soy.$$escapeHtml(classData725);
    }
  }
  output += ' ' + cl.gButton.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gButton.Template.classes.soyTemplateName = 'cl.gButton.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gButton.Template.additionalClasses.soyTemplateName = 'cl.gButton.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gButton.Template.rootClass(null, null, opt_ijData) + '_' + cl.gButton.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gButton.Template.stylizationModifierClass.soyTemplateName = 'cl.gButton.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gButton.Template.stylizationModifier.soyTemplateName = 'cl.gButton.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gButton.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gButton.Template.attributes.soyTemplateName = 'cl.gButton.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gButton.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gButton.Template.tag.soyTemplateName = 'cl.gButton.Template.tag';
}
// This file was automatically generated from g-dropdown.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gDropdown.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gDropdown == 'undefined') { cl.gDropdown = {}; }
if (typeof cl.gDropdown.Template == 'undefined') { cl.gDropdown.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.dropdown = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gDropdown.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.dropdown.soyTemplateName = 'cl.gDropdown.Template.dropdown';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(cl.gDropdown.Template.rootClass(null, null, opt_ijData)) + '__opener">' + cl.gDropdown.Template.opener(opt_data, null, opt_ijData) + '</div><div class="' + soy.$$escapeHtmlAttribute(cl.gDropdown.Template.rootClass(null, null, opt_ijData)) + '__content i-utils__hidden">' + cl.gDropdown.Template.content(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.body.soyTemplateName = 'cl.gDropdown.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.opener = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.opener));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.opener.soyTemplateName = 'cl.gDropdown.Template.opener';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml((opt_data.params.data == null) ? null : opt_data.params.data.content));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.content.soyTemplateName = 'cl.gDropdown.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-dropdown');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.rootClass.soyTemplateName = 'cl.gDropdown.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gDropdown.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.base.soyTemplateName = 'cl.gDropdown.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gDropdown.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gDropdown.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList773 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen773 = itemList773.length;
    for (var itemIndex773 = 0; itemIndex773 < itemListLen773; itemIndex773++) {
      var itemData773 = itemList773[itemIndex773];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData773.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData773.data);
    }
    output += '}" ';
  }
  output += cl.gDropdown.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gDropdown.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gDropdown.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gDropdown.Template.init.soyTemplateName = 'cl.gDropdown.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gDropdown.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gDropdown.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gDropdown.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList800 = opt_data.params.config.customClasses;
    var classListLen800 = classList800.length;
    for (var classIndex800 = 0; classIndex800 < classListLen800; classIndex800++) {
      var classData800 = classList800[classIndex800];
      output += ' ' + soy.$$escapeHtml(classData800);
    }
  }
  output += ' ' + cl.gDropdown.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gDropdown.Template.classes.soyTemplateName = 'cl.gDropdown.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.additionalClasses.soyTemplateName = 'cl.gDropdown.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gDropdown.Template.rootClass(null, null, opt_ijData) + '_' + cl.gDropdown.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.stylizationModifierClass.soyTemplateName = 'cl.gDropdown.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gDropdown.Template.stylizationModifier.soyTemplateName = 'cl.gDropdown.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.attributes.soyTemplateName = 'cl.gDropdown.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gDropdown.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gDropdown.Template.tag.soyTemplateName = 'cl.gDropdown.Template.tag';
}
// This file was automatically generated from g-hint.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gHint.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gHint == 'undefined') { cl.gHint = {}; }
if (typeof cl.gHint.Template == 'undefined') { cl.gHint.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.hint = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gHint.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gHint.Template.hint.soyTemplateName = 'cl.gHint.Template.hint';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.data));
};
if (goog.DEBUG) {
  cl.gHint.Template.body.soyTemplateName = 'cl.gHint.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-hint');
};
if (goog.DEBUG) {
  cl.gHint.Template.rootClass.soyTemplateName = 'cl.gHint.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gHint.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gHint.Template.base.soyTemplateName = 'cl.gHint.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gHint.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gHint.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList836 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen836 = itemList836.length;
    for (var itemIndex836 = 0; itemIndex836 < itemListLen836; itemIndex836++) {
      var itemData836 = itemList836[itemIndex836];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData836.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData836.data);
    }
    output += '}" ';
  }
  output += cl.gHint.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gHint.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gHint.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gHint.Template.init.soyTemplateName = 'cl.gHint.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gHint.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gHint.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gHint.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList863 = opt_data.params.config.customClasses;
    var classListLen863 = classList863.length;
    for (var classIndex863 = 0; classIndex863 < classListLen863; classIndex863++) {
      var classData863 = classList863[classIndex863];
      output += ' ' + soy.$$escapeHtml(classData863);
    }
  }
  output += ' ' + cl.gHint.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gHint.Template.classes.soyTemplateName = 'cl.gHint.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gHint.Template.additionalClasses.soyTemplateName = 'cl.gHint.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gHint.Template.rootClass(null, null, opt_ijData) + '_' + cl.gHint.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gHint.Template.stylizationModifierClass.soyTemplateName = 'cl.gHint.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gHint.Template.stylizationModifier.soyTemplateName = 'cl.gHint.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gHint.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gHint.Template.attributes.soyTemplateName = 'cl.gHint.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gHint.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gHint.Template.tag.soyTemplateName = 'cl.gHint.Template.tag';
}
// This file was automatically generated from g-input.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gInput.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gInput == 'undefined') { cl.gInput = {}; }
if (typeof cl.gInput.Template == 'undefined') { cl.gInput.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.input = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gInput.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gInput.Template.input.soyTemplateName = 'cl.gInput.Template.input';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gInput.Template.inputTemplate(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gInput.Template.body.soyTemplateName = 'cl.gInput.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.inputTemplate = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<input class="' + soy.$$escapeHtmlAttribute(cl.gInput.Template.rootClass(null, null, opt_ijData)) + '__input"' + (((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) ? ' placeholder="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) + '"' : '') + (((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) ? ' name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '"' : '') + ' value="' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) : '') + '"></input>');
};
if (goog.DEBUG) {
  cl.gInput.Template.inputTemplate.soyTemplateName = 'cl.gInput.Template.inputTemplate';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-input');
};
if (goog.DEBUG) {
  cl.gInput.Template.rootClass.soyTemplateName = 'cl.gInput.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gInput.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gInput.Template.base.soyTemplateName = 'cl.gInput.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gInput.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gInput.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList916 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen916 = itemList916.length;
    for (var itemIndex916 = 0; itemIndex916 < itemListLen916; itemIndex916++) {
      var itemData916 = itemList916[itemIndex916];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData916.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData916.data);
    }
    output += '}" ';
  }
  output += cl.gInput.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gInput.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gInput.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gInput.Template.init.soyTemplateName = 'cl.gInput.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gInput.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gInput.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gInput.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList943 = opt_data.params.config.customClasses;
    var classListLen943 = classList943.length;
    for (var classIndex943 = 0; classIndex943 < classListLen943; classIndex943++) {
      var classData943 = classList943[classIndex943];
      output += ' ' + soy.$$escapeHtml(classData943);
    }
  }
  output += ' ' + cl.gInput.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gInput.Template.classes.soyTemplateName = 'cl.gInput.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gInput.Template.additionalClasses.soyTemplateName = 'cl.gInput.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gInput.Template.rootClass(null, null, opt_ijData) + '_' + cl.gInput.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gInput.Template.stylizationModifierClass.soyTemplateName = 'cl.gInput.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gInput.Template.stylizationModifier.soyTemplateName = 'cl.gInput.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gInput.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gInput.Template.attributes.soyTemplateName = 'cl.gInput.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gInput.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gInput.Template.tag.soyTemplateName = 'cl.gInput.Template.tag';
}
// This file was automatically generated from g-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gList.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gList == 'undefined') { cl.gList = {}; }
if (typeof cl.gList.Template == 'undefined') { cl.gList.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.list = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gList.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gList.Template.list.soyTemplateName = 'cl.gList.Template.list';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var selectedItemId__soy965 = ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.selectedItemId) != null ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.selectedItemId) : 0;
  if ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.items) {
    var iLimit968 = opt_data.params.data.items.length;
    for (var i968 = 0; i968 < iLimit968; i968++) {
      var item__soy969 = opt_data.params.data.items[i968];
      output += cl.gList.Template.listItem({params: {label: item__soy969.label, url: item__soy969.url, isSelected: i968 == selectedItemId__soy965}}, null, opt_ijData);
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gList.Template.body.soyTemplateName = 'cl.gList.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.listItem = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<' + soy.$$filterHtmlElementName(opt_data.params.url ? 'a' : 'div') + ' class="' + soy.$$escapeHtmlAttribute(cl.gList.Template.rootClass(null, null, opt_ijData)) + '__item' + ((opt_data.params.isSelected) ? ' ' + soy.$$escapeHtmlAttribute(cl.gList.Template.rootClass(null, null, opt_ijData)) + '__item_selected' : '') + '"' + ((opt_data.params.url) ? ' href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.url)) + '"' : '') + '>' + cl.gList.Template.value(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(opt_data.params.url ? 'a' : 'div') + '>');
};
if (goog.DEBUG) {
  cl.gList.Template.listItem.soyTemplateName = 'cl.gList.Template.listItem';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.value = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.label));
};
if (goog.DEBUG) {
  cl.gList.Template.value.soyTemplateName = 'cl.gList.Template.value';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-list');
};
if (goog.DEBUG) {
  cl.gList.Template.rootClass.soyTemplateName = 'cl.gList.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gList.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gList.Template.base.soyTemplateName = 'cl.gList.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gList.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gList.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1009 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1009 = itemList1009.length;
    for (var itemIndex1009 = 0; itemIndex1009 < itemListLen1009; itemIndex1009++) {
      var itemData1009 = itemList1009[itemIndex1009];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1009.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1009.data);
    }
    output += '}" ';
  }
  output += cl.gList.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gList.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gList.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gList.Template.init.soyTemplateName = 'cl.gList.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gList.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gList.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gList.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1036 = opt_data.params.config.customClasses;
    var classListLen1036 = classList1036.length;
    for (var classIndex1036 = 0; classIndex1036 < classListLen1036; classIndex1036++) {
      var classData1036 = classList1036[classIndex1036];
      output += ' ' + soy.$$escapeHtml(classData1036);
    }
  }
  output += ' ' + cl.gList.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gList.Template.classes.soyTemplateName = 'cl.gList.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gList.Template.additionalClasses.soyTemplateName = 'cl.gList.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gList.Template.rootClass(null, null, opt_ijData) + '_' + cl.gList.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gList.Template.stylizationModifierClass.soyTemplateName = 'cl.gList.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gList.Template.stylizationModifier.soyTemplateName = 'cl.gList.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gList.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gList.Template.attributes.soyTemplateName = 'cl.gList.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gList.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gList.Template.tag.soyTemplateName = 'cl.gList.Template.tag';
}
// This file was automatically generated from g-modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gModal.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gModal == 'undefined') { cl.gModal = {}; }
if (typeof cl.gModal.Template == 'undefined') { cl.gModal.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.modal = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gModal.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gModal.Template.modal.soyTemplateName = 'cl.gModal.Template.modal';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(cl.gModal.Template.rootClass(null, null, opt_ijData)) + '__fader"></div><div class="i-utils__vertical-align-helper"></div><div class="' + soy.$$escapeHtmlAttribute(cl.gModal.Template.rootClass(null, null, opt_ijData)) + '__content">' + cl.gModal.Template.content(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  cl.gModal.Template.body.soyTemplateName = 'cl.gModal.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.data));
};
if (goog.DEBUG) {
  cl.gModal.Template.content.soyTemplateName = 'cl.gModal.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-modal');
};
if (goog.DEBUG) {
  cl.gModal.Template.rootClass.soyTemplateName = 'cl.gModal.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('i-utils__hidden');
};
if (goog.DEBUG) {
  cl.gModal.Template.additionalClasses.soyTemplateName = 'cl.gModal.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gModal.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gModal.Template.base.soyTemplateName = 'cl.gModal.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gModal.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gModal.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1082 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1082 = itemList1082.length;
    for (var itemIndex1082 = 0; itemIndex1082 < itemListLen1082; itemIndex1082++) {
      var itemData1082 = itemList1082[itemIndex1082];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1082.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1082.data);
    }
    output += '}" ';
  }
  output += cl.gModal.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gModal.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gModal.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gModal.Template.init.soyTemplateName = 'cl.gModal.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gModal.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gModal.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gModal.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1109 = opt_data.params.config.customClasses;
    var classListLen1109 = classList1109.length;
    for (var classIndex1109 = 0; classIndex1109 < classListLen1109; classIndex1109++) {
      var classData1109 = classList1109[classIndex1109];
      output += ' ' + soy.$$escapeHtml(classData1109);
    }
  }
  output += ' ' + cl.gModal.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gModal.Template.classes.soyTemplateName = 'cl.gModal.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gModal.Template.rootClass(null, null, opt_ijData) + '_' + cl.gModal.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gModal.Template.stylizationModifierClass.soyTemplateName = 'cl.gModal.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gModal.Template.stylizationModifier.soyTemplateName = 'cl.gModal.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gModal.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gModal.Template.attributes.soyTemplateName = 'cl.gModal.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gModal.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gModal.Template.tag.soyTemplateName = 'cl.gModal.Template.tag';
}
// This file was automatically generated from g-suggest.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.gSuggest.SuggestTemplate.
 */

if (typeof gorod == 'undefined') { var gorod = {}; }
if (typeof gorod.gSuggest == 'undefined') { gorod.gSuggest = {}; }
if (typeof gorod.gSuggest.SuggestTemplate == 'undefined') { gorod.gSuggest.SuggestTemplate = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.gSuggest.SuggestTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var classes__soy1128 = '' + ((! (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.visible) == null || ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.visible))) ? 'g-suggest i-utils__hidden' : 'g-suggest');
  classes__soy1128 = soydata.$$markUnsanitizedTextForInternalBlocks(classes__soy1128);
  var dataParams__soy1134 = {args: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.args, sourceArray: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.sourceArray, sourceUrl: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.sourceUrl, argName: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.argName, typeRequest: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.typeRequest, minLength: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.minLength, cacheEnabled: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.cacheEnabled, filtrationEnabled: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.filtrationEnabled, templates: {search: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.templates.search, item: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.templates.item, text: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.templates.text, value: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.templates.value}};
  output += '<div class="' + soy.$$escapeHtmlAttribute(classes__soy1128) + '" data-params=\'' + soy.$$escapeHtmlAttribute(gorod.iUtils.stringify({json: dataParams__soy1134}, null, opt_ijData)) + '\'>' + gorod.gSuggest.SuggestTemplate.gSuggestInitInput_({params: {data: {text: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.text, placeholder: ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) : ''}, customClasses: (opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses, input: (opt_data.params == null) ? null : opt_data.params.input}}, null, opt_ijData) + gorod.gSuggest.SuggestTemplate.gSuggestInitValue_({params: {data: {value: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value, name: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name}}}, null, opt_ijData) + gorod.gSuggest.SuggestTemplate.gSuggestInitList_({params: {list: (opt_data.params == null) ? null : opt_data.params.list}}, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.gSuggest.SuggestTemplate.render.soyTemplateName = 'gorod.gSuggest.SuggestTemplate.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.gSuggest.SuggestTemplate.gSuggestInitInput_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var classes__soy1149 = 'g-suggest__input ' + ((opt_data.params == null) ? null : opt_data.params.customClasses);
  var inputParams__soy1150 = ((opt_data.params == null) ? null : opt_data.params.input) ? {type: 'text'} : soy.$$augmentMap((opt_data.params == null) ? null : opt_data.params.input, {value: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.text, placeholder: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder, customClasses: classes__soy1149});
  output += gorod.bInput.InputTemplate.render({params: inputParams__soy1150}, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.gSuggest.SuggestTemplate.gSuggestInitInput_.soyTemplateName = 'gorod.gSuggest.SuggestTemplate.gSuggestInitInput_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.gSuggest.SuggestTemplate.gSuggestInitValue_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<input type="hidden" name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '" value="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) + '" class="g-suggest__value" />');
};
if (goog.DEBUG) {
  gorod.gSuggest.SuggestTemplate.gSuggestInitValue_.soyTemplateName = 'gorod.gSuggest.SuggestTemplate.gSuggestInitValue_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.gSuggest.SuggestTemplate.gSuggestInitList_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var listParams__soy1160 = ((opt_data.params == null) ? null : opt_data.params.list) ? soy.$$augmentMap((opt_data.params == null) ? null : opt_data.params.list, {selectOnHover: 'true', list: [], extraClasses: 'g-suggest__list i-utils__hidden'}) : {selectOnHover: 'true', list: [], extraClasses: 'g-suggest__list i-utils__hidden'};
  output += gorod.bList.ListTemplate.render({params: listParams__soy1160}, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.gSuggest.SuggestTemplate.gSuggestInitList_.soyTemplateName = 'gorod.gSuggest.SuggestTemplate.gSuggestInitList_';
}
// This file was automatically generated from g-tab.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gTab.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gTab == 'undefined') { cl.gTab = {}; }
if (typeof cl.gTab.Template == 'undefined') { cl.gTab.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.tab = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTab.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gTab.Template.tab.soyTemplateName = 'cl.gTab.Template.tab';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var selectedTabId__soy1167 = ((opt_data.params.data == null) ? null : opt_data.params.data.selectedTabId) != null ? ((opt_data.params.data == null) ? null : opt_data.params.data.selectedTabId) : ((opt_data.params.config == null) ? null : opt_data.params.config.noDefaultTab) ? -1 : 0;
  output += cl.gTab.Template.tabs(opt_data, null, opt_ijData);
  var iLimit1169 = (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.tabs == null) ? null : opt_data.params.data.tabs.length;
  for (var i1169 = 0; i1169 < iLimit1169; i1169++) {
    output += cl.gTab.Template.content({params: {content: opt_data.params.data.tabs[i1169].content, hidden: ! (i1169 == selectedTabId__soy1167)}}, null, opt_ijData);
  }
  output += cl.gTab.Template.placeholder(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTab.Template.body.soyTemplateName = 'cl.gTab.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.tabs = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var selectedTabId__soy1174 = ((opt_data.params.data == null) ? null : opt_data.params.data.selectedTabId) != null ? ((opt_data.params.data == null) ? null : opt_data.params.data.selectedTabId) : ((opt_data.params.config == null) ? null : opt_data.params.config.noDefaultTab) ? -1 : 0;
  output += '<div class="' + soy.$$escapeHtmlAttribute(cl.gTab.Template.rootClass(null, null, opt_ijData)) + '__tabs">';
  var iLimit1178 = (opt_data.params.data == null) ? null : (opt_data.params.data.tabs == null) ? null : opt_data.params.data.tabs.length;
  for (var i1178 = 0; i1178 < iLimit1178; i1178++) {
    output += cl.gTab.Template.label({params: {label: opt_data.params.data.tabs[i1178].label, selected: i1178 == selectedTabId__soy1174}}, null, opt_ijData);
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTab.Template.tabs.soyTemplateName = 'cl.gTab.Template.tabs';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.label = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(cl.gTab.Template.rootClass(null, null, opt_ijData)) + '__tab' + (((opt_data.params == null) ? null : opt_data.params.selected) ? ' ' + soy.$$escapeHtmlAttribute(cl.gTab.Template.rootClass(null, null, opt_ijData)) + '__tab_selected' : '') + '">' + cl.gTab.Template.labelContent(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  cl.gTab.Template.label.soyTemplateName = 'cl.gTab.Template.label';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.labelContent = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml((opt_data.params == null) ? null : opt_data.params.label));
};
if (goog.DEBUG) {
  cl.gTab.Template.labelContent.soyTemplateName = 'cl.gTab.Template.labelContent';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(cl.gTab.Template.rootClass(null, null, opt_ijData)) + '__content' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.hidden) ? ' i-utils__hidden' : '') + '">' + cl.gTab.Template.innerContent(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  cl.gTab.Template.content.soyTemplateName = 'cl.gTab.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.innerContent = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml((opt_data.params == null) ? null : opt_data.params.content));
};
if (goog.DEBUG) {
  cl.gTab.Template.innerContent.soyTemplateName = 'cl.gTab.Template.innerContent';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.placeholder = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gTab.Template.placeholder.soyTemplateName = 'cl.gTab.Template.placeholder';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-tab');
};
if (goog.DEBUG) {
  cl.gTab.Template.rootClass.soyTemplateName = 'cl.gTab.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTab.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gTab.Template.base.soyTemplateName = 'cl.gTab.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gTab.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gTab.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1220 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1220 = itemList1220.length;
    for (var itemIndex1220 = 0; itemIndex1220 < itemListLen1220; itemIndex1220++) {
      var itemData1220 = itemList1220[itemIndex1220];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1220.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1220.data);
    }
    output += '}" ';
  }
  output += cl.gTab.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gTab.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gTab.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTab.Template.init.soyTemplateName = 'cl.gTab.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gTab.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gTab.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gTab.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1247 = opt_data.params.config.customClasses;
    var classListLen1247 = classList1247.length;
    for (var classIndex1247 = 0; classIndex1247 < classListLen1247; classIndex1247++) {
      var classData1247 = classList1247[classIndex1247];
      output += ' ' + soy.$$escapeHtml(classData1247);
    }
  }
  output += ' ' + cl.gTab.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTab.Template.classes.soyTemplateName = 'cl.gTab.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.gTab.Template.additionalClasses.soyTemplateName = 'cl.gTab.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gTab.Template.rootClass(null, null, opt_ijData) + '_' + cl.gTab.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gTab.Template.stylizationModifierClass.soyTemplateName = 'cl.gTab.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gTab.Template.stylizationModifier.soyTemplateName = 'cl.gTab.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gTab.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gTab.Template.attributes.soyTemplateName = 'cl.gTab.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTab.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gTab.Template.tag.soyTemplateName = 'cl.gTab.Template.tag';
}
// This file was automatically generated from g-textarea.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.gTextarea.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.gTextarea == 'undefined') { cl.gTextarea = {}; }
if (typeof cl.gTextarea.Template == 'undefined') { cl.gTextarea.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.textarea = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTextarea.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gTextarea.Template.textarea.soyTemplateName = 'cl.gTextarea.Template.textarea';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<textarea class="' + soy.$$escapeHtmlAttribute(cl.gTextarea.Template.rootClass(null, null, opt_ijData)) + '__textarea" placeholder="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.placeholder) + '" name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '" spellcheck="false">' + soy.$$escapeHtmlRcdata(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) : '') + '</textarea>' + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.autoHeight) ? '<div class="' + soy.$$escapeHtmlAttribute(cl.gTextarea.Template.rootClass(null, null, opt_ijData)) + '__text-container">' + soy.$$changeNewlineToBr(soy.$$escapeHtml(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.value) : '')) + '</div>' : ''));
};
if (goog.DEBUG) {
  cl.gTextarea.Template.body.soyTemplateName = 'cl.gTextarea.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('g-textarea');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.rootClass.soyTemplateName = 'cl.gTextarea.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.autoHeight) ? ' g-textarea_auto-height' : '');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.additionalClasses.soyTemplateName = 'cl.gTextarea.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTextarea.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.gTextarea.Template.base.soyTemplateName = 'cl.gTextarea.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.gTextarea.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.gTextarea.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1303 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1303 = itemList1303.length;
    for (var itemIndex1303 = 0; itemIndex1303 < itemListLen1303; itemIndex1303++) {
      var itemData1303 = itemList1303[itemIndex1303];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1303.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1303.data);
    }
    output += '}" ';
  }
  output += cl.gTextarea.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.gTextarea.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.gTextarea.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTextarea.Template.init.soyTemplateName = 'cl.gTextarea.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.gTextarea.Template.rootClass(null, null, opt_ijData) + ' ' + cl.gTextarea.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.gTextarea.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1330 = opt_data.params.config.customClasses;
    var classListLen1330 = classList1330.length;
    for (var classIndex1330 = 0; classIndex1330 < classListLen1330; classIndex1330++) {
      var classData1330 = classList1330[classIndex1330];
      output += ' ' + soy.$$escapeHtml(classData1330);
    }
  }
  output += ' ' + cl.gTextarea.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.gTextarea.Template.classes.soyTemplateName = 'cl.gTextarea.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.gTextarea.Template.rootClass(null, null, opt_ijData) + '_' + cl.gTextarea.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.stylizationModifierClass.soyTemplateName = 'cl.gTextarea.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.gTextarea.Template.stylizationModifier.soyTemplateName = 'cl.gTextarea.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.attributes.soyTemplateName = 'cl.gTextarea.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.gTextarea.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.gTextarea.Template.tag.soyTemplateName = 'cl.gTextarea.Template.tag';
}
// This file was automatically generated from i-control.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.iControl.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.iControl == 'undefined') { cl.iControl = {}; }
if (typeof cl.iControl.Template == 'undefined') { cl.iControl.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.iControl.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.iControl.Template.base.soyTemplateName = 'cl.iControl.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<' + soy.$$filterHtmlElementName(cl.iControl.Template.tag(opt_data, null, opt_ijData)) + ' class="' + soy.$$escapeHtmlAttribute(cl.iControl.Template.classes(opt_data, null, opt_ijData)) + '" ';
  if ((opt_data.params == null) ? null : opt_data.params.includes) {
    output += 'data-include="{';
    var itemList1359 = (opt_data.params == null) ? null : opt_data.params.includes;
    var itemListLen1359 = itemList1359.length;
    for (var itemIndex1359 = 0; itemIndex1359 < itemListLen1359; itemIndex1359++) {
      var itemData1359 = itemList1359[itemIndex1359];
      output += '&quot;' + soy.$$escapeHtmlAttribute(itemData1359.type) + '&quot;:' + soy.$$escapeHtmlAttribute(itemData1359.data);
    }
    output += '}" ';
  }
  output += cl.iControl.Template.attributes(opt_data, null, opt_ijData) + '/>' + cl.iControl.Template.body(opt_data, null, opt_ijData) + '</' + soy.$$filterHtmlElementName(cl.iControl.Template.tag(opt_data, null, opt_ijData)) + '>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.iControl.Template.init.soyTemplateName = 'cl.iControl.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.iControl.Template.body.soyTemplateName = 'cl.iControl.Template.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.classes = function(opt_data, opt_ignored, opt_ijData) {
  var output = 'i-control ' + cl.iControl.Template.rootClass(null, null, opt_ijData) + ' ' + cl.iControl.Template.stylizationModifierClass(opt_data, null, opt_ijData) + (((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.theme) ? ' ' + cl.iControl.Template.rootClass(null, null, opt_ijData) + '_' + soy.$$escapeHtml(opt_data.params.config.theme) + '-theme' : '');
  if ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.customClasses) {
    var classList1387 = opt_data.params.config.customClasses;
    var classListLen1387 = classList1387.length;
    for (var classIndex1387 = 0; classIndex1387 < classListLen1387; classIndex1387++) {
      var classData1387 = classList1387[classIndex1387];
      output += ' ' + soy.$$escapeHtml(classData1387);
    }
  }
  output += ' ' + cl.iControl.Template.additionalClasses(opt_data, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.iControl.Template.classes.soyTemplateName = 'cl.iControl.Template.classes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.additionalClasses = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.iControl.Template.additionalClasses.soyTemplateName = 'cl.iControl.Template.additionalClasses';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.rootClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.iControl.Template.rootClass.soyTemplateName = 'cl.iControl.Template.rootClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.stylizationModifierClass = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.stylizationModifier) ? cl.iControl.Template.rootClass(null, null, opt_ijData) + '_' + cl.iControl.Template.stylizationModifier(opt_data, null, opt_ijData) : '');
};
if (goog.DEBUG) {
  cl.iControl.Template.stylizationModifierClass.soyTemplateName = 'cl.iControl.Template.stylizationModifierClass';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.stylizationModifier = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.params.config.stylizationModifier));
};
if (goog.DEBUG) {
  cl.iControl.Template.stylizationModifier.soyTemplateName = 'cl.iControl.Template.stylizationModifier';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtmlAttribute}
 * @suppress {checkTypes}
 */
cl.iControl.Template.attributes = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute('');
};
if (goog.DEBUG) {
  cl.iControl.Template.attributes.soyTemplateName = 'cl.iControl.Template.attributes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.iControl.Template.tag = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('div');
};
if (goog.DEBUG) {
  cl.iControl.Template.tag.soyTemplateName = 'cl.iControl.Template.tag';
}
// This file was automatically generated from l-base.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lBase.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lBase == 'undefined') { sm.lBase = {}; }
if (typeof sm.lBase.Template == 'undefined') { sm.lBase.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lBase.Template.index = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var layoutTitle__soy1408 = opt_data.title != null ? opt_data.title : 'School Market';
  output += '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><title>' + soy.$$escapeHtmlRcdata(opt_data.title) + '</title>' + sm.lBase.Template.css_(opt_data, null, opt_ijData) + '</head><body>' + ((opt_data.html) ? soy.$$escapeHtml(opt_data.html) : sm.lBase.Template.html_({title: layoutTitle__soy1408}, null, opt_ijData)) + sm.lBase.Template.js_(opt_data, null, opt_ijData) + '</body></html>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lBase.Template.index.soyTemplateName = 'sm.lBase.Template.index';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lBase.Template.html_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-base"><h1>' + soy.$$escapeHtml(opt_data.title) + '</h1><p>Welcome to ' + soy.$$escapeHtml(opt_data.title) + '!!!</p></div>');
};
if (goog.DEBUG) {
  sm.lBase.Template.html_.soyTemplateName = 'sm.lBase.Template.html_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lBase.Template.css_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.css) {
    var itemList1433 = opt_data.css;
    var itemListLen1433 = itemList1433.length;
    for (var itemIndex1433 = 0; itemIndex1433 < itemListLen1433; itemIndex1433++) {
      var itemData1433 = itemList1433[itemIndex1433];
      output += '<link rel=\'stylesheet\' href=\'' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(itemData1433)) + '\' />';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lBase.Template.css_.soyTemplateName = 'sm.lBase.Template.css_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lBase.Template.js_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.js) {
    var itemList1441 = opt_data.js;
    var itemListLen1441 = itemList1441.length;
    for (var itemIndex1441 = 0; itemIndex1441 < itemListLen1441; itemIndex1441++) {
      var itemData1441 = itemList1441[itemIndex1441];
      output += '<script type="text/javascript" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(itemData1441)) + '"><\/script>';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lBase.Template.js_.soyTemplateName = 'sm.lBase.Template.js_';
}
// This file was automatically generated from l-base.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lBase.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lBase == 'undefined') { cl.lBase = {}; }
if (typeof cl.lBase.Template == 'undefined') { cl.lBase.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lBase.Template.index = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var layoutTitle__soy1448 = opt_data.title != null ? opt_data.title : 'School Market';
  output += '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><title>' + soy.$$escapeHtmlRcdata(opt_data.title) + '</title>' + cl.lBase.Template.css_(opt_data, null, opt_ijData) + '</head><body>' + ((opt_data.html) ? soy.$$escapeHtml(opt_data.html) : cl.lBase.Template.html_({title: layoutTitle__soy1448}, null, opt_ijData)) + cl.lBase.Template.js_(opt_data, null, opt_ijData) + '</body></html>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lBase.Template.index.soyTemplateName = 'cl.lBase.Template.index';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lBase.Template.html_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-base"><h1>' + soy.$$escapeHtml(opt_data.title) + '</h1><p>Welcome to ' + soy.$$escapeHtml(opt_data.title) + '!!!</p></div>');
};
if (goog.DEBUG) {
  cl.lBase.Template.html_.soyTemplateName = 'cl.lBase.Template.html_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lBase.Template.css_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.css) {
    var itemList1473 = opt_data.css;
    var itemListLen1473 = itemList1473.length;
    for (var itemIndex1473 = 0; itemIndex1473 < itemListLen1473; itemIndex1473++) {
      var itemData1473 = itemList1473[itemIndex1473];
      output += '<link rel=\'stylesheet\' href=\'' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(itemData1473)) + '\' />';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lBase.Template.css_.soyTemplateName = 'cl.lBase.Template.css_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lBase.Template.js_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.js) {
    var itemList1481 = opt_data.js;
    var itemListLen1481 = itemList1481.length;
    for (var itemIndex1481 = 0; itemIndex1481 < itemListLen1481; itemIndex1481++) {
      var itemData1481 = itemList1481[itemIndex1481];
      output += '<script type="text/javascript" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(itemData1481)) + '"><\/script>';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lBase.Template.js_.soyTemplateName = 'cl.lBase.Template.js_';
}
// This file was automatically generated from l-doc.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.Template == 'undefined') { sm.lDoc.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.index = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var html__soy1488 = '' + sm.lDoc.Template.html_(opt_data, null, opt_ijData);
  html__soy1488 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(html__soy1488);
  output += sm.lDoc.Template.base_({title: 'doc', html: html__soy1488}, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lDoc.Template.index.soyTemplateName = 'sm.lDoc.Template.index';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.item = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var html__soy1495 = '' + sm.lDoc.Template.html_(opt_data, null, opt_ijData);
  html__soy1495 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(html__soy1495);
  output += sm.lDoc.Template.base_({title: opt_data.name, html: html__soy1495}, null, opt_ijData);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lDoc.Template.item.soyTemplateName = 'sm.lDoc.Template.item';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.base_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lBase.Template.index({title: opt_data.title, html: opt_data.html, css: ['/clobl.build.css', '/styles.css'], js: ['/external.min.js', '/l-doc.js']}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.Template.base_.soyTemplateName = 'sm.lDoc.Template.base_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.html_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<link  href=\'https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><div class="l-doc">' + sm.lDoc.Template.menu_(opt_data, null, opt_ijData) + sm.lDoc.Template.content_(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lDoc.Template.html_.soyTemplateName = 'sm.lDoc.Template.html_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.menu_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__menu">' + ((opt_data.name) ? '<a class="l-doc__menu-return" href="/doc">Back</a>' : '') + '<div class="l-doc__menu-section"><ul class="l-doc__menu-items">';
  var itemList1523 = opt_data.list;
  var itemListLen1523 = itemList1523.length;
  for (var itemIndex1523 = 0; itemIndex1523 < itemListLen1523; itemIndex1523++) {
    var itemData1523 = itemList1523[itemIndex1523];
    output += '<li class="l-doc__menu-item">' + ((itemData1523 == opt_data.name) ? '<span class="l-doc__menu-selected">' + soy.$$escapeHtml(itemData1523) + '</span>' : '<a class="l-doc__menu-link" href="/doc/' + soy.$$escapeHtmlAttribute(itemData1523) + '">' + soy.$$escapeHtml(itemData1523) + '</a>') + '</li>';
  }
  output += '</ul></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lDoc.Template.menu_.soyTemplateName = 'sm.lDoc.Template.menu_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.content_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__content">' + ((opt_data.name) ? sm.lDoc.Template.itemContent_(opt_data, null, opt_ijData) : sm.lDoc.Template.indexContent_(opt_data, null, opt_ijData)) + '</div>');
};
if (goog.DEBUG) {
  sm.lDoc.Template.content_.soyTemplateName = 'sm.lDoc.Template.content_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.indexContent_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<h1 class="l-doc__h1">All blocks</h1><div class="l-doc__previews">';
  var itemList1551 = opt_data.list;
  var itemListLen1551 = itemList1551.length;
  for (var itemIndex1551 = 0; itemIndex1551 < itemListLen1551; itemIndex1551++) {
    var itemData1551 = itemList1551[itemIndex1551];
    output += '<div class="l-doc__preview"><h2 class="l-doc__h2"><a href="/doc/' + soy.$$escapeHtmlAttribute(itemData1551) + '">' + soy.$$escapeHtml(itemData1551) + '</a></h2><div class="l-doc__preview-content l-doc__preview-' + soy.$$escapeHtmlAttribute(itemData1551) + '">' + sm.lDoc.Template.preview_({name: itemData1551}, null, opt_ijData) + '</div></div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lDoc.Template.indexContent_.soyTemplateName = 'sm.lDoc.Template.indexContent_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.preview_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  switch (opt_data.name) {
    case 'b-mark':
      output += sm.lDoc.nDemo.bBlockMark.Template.preview(null, null, opt_ijData);
      break;
    case 'b-stars':
      output += sm.lDoc.nDemo.bBlockStars.Template.preview(null, null, opt_ijData);
      break;
    case 'b-feedback-modal':
      output += sm.lDoc.nDemo.bBlockFeedbackModal.Template.preview(null, null, opt_ijData);
      break;
    case 'b-comments':
      output += sm.lDoc.nDemo.bBlockComments.Template.preview(null, null, opt_ijData);
      break;
    case 'b-rating':
      output += sm.lDoc.nDemo.bBlockRating.Template.preview(null, null, opt_ijData);
      break;
    case 'b-school-list':
      output += sm.lDoc.nDemo.bBlockSchoolList.Template.preview(null, null, opt_ijData);
      break;
    case 'b-school-list-item':
      output += sm.lDoc.nDemo.bBlockSchoolListItem.Template.preview(null, null, opt_ijData);
      break;
    case 'b-sort':
      output += sm.lDoc.nDemo.bBlockSort.Template.preview(null, null, opt_ijData);
      break;
    case 'b-search':
      break;
    case 'b-data-block':
      output += sm.lDoc.nDemo.bBlockDataBlock.Template.preview(null, null, opt_ijData);
      break;
    case 'b-filters':
      output += sm.lDoc.nDemo.bBlockFilters.Template.preview(null, null, opt_ijData);
      break;
    case 'b-diagram':
      output += sm.lDoc.nDemo.bBlockDiagram.Template.preview(null, null, opt_ijData);
      break;
    case 'b-score':
      output += sm.lDoc.nDemo.bBlockScore.Template.preview(null, null, opt_ijData);
      break;
    case 'b-badge':
      output += sm.lDoc.nDemo.bBlockBadge.Template.preview(null, null, opt_ijData);
      break;
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lDoc.Template.preview_.soyTemplateName = 'sm.lDoc.Template.preview_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.itemContent_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<h1 class="l-doc__h1">' + soy.$$escapeHtml(opt_data.name) + '</h1><div class="l-doc__documentation">' + sm.lDoc.Template.documentation_(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lDoc.Template.itemContent_.soyTemplateName = 'sm.lDoc.Template.itemContent_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.Template.documentation_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  switch (opt_data.name) {
    case 'b-mark':
      output += sm.lDoc.nDemo.bBlockMark.Template.doc(null, null, opt_ijData);
      break;
    case 'b-stars':
      output += sm.lDoc.nDemo.bBlockStars.Template.doc(null, null, opt_ijData);
      break;
    case 'b-feedback-modal':
      output += sm.lDoc.nDemo.bBlockFeedbackModal.Template.doc(null, null, opt_ijData);
      break;
    case 'b-comments':
      output += sm.lDoc.nDemo.bBlockComments.Template.doc(null, null, opt_ijData);
      break;
    case 'b-rating':
      output += sm.lDoc.nDemo.bBlockRating.Template.doc(null, null, opt_ijData);
      break;
    case 'b-school-list':
      output += sm.lDoc.nDemo.bBlockSchoolList.Template.doc(null, null, opt_ijData);
      break;
    case 'b-school-list-item':
      output += sm.lDoc.nDemo.bBlockSchoolListItem.Template.doc(null, null, opt_ijData);
      break;
    case 'b-sort':
      output += sm.lDoc.nDemo.bBlockSort.Template.doc(null, null, opt_ijData);
      break;
    case 'b-data-block':
      output += sm.lDoc.nDemo.bBlockDataBlock.Template.doc(null, null, opt_ijData);
      break;
    case 'b-filters':
      output += sm.lDoc.nDemo.bBlockFilters.Template.doc(null, null, opt_ijData);
      break;
    case 'b-diagram':
      output += sm.lDoc.nDemo.bBlockDiagram.Template.doc(null, null, opt_ijData);
      break;
    case 'b-search':
      break;
    case 'b-score':
      output += sm.lDoc.nDemo.bBlockScore.Template.doc(null, null, opt_ijData);
      break;
    case 'b-badge':
      output += sm.lDoc.nDemo.bBlockBadge.Template.doc(null, null, opt_ijData);
      break;
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lDoc.Template.documentation_.soyTemplateName = 'sm.lDoc.Template.documentation_';
}
// This file was automatically generated from l-school.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.Template == 'undefined') { sm.lSchool.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>' + soy.$$escapeHtmlRcdata(opt_data.params.data.schoolName) + ' \u043D\u0430 \u0428\u043A\u043E\u043B\u0430\u0445 \u041C\u0435\u043B\u0430</title><link href=\'https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link href=\'https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link rel="stylesheet" href="/clobl.build.css"><link rel="stylesheet" href="/styles.css"><link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"></head><body>';
  var dataParams__soy1634 = '' + soy.$$escapeHtml(cl.iUtils.Utils.stringify({json: {id: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.id}}, null, opt_ijData));
  dataParams__soy1634 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(dataParams__soy1634);
  output += '<div class="l-school" data-params="' + soy.$$escapeHtmlAttribute(dataParams__soy1634) + '"><div class="l-school__section l-school__section__header">' + sm.bHeader.Template.base({params: {url: '/', searchText: (opt_data.params == null) ? null : opt_data.params.searchText, searchRedirect: true, templates: {search: opt_data.params.searchTemplates.search, item: opt_data.params.searchTemplates.item, text: opt_data.params.searchTemplates.text, value: opt_data.params.searchTemplates.value}}}, null, opt_ijData) + '</div><div class="l-school__section l-school__section__school-header"><div class="l-school__container">' + sm.lSchool.Template.top_(opt_data, null, opt_ijData) + '</div></div><div class="l-school__section l-school__section__school-information"><div class="l-school__container">' + sm.lSchool.Template.middle_(opt_data, null, opt_ijData) + '</div></div><div class="l-school__section l-school__section_grey">' + sm.lSchool.bResults.Template.results({params: {data: opt_data.params.data.results}}, null, opt_ijData) + '</div><div class="l-school__section l-school__section__comments"><div class="l-school__container">' + sm.lSchool.Template.comments_({comments: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.comments}, null, opt_ijData) + '</div></div><div class="l-school__section l-school__section__popular-schools"><div class="l-school__container">' + sm.bPopularSchools.Template.base({params: {popularSchools: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.popularSchools}}, null, opt_ijData) + '</div></div><div class="l-school__section l-school__section__footer"><div class="l-school__container"><div class="l-school__horisontal-line"></div>' + sm.lSchool.bFooter.Template.base(null, null, opt_ijData) + '</div></div></div>' + sm.lSchool.bMap.Template.api(null, null, opt_ijData) + '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"><\/script><script type="text/javascript">var CLOSURE_NO_DEPS = true;<\/script><script type="text/javascript" src="/l-school.js"><\/script></body></html>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.Template.base.soyTemplateName = 'sm.lSchool.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.top_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-school__content-column l-school__content-column_double-width"><div class="l-school__name">' + soy.$$escapeHtml(opt_data.params.data.schoolName) + '</div>' + ((opt_data.params.data.schoolDescr) ? '<div class="l-school__description">' + soy.$$escapeHtml(opt_data.params.data.schoolDescr) + '</div>' : '') + '</div><div class="l-school__content-column l-school__content-column_last"><div class = "l-school__rating">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'button', renderParams: {data: '\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432', config: {customClasses: ['g-button_feedback-opener']}}}}, null, opt_ijData)) + '</div></div>');
};
if (goog.DEBUG) {
  sm.lSchool.Template.top_.soyTemplateName = 'sm.lSchool.Template.top_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.middle_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-school__content-column l-school__content-column_left"><div class="l-school__score">' + sm.bScore.Template.base({params: {reviewCount: opt_data.params.data.reviewCount, score: opt_data.params.data.score, totalScore: opt_data.params.data.totalScore}}, null, opt_ijData) + '</div><div class="l-school__item-container"><div class="l-school__map-dummy">' + sm.lSchool.bMap.Template.map({params: {data: {id: opt_data.params.data.id, addresses: opt_data.params.data.addresses, name: opt_data.params.data.schoolName, totalScore: opt_data.params.totalScore}}}, null, opt_ijData) + '</div></div><div class="l-school__item-container">' + sm.lSchool.bDataBlockInformation.Template.base({params: {content: {classes: opt_data.params.data.classes, kindergarten: opt_data.params.data.kindergarten, extendedDayCost: opt_data.params.data.extendedDayCost, dressCode: opt_data.params.data.dressCode, directorName: opt_data.params.data.directorName}}}, null, opt_ijData) + '</div></div><div class="l-school__content-column l-school__content-column_double-width l-school__content-column_last">' + ((opt_data.params.data.features && opt_data.params.data.features.length > 0) ? '<div class="l-school__item-container">' + sm.lSchool.bDataBlockFeatures.Template.base({params: {header: '\u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438', content: opt_data.params.data.features}}, null, opt_ijData) + '</div>' : '');
  if (opt_data.params.data.contacts) {
    var contactHeader__soy1694 = '' + ((opt_data.params.data.contacts.phones.length < 1) ? '\u0430\u0434\u0440\u0435\u0441\u0430' : '\u0430\u0434\u0440\u0435\u0441\u0430 \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u044B');
    contactHeader__soy1694 = soydata.$$markUnsanitizedTextForInternalBlocks(contactHeader__soy1694);
    output += '<div class="l-school__item-container">' + sm.lSchool.bDataBlockAddresses.Template.base({params: {header: contactHeader__soy1694, content: opt_data.params.data.contacts}}, null, opt_ijData) + '</div>';
  }
  output += ((opt_data.params.data.sites.length > 0) ? '<div class="l-school__item-container">' + sm.lSchool.bDataBlockLinks.Template.base({params: {header: '\u0441\u0441\u044B\u043B\u043A\u0438', content: opt_data.params.data.sites}}, null, opt_ijData) + '</div>' : '') + '<div class="l-school__content-column">' + ((opt_data.params.data.ratings.length > 1) ? (opt_data.params.data.ratings.length > 0) ? '<div class="l-school__item-container">' + sm.lSchool.bDataBlockRatings.Template.base({params: {header: '\u043C\u0435\u0441\u0442\u0430 \u0432 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430\u0445', content: opt_data.params.data.ratings}}, null, opt_ijData) + '</div>' : '' : '') + '</div><div class="l-school__content-column l-school__content-column_last">' + ((opt_data.params.data.specializedClasses && opt_data.params.data.specializedClasses.length > 0) ? '<div class="l-school__item-container">' + sm.lSchool.bDataBlockFoldList.Template.base({params: {header: '\u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u044B\u0435 \u043A\u043B\u0430\u0441\u0441\u044B', content: opt_data.params.data.specializedClasses}}, null, opt_ijData) + '</div>' : '') + ((opt_data.params.data.activities && opt_data.params.data.activities.length > 0) ? '<div class="l-school__item-container">' + sm.lSchool.bDataBlockFoldList.Template.base({params: {header: '\u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u044F', headerType: 2, content: opt_data.params.data.activities}}, null, opt_ijData) + '</div>' : '') + '</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.Template.middle_.soyTemplateName = 'sm.lSchool.Template.middle_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.bottom_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  sm.lSchool.Template.bottom_.soyTemplateName = 'sm.lSchool.Template.bottom_';
}


/**
 * @param {{
 *    image: string,
 *    text: string
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.contentTitle_ = function(opt_data, opt_ignored, opt_ijData) {
  goog.asserts.assert(goog.isString(opt_data.image) || (opt_data.image instanceof goog.soy.data.SanitizedContent), "expected param 'image' of type string|goog.soy.data.SanitizedContent.");
  var image = /** @type {string|goog.soy.data.SanitizedContent} */ (opt_data.image);
  goog.asserts.assert(goog.isString(opt_data.text) || (opt_data.text instanceof goog.soy.data.SanitizedContent), "expected param 'text' of type string|goog.soy.data.SanitizedContent.");
  var text = /** @type {string|goog.soy.data.SanitizedContent} */ (opt_data.text);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-school__content-header">' + ((image != null) ? '' : '') + '<div class="l-school__content-header-text">' + soy.$$escapeHtml(text) + '</div></div>');
};
if (goog.DEBUG) {
  sm.lSchool.Template.contentTitle_.soyTemplateName = 'sm.lSchool.Template.contentTitle_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.classes_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-school__content-block">' + sm.lSchool.Template.contentTitle_({image: '123.png', text: '\u043A\u043B\u0430\u0441\u0441\u044B \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F'}, null, opt_ijData) + soy.$$escapeHtml(opt_data.params.classesStr) + '</div>');
};
if (goog.DEBUG) {
  sm.lSchool.Template.classes_.soyTemplateName = 'sm.lSchool.Template.classes_';
}


/**
 * @param {{
 *    data: !Array.<{href: string, link: string, name: string}>
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.sites_ = function(opt_data, opt_ignored, opt_ijData) {
  var data = goog.asserts.assertArray(opt_data.data, "expected parameter 'data' of type list<[href: string, link: string, name: string]>.");
  var output = '<div class="l-school__content-block">' + sm.lSchool.Template.contentTitle_({image: '123.png', text: '\u0421\u0430\u0439\u0442\u044B'}, null, opt_ijData);
  var recordList1753 = data;
  var recordListLen1753 = recordList1753.length;
  for (var recordIndex1753 = 0; recordIndex1753 < recordListLen1753; recordIndex1753++) {
    var recordData1753 = recordList1753[recordIndex1753];
    output += '<div class="l-school__site-record"><div class="l-school__link-record"><a href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(recordData1753.href)) + '" target="_blank" class="l-school__link">' + soy.$$escapeHtml(recordData1753.name) + '</a><div class="l-school__link-image"></div></div>' + ((recordData1753.link) ? '<div class="l-school__site-name">' + soy.$$escapeHtml(recordData1753.link) + '</div>' : '') + '</div>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.Template.sites_.soyTemplateName = 'sm.lSchool.Template.sites_';
}


/**
 * @param {{
 *    data: !Array.<{href: string, name: string}>
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.social_ = function(opt_data, opt_ignored, opt_ijData) {
  var data = goog.asserts.assertArray(opt_data.data, "expected parameter 'data' of type list<[href: string, name: string]>.");
  var output = '';
  if (data.length > 0) {
    output += '<div class="l-school__content-block">' + sm.lSchool.Template.contentTitle_({image: '123.png', text: '\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438'}, null, opt_ijData);
    var recordList1774 = data;
    var recordListLen1774 = recordList1774.length;
    for (var recordIndex1774 = 0; recordIndex1774 < recordListLen1774; recordIndex1774++) {
      var recordData1774 = recordList1774[recordIndex1774];
      output += '<div class="l-school__link-record"><a href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(recordData1774.href)) + '" class="l-school__link">' + soy.$$escapeHtml(recordData1774.name) + '</a><div class="l-school__link-image"></div></div>';
    }
    output += '</div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.Template.social_.soyTemplateName = 'sm.lSchool.Template.social_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.information_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block"><div class="b-data-block b-data-block__content">\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 ' + soy.$$escapeHtml(opt_data.params.classes) + '</div><div class="b-data-block b-data-block__content">\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440 - ' + soy.$$escapeHtml(opt_data.params.directorName) + '</div></div>');
};
if (goog.DEBUG) {
  sm.lSchool.Template.information_.soyTemplateName = 'sm.lSchool.Template.information_';
}


/**
 * @param {{
 *    dirName: string
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.director_ = function(opt_data, opt_ignored, opt_ijData) {
  goog.asserts.assert(goog.isString(opt_data.dirName) || (opt_data.dirName instanceof goog.soy.data.SanitizedContent), "expected param 'dirName' of type string|goog.soy.data.SanitizedContent.");
  var dirName = /** @type {string|goog.soy.data.SanitizedContent} */ (opt_data.dirName);
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-school__content-block">' + sm.lSchool.Template.contentTitle_({image: '123.png', text: '\u0414\u0418\u0420\u0415\u041A\u0422\u041E\u0420'}, null, opt_ijData) + '<div class="l-school__director-name">' + soy.$$escapeHtml(dirName) + '</div></div>');
};
if (goog.DEBUG) {
  sm.lSchool.Template.director_.soyTemplateName = 'sm.lSchool.Template.director_';
}


/**
 * @param {{
 *    comments: !Array.<{author: string, rank: string, sections: !Array.<{name: string, value: number}>, text: string}>
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.comments_ = function(opt_data, opt_ignored, opt_ijData) {
  var comments = goog.asserts.assertArray(opt_data.comments, "expected parameter 'comments' of type list<[author: string, rank: string, sections: list<[name: string, value: int]>, text: string]>.");
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-school__section">' + ((comments.length > 0) ? '<div class="l-school__content-comments"><div class="l-school__content-column l-school__content-column_small">' + sm.lSchool.Template.contentTitle_({image: '123.png', text: '\u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u0438 \u043E\u0446\u0435\u043D\u043A\u0438'}, null, opt_ijData) + '</div><div class="l-school__content-column l-school__content-column_double-width l-school__content-column_last">' + sm.lSchool.bComments.Template.base({params: {comments: comments}}, null, opt_ijData) + '</div></div>' : '<div class="l-school__horisontal-line"></div><div class="l-school__comments-placeholder">\u041D\u0438\u043A\u0442\u043E \u043F\u043E\u043A\u0430 \u043D\u0435 \u043E\u0441\u0442\u0430\u0432\u0438\u043B \u043E\u0442\u0437\u044B\u0432 \u043E\u0431 \u044D\u0442\u043E\u0439 \u0448\u043A\u043E\u043B\u0435. <span class="l-school__comments-placeholder-link">\u0421\u0442\u0430\u043D\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u043C!</span></div>') + '<div class="l-school__horisontal-line"></div></div>');
};
if (goog.DEBUG) {
  sm.lSchool.Template.comments_.soyTemplateName = 'sm.lSchool.Template.comments_';
}


/**
 * @param {{
 *    data: {phones: !Array.<string>, stages: !Array.<{addresses: !Array.<{description: string, metroStations: !Array.<{id: number, name: string}>, title: string}>, name: string}>}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.Template.contacts_ = function(opt_data, opt_ignored, opt_ijData) {
  var data = goog.asserts.assertObject(opt_data.data, "expected parameter 'data' of type [phones: list<string>, stages: list<[addresses: list<[description: string, metroStations: list<[id: float|int, name: string]>, title: string]>, name: string]>].");
  var output = '<div class="l-school__content-block">' + sm.lSchool.Template.contentTitle_({image: '123.png', text: '\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B'}, null, opt_ijData);
  var stageRecordList1816 = data.stages;
  var stageRecordListLen1816 = stageRecordList1816.length;
  for (var stageRecordIndex1816 = 0; stageRecordIndex1816 < stageRecordListLen1816; stageRecordIndex1816++) {
    var stageRecordData1816 = stageRecordList1816[stageRecordIndex1816];
    var addressList1817 = stageRecordData1816.addresses;
    var addressListLen1817 = addressList1817.length;
    for (var addressIndex1817 = 0; addressIndex1817 < addressListLen1817; addressIndex1817++) {
      var addressData1817 = addressList1817[addressIndex1817];
      output += '<div class="l-school__contacts-record">' + ((addressData1817.title) ? '<div class="l-school__contacts-subtitle">' + soy.$$escapeHtml(addressData1817.title) + '</div>' : '') + soy.$$escapeHtml(addressData1817.description) + '</div>';
    }
  }
  var phoneList1828 = data.phones;
  var phoneListLen1828 = phoneList1828.length;
  for (var phoneIndex1828 = 0; phoneIndex1828 < phoneListLen1828; phoneIndex1828++) {
    var phoneData1828 = phoneList1828[phoneIndex1828];
    output += soy.$$escapeHtml(phoneData1828) + ((! (phoneIndex1828 == phoneListLen1828 - 1)) ? ', ' : '');
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.Template.contacts_.soyTemplateName = 'sm.lSchool.Template.contacts_';
}
// This file was automatically generated from l-search.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearch.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearch == 'undefined') { sm.lSearch = {}; }
if (typeof sm.lSearch.Template == 'undefined') { sm.lSearch.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>\u0428\u043A\u043E\u043B\u044B \u041C\u0435\u043B\u0430</title><link href=\'https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link href=\'https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link rel="stylesheet" href="/clobl.build.css"><link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"><link rel="stylesheet" href="/styles.css"></head><body><div class="l-search">' + sm.bHeader.Template.base({params: {url: ''}}, null, opt_ijData) + '<div class="l-search__body">' + sm.lSearch.Template.header_({params: {city: opt_data.params.currentCity}}, null, opt_ijData) + sm.lSearch.Template.search_({params: {examples: opt_data.params.examples, templates: {search: opt_data.params.searchTemplates.search, item: opt_data.params.searchTemplates.item, text: opt_data.params.searchTemplates.text, value: opt_data.params.searchTemplates.value}}}, null, opt_ijData) + sm.bPopularSchools.Template.base({params: {popularSchools: opt_data.params.popularSchools}}, null, opt_ijData) + '</div><div class="l-search__footer"><div class="l-search__horisontal-line"></div>' + sm.lSchool.bFooter.Template.base(null, null, opt_ijData) + '</div></div><script type="text/javascript" src="/external.min.js"><\/script><script type="text/javascript">var CLOSURE_NO_DEPS = true;<\/script><script type="text/javascript" src="/l-search.js"><\/script></body></html>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.base.soyTemplateName = 'sm.lSearch.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.header_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__header"><div class="l-search__title">\u0428\u043A\u043E\u043B\u044B <span class="l-search__title-space">\u00AB\u041C\u0435\u043B\u0430\u00BB</span></div><div class="l-search__geoposition"><div class="b-icon_img_red-pin l-search__pin"></div><div class="l-search__city">' + soy.$$escapeHtml(opt_data.params.city) + '</div></div><div class="l-search__inscription">\u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u0448\u043A\u043E\u043B\u0443, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0432\u0430\u0448\u0435\u043C\u0443 \u0440\u0435\u0431\u0451\u043D\u043A\u0443</div></div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.header_.soyTemplateName = 'sm.lSearch.Template.header_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.search_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__top-menu"><div class="l-search__left-text">\u0427\u0442\u043E \u0432\u044B \u0438\u0449\u0435\u0442\u0435?</div><div class="l-search__search"><div class="l-search__search-field">' + sm.bSearch.Template.base({params: {placeholder: '', theme: 'main', redirect: true, templates: {search: (opt_data.params == null) ? null : opt_data.params.templates.search, item: (opt_data.params == null) ? null : opt_data.params.templates.item, text: (opt_data.params == null) ? null : opt_data.params.templates.text, value: (opt_data.params == null) ? null : opt_data.params.templates.value}}}, null, opt_ijData) + '</div></div>' + sm.lSearch.Template.button_({params: {text: '\u041D\u0430\u0439\u0442\u0438 \u0448\u043A\u043E\u043B\u0443', theme: 'search'}}, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.search_.soyTemplateName = 'sm.lSearch.Template.search_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.banner_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__rating-img"></div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.banner_.soyTemplateName = 'sm.lSearch.Template.banner_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.content_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__content"><div class="l-search__item"><div class="l-search__content-title">\u0425\u043E\u0440\u043E\u0448\u043A\u043E\u043B\u0430</div><img class="l-search__advertising-img" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.images[0])) + '" /><div class="l-search__advertising-address">\u043C. \u041E\u043A\u0442\u044F\u0431\u0440\u044C\u0441\u043A\u043E\u0435 \u043F\u043E\u043B\u0435, \u0421\u043E\u043A\u043E\u043B, \u0443\u043B. \u041C\u0430\u0440\u0448\u0430\u043B\u0430 \u0422\u0443\u0445\u0430\u0447\u0435\u0432\u0441\u043A\u043E\u0433\u043E, 45, \u043A. 2</div><div class="l-search__content-text">\u041F\u0440\u043E\u0433\u0438\u043C\u043D\u0430\u0437\u0438\u044F (\u0434\u0435\u0442\u0441\u043A\u0438\u0439 \u0441\u0430\u0434 \u0438 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0430\u044F \u0448\u043A\u043E\u043B\u0430), \u0434\u0435\u043A\u043B\u0430\u0440\u0438\u0440\u0443\u044E\u0449\u0430\u044F \u0441\u0432\u043E\u0438\u043C \u0433\u043B\u0430\u0432\u043D\u044B\u043C \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E\u043C \u043C\u0435\u0442\u043E\u0434 \u0440\u043E\u0432\u0435\u0441\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F</div><div class="l-search__advertising-footer">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</div></div><div class="l-search__item l-search__item_even"><div class="l-search__content-title">\u0422\u0435\u0441\u0442 \u0434\u043B\u044F \u0448\u043A\u043E\u043B\u044C\u043D\u0438\u043A\u0430</div><div class="l-search__content-text">\u0427\u0430\u0441\u0442\u043E \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0438 \u0434\u0443\u043C\u0430\u044E\u0442,<br> \u0447\u0442\u043E \u0445\u043E\u0440\u043E\u0448\u043E \u0437\u043D\u0430\u044E\u0442 \u0441\u0432\u043E\u0435\u0433\u043E \u0440\u0435\u0431\u0451\u043D\u043A\u0430, \u043D\u043E \u043D\u0435 \u0432\u0441\u0435\u0433\u0434\u0430 \u044D\u0442\u043E \u0442\u0430\u043A.<div class="l-search__content-emptyline"></div>\u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u043C\u044B \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0442\u0435\u0441\u0442 \u0447\u0442\u043E\u0431\u044B \u0432\u0430\u0448 \u0440\u0435\u0431\u0451\u043D\u043E\u043A \u0441\u0430\u043C \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u043B \u043E \u0441\u0435\u0431\u0435</div><div class="l-search__content-button">' + sm.lSearch.Template.button_({params: {text: '\u041F\u0440\u043E\u0439\u0442\u0438 \u0442\u0435\u0441\u0442', theme: 'content'}}, null, opt_ijData) + '</div></div><div class="l-search__item"><div class="l-search__content-title">\u041F\u043E\u0434\u0431\u043E\u0440\u043A\u0438 \u0448\u043A\u043E\u043B</div><ul class="l-search__list"><li>\u0414\u043B\u044F \u043E\u0442\u043B\u0438\u0447\u043D\u0438\u043A\u0430</li><li>\u0414\u043B\u044F \u0434\u0432\u043E\u0435\u0447\u043D\u0438\u043A\u0430</li><li>\u0421 \u0433\u0443\u043C\u0430\u043D\u0438\u0442\u0430\u0440\u043D\u044B\u043C \u0443\u043A\u043B\u043E\u043D\u043E\u043C</li><li>\u0421 \u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u0443\u043A\u043B\u043E\u043D\u043E\u043C</li><li>\u0414\u043B\u044F \u0431\u0443\u0434\u0443\u0449\u0435\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u043C\u0435\u043D\u0430</li><li>\u0412\u044B\u0441\u043E\u043A\u0438\u0439 \u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u0415\u0413\u042D</li><li>\u041D\u043E\u0432\u0430\u0442\u043E\u0440\u0441\u043A\u0438\u0435 \u0448\u043A\u043E\u043B\u044B</li></ul></div><div class="l-search__item l-search__item_even l-search__item_last"><img class="l-search__article-img" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.params.images[1])) + '" /><div class="l-search__article-quote">\u00AB\u0426\u0435\u043B\u044C \u0448\u043A\u043E\u043B\u044B \u2014 \u0441\u043B\u043E\u043C\u0430\u0442\u044C \u0432\u043E\u043B\u044E \u0440\u0435\u0431\u0435\u043D\u043A\u0430\u00BB</div><div class="l-search__article-title">\u0410\u043D\u0442\u043E\u043D \u0414\u043E\u043B\u0438\u043D \u2014 \u043E \u0448\u043A\u043E\u043B\u0435 \u0441 \u0448\u0435\u0441\u0442\u0438 \u043B\u0435\u0442, \u043F\u043E\u0434\u043B\u0438\u043D\u043D\u043E\u0439 \u0441\u0432\u043E\u0431\u043E\u0434\u0435 \u0438 \u0443\u0447\u0438\u0442\u0435\u043B\u044F\u0445 \u043A\u0430\u043A \u043D\u0435\u0432\u043E\u043B\u044C\u043D\u044B\u0445 \u043F\u0430\u043B\u0430\u0447\u0430\u0445</div></div></div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.content_.soyTemplateName = 'sm.lSearch.Template.content_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearch.Template.button_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search__button l-search__button_' + soy.$$escapeHtmlAttribute(opt_data.params.theme) + '"><span class="l-search__button-text">' + soy.$$escapeHtml(opt_data.params.text) + '</span></div>');
};
if (goog.DEBUG) {
  sm.lSearch.Template.button_.soyTemplateName = 'sm.lSearch.Template.button_';
}
// This file was automatically generated from l-search-result.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.Template == 'undefined') { sm.lSearchResult.Template = {}; }


/**
 * @param {{
 *    params: {countResults: number, data: {filters: {filters: !Array.<{config: {cannotBeHidden: boolean}, data: {filters: !Array.<{label: string, value: string}>, header: {help: string, title: string}, name: string}}>, url: string}, schools: !Array.<{currentCriterion: {name: string, value: number}, description: string, id: number, metroStations: !Array.<string>, name: {bold: string, light: string}, ratings: !Array.<string>, score: !Array.<{name: string, value: number}>, url: string}>}, searchSettings: {data: {page: number, searcParams: {areaId: number, metroId: number, name: string}}, method: string, url: string}, searchText: string, templates: {item: string, search: string, text: string, value: string}}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var params = goog.asserts.assertObject(opt_data.params, "expected parameter 'params' of type [countResults: float|int, data: [filters: [filters: list<[config: [cannotBeHidden: bool], data: [filters: list<[label: string, value: string]>, header: [help: string, title: string], name: string]]>, url: string], schools: list<[currentCriterion: [name: string, value: float|int], description: string, id: float|int, metroStations: list<string>, name: [bold: string, light: string], ratings: list<string>, score: list<[name: string, value: float|int]>, url: string]>], searchSettings: [data: [page: float|int, searcParams: [areaId: float|int, metroId: float|int, name: string]], method: string, url: string], searchText: string, templates: [item: string, search: string, text: string, value: string]].");
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u043D\u0430 \u0428\u043A\u043E\u043B\u0430\u0445 \u041C\u0435\u043B\u0430</title><link href=\'https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link href=\'https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic\' rel=\'stylesheet\' type=\'text/css\'><link rel="stylesheet" href="/clobl.build.css"><link rel="stylesheet" href="/styles.css"><link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"></head><body><div class="l-search-result" data-params="' + soy.$$escapeHtmlAttribute(gorod.iUtils.stringify({json: params.searchSettings}, null, opt_ijData)) + '"><div class="l-search-result__header">' + sm.bHeader.Template.base({params: {url: '/', searchText: params.searchText, searchRedirect: true, templates: {search: params.templates.search, item: params.templates.item, text: params.templates.text, value: params.templates.value}, notShowLink: 'true'}}, null, opt_ijData) + '</div><div class="l-search-result__body">' + sm.lSearchResult.Template.leftMenu_(opt_data, null, opt_ijData) + '<div class="l-search-result__results-section"><div class="l-search-result__list-header">' + sm.lSearchResult.Template.listHeader_(opt_data, null, opt_ijData) + '</div><div class="l-search-result__list-body' + soy.$$escapeHtmlAttribute(params.countResults ? '' : ' i-utils__hidden') + '">' + sm.lSearchResult.bSchoolList.Template.base({params: {schools: params.data.schools}}, null, opt_ijData) + '</div></div></div></div><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"><\/script><script type="text/javascript" src="/external.min.js"><\/script><script type="text/javascript">var CLOSURE_NO_DEPS = true;<\/script><script type="text/javascript" src="/l-search-result.js"><\/script></body></html>');
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.base.soyTemplateName = 'sm.lSearchResult.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.listHeader_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search-result__list-header"><span class="l-search-result__list-header-text">' + ((opt_data.params.searchText.length) ? '\u041F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 <span class="l-search-result__list-header-text l-search-result__list-header-text_strong">\u00AB' + soy.$$escapeHtml(opt_data.params.searchText) + '\u00BB</span> ' : '\u041F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443 ') + '\u043C\u044B <span class="l-search-result__list-header-text l-search-result__list-header-text_change">' + sm.lSearchResult.Template.generateHeaderText({params: {countResults: opt_data.params.countResults}}, null, opt_ijData) + '</span></span></div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.listHeader_.soyTemplateName = 'sm.lSearchResult.Template.listHeader_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.generateHeaderText = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.params.countResults == 0) {
    output += '\u043D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E.';
  } else {
    output += '\u043D\u0430\u0448\u043B\u0438 <span class="l-search-result__list-header-text l-search-result__list-header-text_strong l-search-result__list-header-text_amount">' + soy.$$escapeHtml(opt_data.params.countResults) + ' ';
    if (opt_data.params.countResults > 100) {
      var lastTwoNumbers__soy1920 = opt_data.params.countResults % 100;
      output += sm.lSearchResult.Template.getEnding_({params: {number: lastTwoNumbers__soy1920}}, null, opt_ijData);
    } else {
      output += sm.lSearchResult.Template.getEnding_({params: {number: opt_data.params.countResults}}, null, opt_ijData);
    }
    output += '</span>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.generateHeaderText.soyTemplateName = 'sm.lSearchResult.Template.generateHeaderText';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.getEnding_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.params.number >= 11 && opt_data.params.number <= 19) {
    output += '\u0448\u043A\u043E\u043B';
  } else {
    var lastNumber__soy1932 = opt_data.params.number % 10;
    output += (lastNumber__soy1932 == 1) ? '\u0448\u043A\u043E\u043B\u0443' : (lastNumber__soy1932 >= 2 && lastNumber__soy1932 <= 4) ? '\u0448\u043A\u043E\u043B\u044B' : '\u0448\u043A\u043E\u043B';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.getEnding_.soyTemplateName = 'sm.lSearchResult.Template.getEnding_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.leftMenu_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search-result__left-menu">' + sm.lSearchResult.Template.filters_(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.leftMenu_.soyTemplateName = 'sm.lSearchResult.Template.leftMenu_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.Template.filters_ = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-search-result__filters">' + sm.lSearchResult.bFilters.Template.base({params: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.filters}, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.Template.filters_.soyTemplateName = 'sm.lSearchResult.Template.filters_';
}
// This file was automatically generated from b-score_school-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.bScoreSchoolList.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.bScoreSchoolList == 'undefined') { sm.bScoreSchoolList = {}; }
if (typeof sm.bScoreSchoolList.Template == 'undefined') { sm.bScoreSchoolList.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScoreSchoolList.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bScoreSchoolList.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.bScoreSchoolList.Template.base.soyTemplateName = 'sm.bScoreSchoolList.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScoreSchoolList.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-score b-score_school-list"><div class="b-score__current-criterion-name i-utils__hidden">' + soy.$$escapeHtml(opt_data.params.sortCriteria.name) + '</div><div class="b-score__current-criterion-value">' + sm.bMark.Template.base({params: {value: opt_data.params.sortCriteria.value, display: 'inline', config: {bigText: true, notShowDashes: true}}}, null, opt_ijData) + '</div><div class="b-score__other-marks i-utils__hidden"><div class="b-score__arrow"><div class="b-score__arrow-shadow"></div></div>' + ((opt_data.params.score.length > 0) ? sm.bScoreSchoolList.Template.scoreItems({params: {data: opt_data.params.score}}, null, opt_ijData) : '') + '</div></div>');
};
if (goog.DEBUG) {
  sm.bScoreSchoolList.Template.init.soyTemplateName = 'sm.bScoreSchoolList.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.bScoreSchoolList.Template.scoreItems = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul><li class="b-score__mark-item">\u041E\u0446\u0435\u043D\u043A\u0438, \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C\u0438</li>';
  var itemList1966 = opt_data.params.data;
  var itemListLen1966 = itemList1966.length;
  for (var itemIndex1966 = 0; itemIndex1966 < itemListLen1966; itemIndex1966++) {
    var itemData1966 = itemList1966[itemIndex1966];
    output += '<li class="b-score__mark-item"><div class="b-score__mark-name">' + soy.$$escapeHtml(itemData1966.name) + '</div><div class="b-score__mark-value">' + sm.bMark.Template.base({params: {value: itemData1966.value, display: 'number'}}, null, opt_ijData) + '</div></li>';
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.bScoreSchoolList.Template.scoreItems.soyTemplateName = 'sm.bScoreSchoolList.Template.scoreItems';
}
// This file was automatically generated from b-comment.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bComment.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bComment == 'undefined') { sm.lSchool.bComment = {}; }
if (typeof sm.lSchool.bComment.Template == 'undefined') { sm.lSchool.bComment.Template = {}; }


/**
 * @param {{
 *    params: {author: string, rank: string, sections: !Array.<{name: string, value: number}>, text: string}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bComment.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var params = goog.asserts.assertObject(opt_data.params, "expected parameter 'params' of type [author: string, rank: string, sections: list<[name: string, value: int]>, text: string].");
  var output = '<div class="b-comment">';
  if (params.sections.length) {
    output += '<div class="b-comment__header">';
    var sectionList1981 = params.sections;
    var sectionListLen1981 = sectionList1981.length;
    for (var sectionIndex1981 = 0; sectionIndex1981 < sectionListLen1981; sectionIndex1981++) {
      var sectionData1981 = sectionList1981[sectionIndex1981];
      output += sm.lSchool.bComment.Template.section_({params: {name: sectionData1981.name, rating: sectionData1981.value}}, null, opt_ijData);
    }
    output += '</div>';
  }
  output += '<div class="b-comment__wrap">' + ((('' + params.text).length > 430) ? '<span class="b-comment__text">' + soy.$$escapeHtml(soy.$$truncate(params.text, 430, true)) + '</span><span class="b-comment__text b-comment__text_hidden">' + soy.$$escapeHtml(params.text) + '</span><div class="b-comment__spoiler">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E</div>' : '<span class="b-comment__text">' + soy.$$escapeHtml(params.text) + '</span>') + '</div><div class="b-comment__footer"><img class="b-comment__avatar" align="top" src="/images/l-school/b-comment/person.png"><div class="b-comment__author">' + soy.$$escapeHtml(params.author) + ', ' + soy.$$escapeHtml(params.rank) + '</div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bComment.Template.base.soyTemplateName = 'sm.lSchool.bComment.Template.base';
}


/**
 * @param {{
 *    params: {name: string, rating: number}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bComment.Template.section_ = function(opt_data, opt_ignored, opt_ijData) {
  var params = goog.asserts.assertObject(opt_data.params, "expected parameter 'params' of type [name: string, rating: int].");
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((params.rating > 0) ? '<div class="b-comment__header-section"><div class="b-comment__header-section-name">' + soy.$$escapeHtml(params.name) + '</div><div class="b-comment__stars-rating">' + sm.bStars.Template.base({params: {data: {mark: params.rating}, isClickable: false}}, null, opt_ijData) + '</div></div>' : '');
};
if (goog.DEBUG) {
  sm.lSchool.bComment.Template.section_.soyTemplateName = 'sm.lSchool.bComment.Template.section_';
}
// This file was automatically generated from b-comments.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bComments.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bComments == 'undefined') { sm.lSchool.bComments = {}; }
if (typeof sm.lSchool.bComments.Template == 'undefined') { sm.lSchool.bComments.Template = {}; }


/**
 * @param {{
 *    params: {comments: !Array.<{author: string, rank: string, sections: !Array.<{name: string, value: number}>, text: string}>}
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bComments.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var params = goog.asserts.assertObject(opt_data.params, "expected parameter 'params' of type [comments: list<[author: string, rank: string, sections: list<[name: string, value: int]>, text: string]>].");
  var output = '<div class="b-comments">';
  var commentList2016 = params.comments;
  var commentListLen2016 = commentList2016.length;
  for (var commentIndex2016 = 0; commentIndex2016 < commentListLen2016; commentIndex2016++) {
    var commentData2016 = commentList2016[commentIndex2016];
    output += sm.lSchool.bComment.Template.base({params: {author: commentData2016.author, rank: commentData2016.rank, text: commentData2016.text, sections: commentData2016.sections}}, null, opt_ijData);
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bComments.Template.base.soyTemplateName = 'sm.lSchool.bComments.Template.base';
}
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
// This file was automatically generated from b-feedback-modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bFeedbackModal.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bFeedbackModal == 'undefined') { sm.lSchool.bFeedbackModal = {}; }
if (typeof sm.lSchool.bFeedbackModal.Template == 'undefined') { sm.lSchool.bFeedbackModal.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bFeedbackModal.Template.feedback = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="b-feedback i-utils__hidden">';
  var html__soy2061 = '' + sm.lSchool.bFeedbackModal.Template.modal(opt_data, null, opt_ijData);
  html__soy2061 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(html__soy2061);
  output += soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'modal', renderParams: {data: html__soy2061}}}, null, opt_ijData)) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bFeedbackModal.Template.feedback.soyTemplateName = 'sm.lSchool.bFeedbackModal.Template.feedback';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bFeedbackModal.Template.modal = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<form class="b-feedback__form" method="POST" action="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.url) != null ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.url) : '')) + '"><div class="b-feedback__content"><div class="b-feedback__close-control b-icon_img_close-dialog"></div><div class="b-feedback__title">\u0412\u0430\u0448 \u043E\u0442\u0437\u044B\u0432</div>' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'textarea', renderParams: {data: {placeholder: '\u0412\u0430\u0448 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439', name: 'text'}, config: {autoHeight: true}}}}, null, opt_ijData)) + sm.lSchool.bFeedbackModal.Template.whoAreYou_(null, null, opt_ijData) + '<div class="b-feedback__title-scores">\u0412\u0430\u0448\u0438 \u043E\u0446\u0435\u043D\u043A\u0438</div>' + sm.lSchool.bFeedbackModal.Template.score_(null, null, opt_ijData) + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'button', renderParams: {data: '\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432', config: {theme: 'sienna'}}}}, null, opt_ijData)) + '</div></form>');
};
if (goog.DEBUG) {
  sm.lSchool.bFeedbackModal.Template.modal.soyTemplateName = 'sm.lSchool.bFeedbackModal.Template.modal';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bFeedbackModal.Template.whoAreYou_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var userTypes__soy2079 = [{title: '\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C', value: 'Parent'}, {title: '\u0412\u044B\u043F\u0443\u0441\u043A\u043D\u0438\u043A', value: 'Graduate'}, {title: '\u0423\u0447\u0435\u043D\u0438\u043A', value: 'Scholar'}];
  output += '<div class="b-feedback__who-are-you"><div class="b-feedback__title b-feedback__title_sub b-feedback__title_who-are-you">\u041A\u0442\u043E \u0432\u044B?</div><ul class="b-feedback__user-types">';
  var userTypeList2081 = userTypes__soy2079;
  var userTypeListLen2081 = userTypeList2081.length;
  for (var userTypeIndex2081 = 0; userTypeIndex2081 < userTypeListLen2081; userTypeIndex2081++) {
    var userTypeData2081 = userTypeList2081[userTypeIndex2081];
    output += '<li class="b-feedback__user-type"><input class="b-feedback__radio" id="b-feedback__user-type-' + soy.$$escapeHtmlAttribute(userTypeIndex2081) + '" type="radio" name="userType" value="' + soy.$$escapeHtmlAttribute(userTypeData2081.value) + '" /><label class="b-feedback__radio-label" for="b-feedback__user-type-' + soy.$$escapeHtmlAttribute(userTypeIndex2081) + '">' + soy.$$escapeHtml(userTypeData2081.title) + '</label></li>';
  }
  output += '</ul></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bFeedbackModal.Template.whoAreYou_.soyTemplateName = 'sm.lSchool.bFeedbackModal.Template.whoAreYou_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bFeedbackModal.Template.score_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var scores__soy2094 = [{name: 'score[]', title: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', description: '\u0414\u043E\u0441\u0442\u0438\u0433\u0430\u044E\u0442 \u043B\u0438 \u0443\u0447\u0435\u043D\u0438\u043A\u0438 \u044D\u0442\u043E\u0439 \u0448\u043A\u043E\u043B\u044B \u0434\u043E\u0441\u0442\u0438\u0433\u0430\u044E\u0442 \u0432\u044B\u0441\u043E\u043A\u0438\u0445 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043D\u0430 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430\u0445?'}, {name: 'score[]', title: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', description: '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043B\u0438 \u0443\u0447\u0438\u0442\u0435\u043B\u044F \u044D\u0442\u043E\u0439 \u0448\u043A\u043E\u043B\u044B \u2014 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043B\u044E\u0431\u044F\u0442 \u0441\u0432\u043E\u044E \u0440\u0430\u0431\u043E\u0442\u0443, \u0445\u043E\u0440\u043E\u0448\u043E \u043E\u0431\u0449\u0430\u044E\u0442\u0441\u044F \u0441 \u0434\u0435\u0442\u044C\u043C\u0438\u0438 \u043F\u043E\u043C\u043E\u0433\u0430\u044E\u0442 \u0438\u043C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u0435 \u0437\u043D\u0430\u043D\u0438\u044F?'}, {name: 'score[]', title: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', description: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430 \u0432 \u0448\u043A\u043E\u043B\u0435, \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u043C\u0435\u0436\u0434\u0443 \u0443\u0447\u0435\u043D\u0438\u043A\u0430\u043C\u0438, \u0443\u0447\u0438\u0442\u0435\u043B\u044F\u043C\u0438, \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044F\u043C\u0438 \u0438 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439 \u0441\u043E\u0437\u0434\u0430\u044E\u0442 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u0443\u044E \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0437\u043D\u0430\u043D\u0438\u0439 \u0441\u0440\u0435\u0434\u0443?'}, {name: 'score[]', title: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', description: '\u042D\u0442\u0430 \u0448\u043A\u043E\u043B\u0430 \u043E\u0442\u043B\u0438\u0447\u043D\u043E \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0430, \u0432 \u043D\u0435\u0439 \u0435\u0441\u0442\u044C \u0432\u0441\u0451 \u0434\u043B\u044F \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E\u0433\u043E \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u0438 \u0432\u0441\u0435\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0435\u0433\u043E \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044F \u0434\u0435\u0442\u0435\u0439?'}];
  output += '<ul class="b-feedback__scores">';
  var scoreList2096 = scores__soy2094;
  var scoreListLen2096 = scoreList2096.length;
  for (var scoreIndex2096 = 0; scoreIndex2096 < scoreListLen2096; scoreIndex2096++) {
    var scoreData2096 = scoreList2096[scoreIndex2096];
    output += '<li class="b-feedback__score"><div class="b-feedback__title-score">' + soy.$$escapeHtml(scoreData2096.title) + '</div>' + sm.bStars.Template.base({params: {data: {mark: 0}, config: {style: {theme: 'colored', size: 'large'}, isClickable: true}}}, null, opt_ijData) + '<div class="b-feedback__description">' + soy.$$escapeHtml(scoreData2096.description) + '</div></li>';
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bFeedbackModal.Template.score_.soyTemplateName = 'sm.lSchool.bFeedbackModal.Template.score_';
}
// This file was automatically generated from b-footer.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bFooter.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bFooter == 'undefined') { sm.lSchool.bFooter = {}; }
if (typeof sm.lSchool.bFooter.Template == 'undefined') { sm.lSchool.bFooter.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bFooter.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-schools-footer"><div class="b-schools-footer__left-block"><div class="b-schools-footer__link">\u00A9 \u041C\u0435\u043B, 2015</div></div></div>');
};
if (goog.DEBUG) {
  sm.lSchool.bFooter.Template.base.soyTemplateName = 'sm.lSchool.bFooter.Template.base';
}
// This file was automatically generated from b-map.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bMap.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bMap == 'undefined') { sm.lSchool.bMap = {}; }
if (typeof sm.lSchool.bMap.Template == 'undefined') { sm.lSchool.bMap.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bMap.Template.map = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var dataParams__soy2112 = '' + soy.$$escapeHtml(cl.iUtils.Utils.stringify({json: (opt_data.params == null) ? null : opt_data.params.data}, null, opt_ijData));
  dataParams__soy2112 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(dataParams__soy2112);
  output += '<div class="b-map" data-params="' + soy.$$escapeHtmlAttribute(dataParams__soy2112) + '"></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bMap.Template.map.soyTemplateName = 'sm.lSchool.bMap.Template.map';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bMap.Template.api = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<script type="text/javascript" src="//api-maps.yandex.ru/2.1/?lang=ru_RU"><\/script>');
};
if (goog.DEBUG) {
  sm.lSchool.bMap.Template.api.soyTemplateName = 'sm.lSchool.bMap.Template.api';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bMap.Template.balloon = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-map__balloon"><div class="b-map__balloon-name">[if properties.id]<a href="/school/$[properties.url]" class="b-map__href">$[properties.name]</a>[else] $[properties.name] [endif]</div><div class="b-map__balloon-close">' + sm.bIcon.Template.base({params: {spriteCssClass: 'b-icon_img_close-balloon'}}, null, opt_ijData) + '</div><div class="b-map__balloon-description">{% for stage in properties.address.stages %}<div class="b-map__description-item">{{ stage }}</div>{% endfor %}<div class="b-map__description-item">$[properties.address.name]</div></div></div>');
};
if (goog.DEBUG) {
  sm.lSchool.bMap.Template.balloon.soyTemplateName = 'sm.lSchool.bMap.Template.balloon';
}
// This file was automatically generated from b-results.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bResults.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bResults == 'undefined') { sm.lSchool.bResults = {}; }
if (typeof sm.lSchool.bResults.Template == 'undefined') { sm.lSchool.bResults.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bResults.Template.results = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var ege__soy2127 = '' + sm.lSchool.bResults.Template.label_({params: {label: '\u0415\u0413\u042D'}}, null, opt_ijData);
  ege__soy2127 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(ege__soy2127);
  var gia__soy2130 = '' + sm.lSchool.bResults.Template.label_({params: {label: '\u0413\u0418\u0410'}}, null, opt_ijData);
  gia__soy2130 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(gia__soy2130);
  var olymp__soy2133 = '' + sm.lSchool.bResults.Template.label_({params: {label: '\u041E\u041B\u0418\u041C\u041F\u0418\u0410\u0414\u042B'}}, null, opt_ijData);
  olymp__soy2133 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(olymp__soy2133);
  var egeContent__soy2136 = '' + sm.lSchool.bResults.Template.content_({params: {data: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.ege, config: {type: 'ege'}}}, null, opt_ijData);
  egeContent__soy2136 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(egeContent__soy2136);
  var giaContent__soy2139 = '' + sm.lSchool.bResults.Template.content_({params: {data: (opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.gia, config: {type: 'gia'}}}, null, opt_ijData);
  giaContent__soy2139 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(giaContent__soy2139);
  output += '<div class="b-results">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'tab', renderParams: {data: {tabs: [{label: ege__soy2127, content: egeContent__soy2136}, {label: gia__soy2130, content: giaContent__soy2139}, {label: olymp__soy2133, content: olymp__soy2133}]}, config: {theme: 'red'}}}}, null, opt_ijData)) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bResults.Template.results.soyTemplateName = 'sm.lSchool.bResults.Template.results';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bResults.Template.label_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<h3 class="b-results__label">' + soy.$$escapeHtml(opt_data.params.label) + '</h3>');
};
if (goog.DEBUG) {
  sm.lSchool.bResults.Template.label_.soyTemplateName = 'sm.lSchool.bResults.Template.label_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bResults.Template.content_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var content__soy2151 = '' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'list', renderParams: {data: {items: (opt_data.params.data == null) ? null : opt_data.params.data.years}}}}, null, opt_ijData));
  content__soy2151 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(content__soy2151);
  if (opt_data.params.data) {
    var maxValue__soy2156 = opt_data.params.config.type == 'ege' ? 100 : 5;
    output += '<div class="b-results__content">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'dropdown', renderParams: {data: {opener: '2015', content: content__soy2151}, config: {customClasses: ['b-results__dropdown']}}}}, null, opt_ijData));
    var yearResultsList2160 = (opt_data.params.data == null) ? null : opt_data.params.data.results;
    var yearResultsListLen2160 = yearResultsList2160.length;
    for (var yearResultsIndex2160 = 0; yearResultsIndex2160 < yearResultsListLen2160; yearResultsIndex2160++) {
      var yearResultsData2160 = yearResultsList2160[yearResultsIndex2160];
      output += '<div class="b-results__inner-content">' + ((yearResultsData2160.top) ? '<div class="b-results__content-item"><div class="b-results__item-label">\u0412\u044B\u0448\u0435 \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u043F\u043E \u043C\u043E\u0441\u043A\u0432\u0435</div><div class="b-results__item-data">' + sm.bDiagram.Template.base({params: {data: yearResultsData2160.top, maxValue: maxValue__soy2156, display: 'bars', range: (opt_data.params.data == null) ? null : opt_data.params.data.range}}, null, opt_ijData) + '</div></div>' : '') + ((yearResultsData2160.middle) ? '<div class="b-results__content-item"><div class="b-results__item-label">\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C</div><div class="b-results__item-data">' + sm.bDiagram.Template.base({params: {data: yearResultsData2160.middle, maxValue: maxValue__soy2156, display: 'bars', range: (opt_data.params.data == null) ? null : opt_data.params.data.range}}, null, opt_ijData) + '</div></div>' : '') + ((yearResultsData2160.bottom) ? '<div class="b-results__content-item"><div class="b-results__item-label">\u041D\u0438\u0436\u0435 \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E</div><div class="b-results__item-data">' + sm.bDiagram.Template.base({params: {data: yearResultsData2160.bottom, maxValue: maxValue__soy2156, display: 'bars', range: (opt_data.params.data == null) ? null : opt_data.params.data.range}}, null, opt_ijData) + '</div></div>' : '') + '</div>';
    }
    output += '</div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bResults.Template.content_.soyTemplateName = 'sm.lSchool.bResults.Template.content_';
}
// This file was automatically generated from b-filter.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bFilter.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bFilter == 'undefined') { sm.lSearchResult.bFilter = {}; }
if (typeof sm.lSearchResult.bFilter.Template == 'undefined') { sm.lSearchResult.bFilter.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bFilter.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.base.soyTemplateName = 'sm.lSearchResult.bFilter.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.rootClassName = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('b-filter');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.rootClassName.soyTemplateName = 'sm.lSearchResult.bFilter.Template.rootClassName';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(sm.lSearchResult.bFilter.Template.rootClassName(null, null, opt_ijData)) + '">' + sm.lSearchResult.bFilter.Template.header(opt_data, null, opt_ijData) + sm.lSearchResult.bFilter.Template.filters(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.init.soyTemplateName = 'sm.lSearchResult.bFilter.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__header"><span class="b-filter__title">' + soy.$$escapeHtml((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.header == null) ? null : opt_data.params.data.header.title) + '</span>' + (((opt_data.params == null) ? null : (opt_data.params.header == null) ? null : opt_data.params.header.help) ? '<div class="b-filter__help" data-help="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.header == null) ? null : opt_data.params.data.header.help) + '"><img src="/images/l-search-result/b-filter/b-filter__help.png"/></div>' : '') + ((! ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.cannotBeHidden)) ? sm.lSearchResult.bFilter.Template.showFiltersButton(null, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.header.soyTemplateName = 'sm.lSearchResult.bFilter.Template.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.filters = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '';
  var filToShow__soy2209 = ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.filtersToShow) ? ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.filtersToShow) - 1 : 5;
  output += '<div class="b-filter__filters' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.cannotBeHidden) ? '' : ' i-utils__hidden') + '">';
  var iLimit2213 = opt_data.params.data.filters.length;
  for (var i2213 = 0; i2213 < iLimit2213; i2213++) {
    output += sm.lSearchResult.bFilter.Template.filter({params: {filter: opt_data.params.data.filters[i2213], hidden: i2213 > filToShow__soy2209 ? true : false, name: opt_data.params.data.name, id: i2213}}, null, opt_ijData);
  }
  output += ((opt_data.params.data.filters.length > filToShow__soy2209) ? '<div class="b-filter__show-button">\u0415\u0449\u0435 ' + soy.$$escapeHtml(opt_data.params.data.filters.length - filToShow__soy2209 - 1) + ' \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432</div>' : '') + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.filters.soyTemplateName = 'sm.lSearchResult.bFilter.Template.filters';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.filter = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__section ' + soy.$$escapeHtmlAttribute(opt_data.params.hidden ? 'i-utils__hidden' : '') + '"><div class="b-filter__filter"><input type="checkbox" class="b-filter__input" id="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '-' + soy.$$escapeHtmlAttribute(opt_data.params.id) + '" name="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '" value="' + soy.$$escapeHtmlAttribute(opt_data.params.filter.value) + '"/><label for="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '-' + soy.$$escapeHtmlAttribute(opt_data.params.id) + '" class="b-filter__input-label">' + soy.$$escapeHtml(opt_data.params.filter.label) + '</label></div></div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.filter.soyTemplateName = 'sm.lSearchResult.bFilter.Template.filter';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilter.Template.showFiltersButton = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__show-filters-button"><div class="b-filter__show-filters-icon b-icon_img_filter-arrow-down"></div></div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilter.Template.showFiltersButton.soyTemplateName = 'sm.lSearchResult.bFilter.Template.showFiltersButton';
}
// This file was automatically generated from b-filter_classes.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bFilterClasses.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bFilterClasses == 'undefined') { sm.lSearchResult.bFilterClasses = {}; }
if (typeof sm.lSearchResult.bFilterClasses.Template == 'undefined') { sm.lSearchResult.bFilterClasses.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bFilterClasses.Template.init(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.base.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.rootClassName = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('b-filter b-filter_classes');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.rootClassName.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.rootClassName';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.filters = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<div class="b-filter__filters"><div class="b-filter__filter b-filter__filter_center">';
  for (var i2249 = 0; i2249 < 11; i2249++) {
    output += '<input type="radio" id="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '-' + soy.$$escapeHtmlAttribute(i2249 + 1) + '" class="b-filter__input" name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '" value="' + soy.$$escapeHtmlAttribute(i2249 + 1) + '"/><label for="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '-' + soy.$$escapeHtmlAttribute(i2249 + 1) + '" class="b-filter__input-label ' + soy.$$escapeHtmlAttribute(i2249 > 3 ? 'b-filter__input-label_middle ' : '') + soy.$$escapeHtmlAttribute(i2249 > 8 ? 'b-filter__input-label_high' : '') + '">' + soy.$$escapeHtml(i2249 + 1) + '</label>';
  }
  output += '</div><div class="b-filter__filter"><input type="checkbox" class="b-filter__input-ordinary" id="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '-after-school" name="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '" value="0"/><label for="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.name) + '-after-school" class="b-filter__input-label-ordinary">\u0414\u0435\u0442\u0441\u043A\u0438\u0439 \u0441\u0430\u0434 \u043F\u0440\u0438 \u0448\u043A\u043E\u043B\u0435</label></div><div class="b-filter__reset i-utils__hidden">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.filters.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.filters';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.showFiltersButton = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.showFiltersButton.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.showFiltersButton';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="' + soy.$$escapeHtmlAttribute(sm.lSearchResult.bFilterClasses.Template.rootClassName(null, null, opt_ijData)) + '">' + sm.lSearchResult.bFilterClasses.Template.header(opt_data, null, opt_ijData) + sm.lSearchResult.bFilterClasses.Template.filters(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.init.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__header"><span class="b-filter__title">' + soy.$$escapeHtml((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.header == null) ? null : opt_data.params.data.header.title) + '</span>' + (((opt_data.params == null) ? null : (opt_data.params.header == null) ? null : opt_data.params.header.help) ? '<div class="b-filter__help" data-help="' + soy.$$escapeHtmlAttribute((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : (opt_data.params.data.header == null) ? null : opt_data.params.data.header.help) + '"><img src="/images/l-search-result/b-filter/b-filter__help.png"/></div>' : '') + ((! ((opt_data.params == null) ? null : (opt_data.params.config == null) ? null : opt_data.params.config.cannotBeHidden)) ? sm.lSearchResult.bFilterClasses.Template.showFiltersButton(null, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.header.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilterClasses.Template.filter = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-filter__section ' + soy.$$escapeHtmlAttribute(opt_data.params.hidden ? 'i-utils__hidden' : '') + '"><div class="b-filter__filter"><input type="checkbox" class="b-filter__input" id="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '-' + soy.$$escapeHtmlAttribute(opt_data.params.id) + '" name="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '" value="' + soy.$$escapeHtmlAttribute(opt_data.params.filter.value) + '"/><label for="' + soy.$$escapeHtmlAttribute(opt_data.params.name) + '-' + soy.$$escapeHtmlAttribute(opt_data.params.id) + '" class="b-filter__input-label">' + soy.$$escapeHtml(opt_data.params.filter.label) + '</label></div></div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilterClasses.Template.filter.soyTemplateName = 'sm.lSearchResult.bFilterClasses.Template.filter';
}
// This file was automatically generated from b-filters.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bFilters.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bFilters == 'undefined') { sm.lSearchResult.bFilters = {}; }
if (typeof sm.lSearchResult.bFilters.Template == 'undefined') { sm.lSearchResult.bFilters.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bFilters.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<form class="b-filters" method="GET" action="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(((opt_data.params == null) ? null : opt_data.params.url) != null ? ((opt_data.params == null) ? null : opt_data.params.url) : '')) + '">' + sm.lSearchResult.bFilterClasses.Template.base({params: {data: {header: {title: '\u0412 \u043A\u0430\u043A\u043E\u0439 \u043A\u043B\u0430\u0441\u0441 \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u0434\u0430\u0442\u044C \u0440\u0435\u0431\u0435\u043D\u043A\u0430?'}, name: 'classes'}}}, null, opt_ijData);
  var filterList2321 = opt_data.params.filters;
  var filterListLen2321 = filterList2321.length;
  for (var filterIndex2321 = 0; filterIndex2321 < filterListLen2321; filterIndex2321++) {
    var filterData2321 = filterList2321[filterIndex2321];
    output += sm.lSearchResult.bFilter.Template.base({params: filterData2321}, null, opt_ijData);
  }
  output += '<div class="b-filters__submit-button">\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C</div></form>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bFilters.Template.base.soyTemplateName = 'sm.lSearchResult.bFilters.Template.base';
}
// This file was automatically generated from b-school-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bSchoolList.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bSchoolList == 'undefined') { sm.lSearchResult.bSchoolList = {}; }
if (typeof sm.lSearchResult.bSchoolList.Template == 'undefined') { sm.lSearchResult.bSchoolList.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bSchoolList.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<div class="b-school-list"><div class="b-school-list__header"><div class="b-school-list__line"></div><div class="b-school-list__sort">' + sm.lSearchResult.bSort.Template.base(null, null, opt_ijData) + '</div></div><div class="b-school-list__body">';
  var schoolList2331 = opt_data.params.schools;
  var schoolListLen2331 = schoolList2331.length;
  for (var schoolIndex2331 = 0; schoolIndex2331 < schoolListLen2331; schoolIndex2331++) {
    var schoolData2331 = schoolList2331[schoolIndex2331];
    output += sm.lSearchResult.bSchoolListItem.Template.base({params: {id: schoolData2331.id, url: schoolData2331.url, name: schoolData2331.name, score: schoolData2331.score, currentCriterion: schoolData2331.currentCriterion, description: schoolData2331.description, metroStations: schoolData2331.metroStations, ratings: schoolData2331.ratings}}, null, opt_ijData);
  }
  output += '</div><div class="b-school-list__loader i-utils__hidden"><div class="b-school-list__loader-image"></div><div class="b-school-list__loader-text">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0441\u043F\u0438\u0441\u043E\u043A...</div></div><div class="b-school-list__footer"><div class="b-school-list__show-more-button ' + ((opt_data.params.schools.length < 10) ? 'i-utils__hidden' : '') + '">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451</div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bSchoolList.Template.base.soyTemplateName = 'sm.lSearchResult.bSchoolList.Template.base';
}
// This file was automatically generated from b-school-list-item.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bSchoolListItem.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bSchoolListItem == 'undefined') { sm.lSearchResult.bSchoolListItem = {}; }
if (typeof sm.lSearchResult.bSchoolListItem.Template == 'undefined') { sm.lSearchResult.bSchoolListItem.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bSchoolListItem.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-school-list-item" data-params="' + soy.$$escapeHtmlAttribute(cl.iUtils.Utils.stringify({json: opt_data.params}, null, opt_ijData)) + '"><div class="b-school-list-item__section"><a href="/school/' + soy.$$escapeHtmlAttribute(opt_data.params.url) + '" class="b-school-list-item__name">' + soy.$$escapeHtml(opt_data.params.name.light) + ((opt_data.params.name.bold) ? '<span class="b-school-list-item__name_bold">' + soy.$$escapeHtml(opt_data.params.name.bold) + '</span>' : '') + '</a><div class="b-school-list-item__score">' + sm.bScoreSchoolList.Template.base({params: {score: opt_data.params.score, sortCriteria: opt_data.params.currentCriterion}}, null, opt_ijData) + '</div></div>' + ((opt_data.params.metroStations.length > 0 || opt_data.params.ratings.length > 0) ? '<div class="b-school-list-item__section b-school-list-item__section_badges">' + ((opt_data.params.metroStations.length > 0) ? '<div class="b-school-list-item__metro-stations">' + sm.bBadge.Template.base({params: {data: opt_data.params.metroStations, display: 'metro'}}, null, opt_ijData) + '</div>' : '') + ((opt_data.params.ratings.length > 0) ? '<div class="b-school-list-item__ratings">' + sm.bBadge.Template.base({params: {data: opt_data.params.ratings}}, null, opt_ijData) + '</div>' : '') + '</div>' : '') + ((opt_data.params.description) ? '<div class="b-school-list-item__section"><div class="b-school-list-item__description">' + soy.$$escapeHtml(opt_data.params.description) + '</div></div>' : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSearchResult.bSchoolListItem.Template.base.soyTemplateName = 'sm.lSearchResult.bSchoolListItem.Template.base';
}
// This file was automatically generated from b-sort.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSearchResult.bSort.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSearchResult == 'undefined') { sm.lSearchResult = {}; }
if (typeof sm.lSearchResult.bSort == 'undefined') { sm.lSearchResult.bSort = {}; }
if (typeof sm.lSearchResult.bSort.Template == 'undefined') { sm.lSearchResult.bSort.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bSort.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var switcher__soy2382 = '' + sm.lSearchResult.bSort.Template.switcher_(null, null, opt_ijData);
  switcher__soy2382 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(switcher__soy2382);
  var content__soy2384 = '' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'list', renderParams: {data: {items: [{label: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430'}, {label: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435'}, {label: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438'}, {label: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430'}, {label: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430'}]}}}}, null, opt_ijData));
  content__soy2384 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(content__soy2384);
  output += '<div class="b-sort">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'dropdown', renderParams: {data: {opener: switcher__soy2382, content: content__soy2384}}}}, null, opt_ijData)) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSearchResult.bSort.Template.base.soyTemplateName = 'sm.lSearchResult.bSort.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSearchResult.bSort.Template.switcher_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class="g-dropdown__switcher-text">\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E  <span class="g-dropdown__switcher-custom-text">\u0441\u0440\u0435\u0434\u043D\u0435\u0439 \u043E\u0446\u0435\u043D\u043A\u0435</span></span><img class="g-dropdown__switcher-image" src="/images/l-search-result/b-sort/downArrow.png">');
};
if (goog.DEBUG) {
  sm.lSearchResult.bSort.Template.switcher_.soyTemplateName = 'sm.lSearchResult.bSort.Template.switcher_';
}
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
// This file was automatically generated from b-block-comments.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockComments.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockComments == 'undefined') { sm.lDoc.nDemo.bBlockComments = {}; }
if (typeof sm.lDoc.nDemo.bBlockComments.Template == 'undefined') { sm.lDoc.nDemo.bBlockComments.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockComments.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bComments.Template.base({params: {comments: [{author: '\u0415\u043B\u0435\u043D\u0430 321', rank: '\u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C', text: '\u0415\u0441\u043B\u0438 \u0432\u0430\u0448 \u0440\u0435\u0431\u0435\u043D\u043E\u043A \u043D\u0435 \u0441\u0438\u043B\u0435\u043D \u0432 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0438, \u0441\u043C\u0435\u043B\u043E \u0438\u0434\u0438\u0442\u0435 \u0432 \u044D\u0442\u0443 \u0448\u043A\u043E\u043B\u0443, \u0444\u0440\u0430\u0437\u0430 "\u0411\u044B\u0442\u044C \u0442\u0435\u0431\u0435 \u0434\u0432\u043E\u0440\u043D\u0438\u043A\u043E\u043C" \u0431\u0443\u0434\u0435\u0442 \u043F\u0440\u0435\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0435\u0433\u043E \u0432\u0441\u0435 \u0433\u043E\u0434\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F. \u0425\u043E\u0442\u0435\u043B\u043E\u0441\u044C \u0431\u044B \u0441\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0441\u043E\u0441\u0442\u0430\u0432: "\u0415\u0441\u043B\u0438 \u0432\u044B \u043D\u0435 \u043B\u044E\u0431\u0438\u0442\u0435 \u0434\u0435\u0442\u0435\u0439 \u0438 \u0441\u0432\u043E\u044E \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u044E, \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u044F \u0434\u0432\u043E\u0440\u043D\u0438\u043A\u0430 \u0432\u0430\u043C \u043A\u0430\u043A-\u0442\u043E \u0431\u043B\u0438\u0436\u0435?"', sections: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 4}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 2}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 2}]}, {author: '\u0414\u0430\u043B\u0430\u0439 \u043B\u0430\u043C\u0430', rank: '\u0443\u0447\u0435\u043D\u0438\u043A', text: '\u0414\u043B\u044F \u0442\u043E\u0433\u043E \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0441\u0442\u0443\u043F\u0438\u0442\u044C \u0432 \u0448\u043A\u043E\u043B\u0443 548 \u043D\u0430\u0434\u043E \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0430 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0443 \u0437\u0430 3 \u0433\u043E\u0434\u0430. \u0422\u043E\u0433\u0434\u0430 \u0432\u0430\u0448\u0435\u0433\u043E \u0440\u0435\u0431\u0435\u043D\u043A\u0430 \u0432\u043E\u0437\u044C\u043C\u0443\u0442 \u0442\u043E\u0447\u043D\u043E \u0438 \u043D\u0435 \u0432\u0430\u0436\u043D\u043E \u043A\u0430\u043A \u043E\u043D \u0441\u0435\u0431\u044F \u0432\u0435\u0434\u0435\u0442 \u043D\u0430 \u0443\u0440\u043E\u043A\u0435 (\u043A\u0440\u0438\u0447\u0438\u0442, \u0432\u043E\u0435\u0442, \u043F\u043B\u0430\u0447\u0435\u0442). \u0415\u0449\u0435 \u0442\u0430\u043A\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u0435\u0441\u043B\u0438 \u043E\u043D \u043D\u0435 \u0442\u044F\u043D\u0435\u0442 \u0432 7 \u043B\u0435\u0442, \u0442\u043E \u0435\u0433\u043E, \u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439, \u043C\u043E\u0433\u0443\u0442 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0434\u043E 8 \u043B\u0435\u0442 \u0438 \u0442\u043E\u0433\u0434\u0430 \u043E\u043D \u0442\u043E\u0447\u043D\u043E \u043F\u043E\u0441\u0442\u0443\u043F\u0438\u0442. \u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, \u043F\u0440\u043E\u0432\u043E\u0434\u044F\u0449\u0438\u0435\u0441\u044F \u044F\u043A\u043E\u0431\u044B \u0434\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u0438 \u0434\u0435\u0442\u0435\u0439, \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0443\u0436\u043D\u044B \u0434\u043B\u044F \u043F\u043E\u0434\u043D\u044F\u0442\u0438\u044F \u0438 \u0431\u0435\u0437 \u0442\u043E\u0433\u043E \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0441\u0430\u043C\u043E\u043E\u0446\u0435\u043D\u043A\u0438 \u0448\u043A\u043E\u043B\u044B \u0442\u0440\u0430-\u0442\u0430-\u0442\u0430', sections: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 3}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 2}]}]}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockComments.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockComments.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockComments.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bComments.Template.base({params: {comments: [{author: '\u0415\u043B\u0435\u043D\u0430 321', rank: '\u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C', text: '\u0415\u0441\u043B\u0438 \u0432\u0430\u0448 \u0440\u0435\u0431\u0435\u043D\u043E\u043A \u043D\u0435 \u0441\u0438\u043B\u0435\u043D \u0432 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0438, \u0441\u043C\u0435\u043B\u043E \u0438\u0434\u0438\u0442\u0435 \u0432 \u044D\u0442\u0443 \u0448\u043A\u043E\u043B\u0443, \u0444\u0440\u0430\u0437\u0430 "\u0411\u044B\u0442\u044C \u0442\u0435\u0431\u0435 \u0434\u0432\u043E\u0440\u043D\u0438\u043A\u043E\u043C" \u0431\u0443\u0434\u0435\u0442 \u043F\u0440\u0435\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0435\u0433\u043E \u0432\u0441\u0435 \u0433\u043E\u0434\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F. \u0425\u043E\u0442\u0435\u043B\u043E\u0441\u044C \u0431\u044B \u0441\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0441\u043E\u0441\u0442\u0430\u0432: "\u0415\u0441\u043B\u0438 \u0432\u044B \u043D\u0435 \u043B\u044E\u0431\u0438\u0442\u0435 \u0434\u0435\u0442\u0435\u0439 \u0438 \u0441\u0432\u043E\u044E \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u044E, \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u044F \u0434\u0432\u043E\u0440\u043D\u0438\u043A\u0430 \u0432\u0430\u043C \u043A\u0430\u043A-\u0442\u043E \u0431\u043B\u0438\u0436\u0435?"', sections: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 4}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 2}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 2}]}, {author: '\u0414\u0430\u043B\u0430\u0439 \u041B\u0430\u043C\u0430', rank: '\u0443\u0447\u0435\u043D\u0438\u043A', text: '\u0414\u043B\u044F \u0442\u043E\u0433\u043E \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0441\u0442\u0443\u043F\u0438\u0442\u044C \u0432 \u0448\u043A\u043E\u043B\u0443 548 \u043D\u0430\u0434\u043E \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0430 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0443 \u0437\u0430 3 \u0433\u043E\u0434\u0430. \u0422\u043E\u0433\u0434\u0430 \u0432\u0430\u0448\u0435\u0433\u043E \u0440\u0435\u0431\u0435\u043D\u043A\u0430 \u0432\u043E\u0437\u044C\u043C\u0443\u0442 \u0442\u043E\u0447\u043D\u043E \u0438 \u043D\u0435 \u0432\u0430\u0436\u043D\u043E \u043A\u0430\u043A \u043E\u043D \u0441\u0435\u0431\u044F \u0432\u0435\u0434\u0435\u0442 \u043D\u0430 \u0443\u0440\u043E\u043A\u0435 (\u043A\u0440\u0438\u0447\u0438\u0442, \u0432\u043E\u0435\u0442, \u043F\u043B\u0430\u0447\u0435\u0442). \u0415\u0449\u0435 \u0442\u0430\u043A\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u0435\u0441\u043B\u0438 \u043E\u043D \u043D\u0435 \u0442\u044F\u043D\u0435\u0442 \u0432 7 \u043B\u0435\u0442, \u0442\u043E \u0435\u0433\u043E, \u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439, \u043C\u043E\u0433\u0443\u0442 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0434\u043E 8 \u043B\u0435\u0442 \u0438 \u0442\u043E\u0433\u0434\u0430 \u043E\u043D \u0442\u043E\u0447\u043D\u043E \u043F\u043E\u0441\u0442\u0443\u043F\u0438\u0442. \u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, \u043F\u0440\u043E\u0432\u043E\u0434\u044F\u0449\u0438\u0435\u0441\u044F \u044F\u043A\u043E\u0431\u044B \u0434\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u0438 \u0434\u0435\u0442\u0435\u0439, \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0443\u0436\u043D\u044B \u0434\u043B\u044F \u043F\u043E\u0434\u043D\u044F\u0442\u0438\u044F \u0438 \u0431\u0435\u0437 \u0442\u043E\u0433\u043E \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0441\u0430\u043C\u043E\u043E\u0446\u0435\u043D\u043A\u0438 \u0448\u043A\u043E\u043B\u044B \u0433\u043B\u0430\u0434\u0438\u043E\u043B\u0443\u0441', sections: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 3}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 2}]}]}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockComments.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockComments.Template.doc';
}
// This file was automatically generated from b-block-data-block.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockDataBlock.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockDataBlock == 'undefined') { sm.lDoc.nDemo.bBlockDataBlock = {}; }
if (typeof sm.lDoc.nDemo.bBlockDataBlock.Template == 'undefined') { sm.lDoc.nDemo.bBlockDataBlock.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockDataBlock.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bDataBlock.Template.base({params: {header: '\u0430\u0434\u0440\u0435\u0441\u0430 \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u044B', content: ['\u0443\u043B\u0438\u0446\u0430 \u041A\u0440\u0443\u043F\u0441\u043A\u043E\u0439, \u0434\u043E\u043C 10', '\u0443\u043B\u0438\u0446\u0430 \u041A\u0440\u0443\u043F\u0441\u043A\u043E\u0439, \u0434\u043E\u043C 12']}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockDataBlock.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockDataBlock.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockDataBlock.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Default view<br /><br />Template:<div class="b-block-mark__code">sm.lSchool.bDataBlock.Template.base</div><br /><br />Params:<br /><br /><div class="b-block-mark__code">header: string,<br />headerType: number<span class="b-block-mark__comment">type of header [2, 3(default)],</span>modifier: string,<br><span class="b-block-mark__comment">- additional classes,</span><br />content: list < string ></div>' + sm.lSchool.bDataBlock.Template.base({params: {header: '\u0430\u0434\u0440\u0435\u0441\u0430 \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u044B', content: ['\u0443\u043B\u0438\u0446\u0430 \u041A\u0440\u0443\u043F\u0441\u043A\u043E\u0439, \u0434\u043E\u043C 10', '\u0443\u043B\u0438\u0446\u0430 \u041A\u0440\u0443\u043F\u0441\u043A\u043E\u0439, \u0434\u043E\u043C 12']}}, null, opt_ijData) + '<br /><br />Ratings view<br /><br />Template:<div class="b-block-mark__code">sm.lSchool.bDataBlockRatings.Template.base</div><br /><br />Params:<br /><br /><div class="b-block-mark__code">header: string,<br />headerType: number<span class="b-block-mark__comment">type of header [2, 3(default)],</span>modifier: string,<br><span class="b-block-mark__comment">- additional classes,</span><br />content: list<[ <br /><span class="b-block-diagram__code-indent">name: string</span><span class="b-block-mark__comment">- name of rating,</span><br /><span class="b-block-diagram__code-indent">place: number</span><span class="b-block-mark__comment">- place in rating,</span><br /><span class="b-block-diagram__code-indent">href: ?string</span><span class="b-block-mark__comment">- link to rating</span><br />]></div>' + sm.lSchool.bDataBlockRatings.Template.base({params: {header: '\u043C\u0435\u0441\u0442\u0430 \u0432 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430\u0445', content: [{name: '\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u00AB\u041C\u0435\u043B\u0430\u00BB', place: 4, href: '/school'}, {name: '\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u0414\u0435\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u0430 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u041C\u043E\u0441\u043A\u0432\u044B', place: 12}]}}, null, opt_ijData) + '<br /><br />Fold List view<br /><br />Template:<div class="b-block-mark__code">sm.lSchool.bDataBlockFoldList.Template.base</div><br /><br />Params:<br /><br /><div class="b-block-mark__code">header: string,<br />headerType: number<span class="b-block-mark__comment">type of header [2, 3(default)],</span>modifier: string<span class="b-block-mark__comment">- additional classes,</span><br />content: list<[ <br /><span class="b-block-diagram__code-indent">name: string</span><span class="b-block-mark__comment">- name category,</span><br /><span class="b-block-diagram__code-indent">items: list< string ></span><span class="b-block-mark__comment">- items in category</span><br />]></div>' + sm.lSchool.bDataBlockFoldList.Template.base({params: {header: '\u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u044B\u0435 \u043A\u043B\u0430\u0441\u0441\u044B', content: [{name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0448\u043A\u043E\u043B\u0430', items: ['\u041F\u0435\u043D\u0438\u0435', '\u0422\u0430\u043D\u0446\u044B', '\u0427\u0442\u0435\u043D\u0438\u0435']}, {name: '\u0421\u0442\u0430\u0440\u0448\u0430\u044F \u0448\u043A\u043E\u043B\u0430', items: ['\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A \u0438 \u043B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430', '\u0418\u043D\u043E\u0441\u0442\u0440\u0430\u043D\u043D\u044B\u0439 \u044F\u0437\u044B\u043A', '\u0418\u0441\u0442\u043E\u0440\u0438\u044F', '\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044F', '\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0430', '\u041F\u0440\u0430\u0432\u043E', '\u0410\u043B\u0433\u0435\u0431\u0440\u0430 \u0438 \u043D\u0430\u0447\u0430\u043B\u0430 \u0430\u043D\u0430\u043B\u0438\u0437\u0430', '\u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F', '\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0442\u0438\u043A\u0430', '\u0424\u0438\u0437\u0438\u043A\u0430', '\u0425\u0438\u043C\u0438\u044F', '\u0411\u0438\u043E\u043B\u043E\u0433\u0438\u044F']}]}}, null, opt_ijData) + '<br /><br />Features List view<br /><br />Template:<div class="b-block-mark__code">sm.lSchool.bDataBlockFeatures.Template.base</div><br /><br />Params:<br /><br /><div class="b-block-mark__code">header: string,<br />headerType: number<span class="b-block-mark__comment">type of header [2, 3(default)],</span><br />modifier: string,<span class="b-block-mark__comment">- additional classes,</span><br />content: list<[ string ]></div>' + sm.lSchool.bDataBlockFeatures.Template.base({params: {header: '\u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438', content: ['\u0411\u043E\u043B\u044C\u0448\u043E\u0439 \u0432\u044B\u0431\u043E\u0440 \u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u044B\u0445 \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D, \u0432 \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438, \u0442\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0438\u0445 \u0438 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E-\u0433\u0443\u043C\u0430\u043D\u0438\u0442\u0430\u0440\u043D\u044B\u0445', '\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043F\u0440\u043E\u0444\u043E\u0440\u0438\u0435\u043D\u0442\u0430\u0446\u0438\u0438 \u0432 8\u20149 \u043A\u043B\u0430\u0441\u0441\u0430\u0445', '\u0428\u043A\u043E\u043B\u0430 \u043A\u0438\u0442\u0430\u0439\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430, \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u0448\u043A\u043E\u043B\u0430, \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u0430\u044F \u0448\u043A\u043E\u043B\u0430', '\u0415\u0441\u0442\u044C \u0442\u0435\u043D\u043D\u0438\u0441\u043D\u044B\u0439 \u043A\u043B\u0443\u0431, \u0441\u0435\u043A\u0446\u0438\u044F \u043A\u0443\u043D\u0433-\u0444\u0443']}}, null, opt_ijData) + '<br /><br />Information view<br /><br />Template:<div class="b-block-mark__code">sm.lSchool.bDataBlockInformation.Template.base</div><br /><br />Params:<br /><br /><div class="b-block-mark__code">content: list<[ <br /><span class="b-block-diagram__code-indent">classes: string</span>,<br /><span class="b-block-diagram__code-indent">kindergarten: string</span>,<br /><span class="b-block-diagram__code-indent">extendedDayCost: string</span>,<br /><span class="b-block-diagram__code-indent">directorName: string</span>,<br /><span class="b-block-diagram__code-indent">dressCode: string</span>]></div>' + sm.lSchool.bDataBlockInformation.Template.base({params: {content: {classes: '\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0441 1-10 \u043A\u043B\u0430\u0441\u0441', kindergarten: '\u041F\u0440\u0438 \u0448\u043A\u043E\u043B\u0435 \u0435\u0441\u0442\u044C \u0434\u0435\u0442\u0441\u043A\u0438\u0439 \u0441\u0430\u0434', extendedDayCost: '\u0415\u0441\u0442\u044C \u043F\u0440\u043E\u0434\u043B\u0435\u043D\u043A\u0430, 2 564 \u0440\u0443\u0431. \u0432 \u0434\u0435\u043D\u044C', directorName: '\u041E\u043B\u044C\u0433\u0430 \u041C\u0438\u0445\u0430\u0439\u043B\u043E\u0432\u043D\u0430 \u0418\u0432\u0430\u043D\u043E\u0432\u0430', dressCode: '\u0428\u043A\u043E\u043B\u044C\u043D\u0430\u044F \u0444\u043E\u0440\u043C\u0430 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430'}}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockDataBlock.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockDataBlock.Template.doc';
}
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
// This file was automatically generated from b-block-feedback-modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockFeedbackModal.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockFeedbackModal == 'undefined') { sm.lDoc.nDemo.bBlockFeedbackModal = {}; }
if (typeof sm.lDoc.nDemo.bBlockFeedbackModal.Template == 'undefined') { sm.lDoc.nDemo.bBlockFeedbackModal.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockFeedbackModal.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockFeedbackModal.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockFeedbackModal.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockFeedbackModal.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockFeedbackModal.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockFeedbackModal.Template.doc';
}
// This file was automatically generated from b-block-filters.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockFilters.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockFilters == 'undefined') { sm.lDoc.nDemo.bBlockFilters = {}; }
if (typeof sm.lDoc.nDemo.bBlockFilters.Template == 'undefined') { sm.lDoc.nDemo.bBlockFilters.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockFilters.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bFilters.Template.base({params: {filters: [{data: {filters: [{label: '\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A', value: '1'}, {label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A', value: '2'}], header: {title: '\u042F\u0437\u044B\u043A\u0438 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440', help: '\u042F\u0437\u044B\u043A \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440'}, name: 'myFilter'}, config: {cannotBeHidden: false}}, {data: {filters: [{label: '\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A', value: '1'}, {label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A', value: '2'}], header: {title: '\u042F\u0437\u044B\u043A\u0438 2 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440', help: '\u042F\u0437\u044B\u043A 2 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440'}, name: 'myFilter2'}, config: {cannotBeHidden: false}}], url: 'url'}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockFilters.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockFilters.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockFilters.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockFilters.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockFilters.Template.doc';
}
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
// This file was automatically generated from b-block-rating.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockRating.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockRating == 'undefined') { sm.lDoc.nDemo.bBlockRating = {}; }
if (typeof sm.lDoc.nDemo.bBlockRating.Template == 'undefined') { sm.lDoc.nDemo.bBlockRating.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockRating.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bRating.Template.base({params: {marks: [1, 3, 4, 2], averageMark: 2.5}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockRating.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockRating.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockRating.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bRating.Template.base({params: {marks: [1, 3, 4, 2], averageMark: 2.5}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockRating.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockRating.Template.doc';
}
// This file was automatically generated from b-block-school-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockSchoolList.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockSchoolList == 'undefined') { sm.lDoc.nDemo.bBlockSchoolList = {}; }
if (typeof sm.lDoc.nDemo.bBlockSchoolList.Template == 'undefined') { sm.lDoc.nDemo.bBlockSchoolList.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockSchoolList.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bSchoolList.Template.base({params: {schools: [{id: 1, name: {light: '\u0428\u043A\u043E\u043B\u0430 ', bold: '\u2116 14'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 1.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 1}, metroStations: ['\u0427\u043A\u0430\u043B\u043E\u0432\u0441\u043A\u0430\u044F', '\u041A\u0443\u0440\u0441\u043A\u0430\u044F'], ratings: ['\u0421\u0442\u043E \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}, {id: 2, name: {light: '\u0428\u043A\u043E\u043B\u0430 ', bold: '\u2116 15'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 3.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 3.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 4.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 2}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 2}, metroStations: ['\u0427\u043A\u0430\u043B\u043E\u0432\u0441\u043A\u0430\u044F', '\u041A\u0443\u0440\u0441\u043A\u0430\u044F'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}, {id: 3, name: {light: '\u0428\u043A\u043E\u043B\u0430 ', bold: '\u2116 14'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 0.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 4.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 2.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 3.8}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 2.95}, metroStations: ['\u0427\u043A\u0430\u043B\u043E\u0432\u0441\u043A\u0430\u044F', '\u041A\u0443\u0440\u0441\u043A\u0430\u044F'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}, {id: 10, name: {light: '\u0426\u0435\u043D\u0442\u0440 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F ', bold: '\u2116 548 \u00AB\u0426\u0430\u0440\u0438\u0446\u044B\u043D\u043E\u00BB'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 3.4}, description: '\u041E\u0434\u043D\u0430 \u0438\u0437 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0433\u043E\u0440\u043E\u0434\u0430, \u0435\u0436\u0435\u0433\u043E\u0434\u043D\u043E \u0437\u0430\u043D\u0438\u043C\u0430\u044E\u0449\u0430\u044F \u0432\u0435\u0440\u0445\u043D\u0438\u0435 \u0441\u0442\u0440\u043E\u0447\u043A\u0438 \u0432 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430\u0445 \u043C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0433\u043E \u0434\u0435\u043F\u0435\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u0430 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F', metroStations: ['\u0414\u043E\u043C\u043E\u0434\u0435\u0434\u043E\u0432\u0441\u043A\u0430\u044F', '\u041E\u0440\u0435\u0445\u043E\u0432\u043E'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}, {id: 19, name: {light: '\u0428\u043A\u043E\u043B\u0430 ', bold: '\u2116 13'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 0.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 4.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 2.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 3.8}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 4}, metroStations: ['\u0427\u043A\u0430\u043B\u043E\u0432\u0441\u043A\u0430\u044F', '\u041A\u0443\u0440\u0441\u043A\u0430\u044F'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}]}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockSchoolList.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockSchoolList.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockSchoolList.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Template:<br><br><div class="l-doc__code">sm.lSearchResult.bSchoolList.Template</div>Params:<br><br><div class="l-doc__code">schools: list<[ <br><div class="l-doc__code-indent">id: number,</div><div class="l-doc__code-indent">url: string,</div><div class="l-doc__code-indent">name: [<div class="l-doc__code-indent">ligth: string,<br>bold: string<span class="l-doc__comment">- bolded part of name</span><br></div>],</div><div class="l-doc__code-indent">score: list<[<br><div class="l-doc__code-indent">name: string,<br>value: string<br></div>]>,</div><div class="l-doc__code-indent">totalScore: number,</div><div class="l-doc__code-indent">description: string,</div><div class="l-doc__code-indent">metroStations: list < string >,</div><div class="l-doc__code-indent">ratings: list < string ></div>]></div>' + sm.lSearchResult.bSchoolList.Template.base({params: {schools: [{id: 1, name: {light: '\u0428\u043A\u043E\u043B\u0430 ', bold: '\u2116 14'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 1.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 1}, metroStations: ['\u0427\u043A\u0430\u043B\u043E\u0432\u0441\u043A\u0430\u044F', '\u041A\u0443\u0440\u0441\u043A\u0430\u044F'], ratings: ['\u0421\u0442\u043E \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}, {id: 2, name: {light: '\u0428\u043A\u043E\u043B\u0430 ', bold: '\u2116 15'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 3.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 3.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 4.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 2}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 2}, metroStations: ['\u0427\u043A\u0430\u043B\u043E\u0432\u0441\u043A\u0430\u044F', '\u041A\u0443\u0440\u0441\u043A\u0430\u044F'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}, {id: 3, name: {light: '\u0428\u043A\u043E\u043B\u0430 ', bold: '\u2116 14'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 0.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 4.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 2.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 3.8}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 2.95}, metroStations: ['\u0427\u043A\u0430\u043B\u043E\u0432\u0441\u043A\u0430\u044F', '\u041A\u0443\u0440\u0441\u043A\u0430\u044F'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}, {id: 10, name: {light: '\u0426\u0435\u043D\u0442\u0440 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F ', bold: '\u2116 548 \u00AB\u0426\u0430\u0440\u0438\u0446\u044B\u043D\u043E\u00BB'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 3.4}, description: '\u041E\u0434\u043D\u0430 \u0438\u0437 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0433\u043E\u0440\u043E\u0434\u0430, \u0435\u0436\u0435\u0433\u043E\u0434\u043D\u043E \u0437\u0430\u043D\u0438\u043C\u0430\u044E\u0449\u0430\u044F \u0432\u0435\u0440\u0445\u043D\u0438\u0435 \u0441\u0442\u0440\u043E\u0447\u043A\u0438 \u0432 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430\u0445 \u043C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0433\u043E \u0434\u0435\u043F\u0435\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u0430 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F', metroStations: ['\u0414\u043E\u043C\u043E\u0434\u0435\u0434\u043E\u0432\u0441\u043A\u0430\u044F', '\u041E\u0440\u0435\u0445\u043E\u0432\u043E'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}, {id: 19, name: {light: '\u0428\u043A\u043E\u043B\u0430 ', bold: '\u2116 13'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 0.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 4.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 2.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 3.8}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 4}, metroStations: ['\u0427\u043A\u0430\u043B\u043E\u0432\u0441\u043A\u0430\u044F', '\u041A\u0443\u0440\u0441\u043A\u0430\u044F'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}]}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockSchoolList.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockSchoolList.Template.doc';
}
// This file was automatically generated from b-block-school-list-item.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockSchoolListItem.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockSchoolListItem == 'undefined') { sm.lDoc.nDemo.bBlockSchoolListItem = {}; }
if (typeof sm.lDoc.nDemo.bBlockSchoolListItem.Template == 'undefined') { sm.lDoc.nDemo.bBlockSchoolListItem.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockSchoolListItem.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bSchoolListItem.Template.base({params: {id: 10, name: {light: '\u0426\u0435\u043D\u0442\u0440 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F ', bold: '\u2116 548 \u00AB\u0426\u0430\u0440\u0438\u0446\u044B\u043D\u043E\u00BB'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 4}, description: '\u041E\u0434\u043D\u0430 \u0438\u0437 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0433\u043E\u0440\u043E\u0434\u0430, \u0435\u0436\u0435\u0433\u043E\u0434\u043D\u043E \u0437\u0430\u043D\u0438\u043C\u0430\u044E\u0449\u0430\u044F \u0432\u0435\u0440\u0445\u043D\u0438\u0435 \u0441\u0442\u0440\u043E\u0447\u043A\u0438 \u0432 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430\u0445 \u043C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0433\u043E \u0434\u0435\u043F\u0435\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u0430 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F', metroStations: ['\u0414\u043E\u043C\u043E\u0434\u0435\u0434\u043E\u0432\u0441\u043A\u0430\u044F', '\u041E\u0440\u0435\u0445\u043E\u0432\u043E'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockSchoolListItem.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockSchoolListItem.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockSchoolListItem.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Template:<br><br><div class="l-doc__code">sm.lSearchResult.bSchoolListItem.Template</div>Params:<br><br><div class="l-doc__code">id: number, url: string,< name: [<div class="l-doc__code-indent">ligth: string,<br>bold: string<span class="l-doc__comment">- bolded part of name</span><br></div>],<br>score: list<[<br><div class="l-doc__code-indent">name: string,<br>value: string<br></div>]>,<br>totalScore: number,<br>description: string,<br>metroStations: list < string >,<br>ratings: list < string ></div>' + sm.lSearchResult.bSchoolListItem.Template.base({params: {id: 10, name: {light: '\u0426\u0435\u043D\u0442\u0440 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F ', bold: '\u2116 548 \u00AB\u0426\u0430\u0440\u0438\u0446\u044B\u043D\u043E\u00BB'}, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], currentCriterion: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 4}, description: '\u041E\u0434\u043D\u0430 \u0438\u0437 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0433\u043E\u0440\u043E\u0434\u0430, \u0435\u0436\u0435\u0433\u043E\u0434\u043D\u043E \u0437\u0430\u043D\u0438\u043C\u0430\u044E\u0449\u0430\u044F \u0432\u0435\u0440\u0445\u043D\u0438\u0435 \u0441\u0442\u0440\u043E\u0447\u043A\u0438 \u0432 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430\u0445 \u043C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0433\u043E \u0434\u0435\u043F\u0435\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u0430 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F', metroStations: ['\u0414\u043E\u043C\u043E\u0434\u0435\u0434\u043E\u0432\u0441\u043A\u0430\u044F', '\u041E\u0440\u0435\u0445\u043E\u0432\u043E'], ratings: ['100 \u043B\u0443\u0447\u0448\u0438\u0445 \u0448\u043A\u043E\u043B \u0420\u043E\u0441\u0441\u0438\u0438']}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockSchoolListItem.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockSchoolListItem.Template.doc';
}
// This file was automatically generated from b-block-score.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockScore.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockScore == 'undefined') { sm.lDoc.nDemo.bBlockScore = {}; }
if (typeof sm.lDoc.nDemo.bBlockScore.Template == 'undefined') { sm.lDoc.nDemo.bBlockScore.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockScore.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bScore.Template.base({params: {reviewCount: 10, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], totalScore: 4}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockScore.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockScore.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockScore.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('Default view Template:<br><br><div class="l-doc__code">sm.bScore.Template.base</div><br><br>Params:<br><br><div class="l-doc__code">reviewCount: ?number,<br>score: list<[<br><div class="l-doc__code-indent">name: ?string,</div><div class="l-doc__code-indent">value: ?number</div>]>,<br>totalScore: ?number</div><br><br>' + sm.bScore.Template.base({params: {reviewCount: 10, score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], totalScore: 4}}, null, opt_ijData) + '<br><br>School list view Template:<br><br><div class="l-doc__code">sm.bScoreSchoolList.Template.base</div><br><br>Params:<br><br><div class="l-doc__code">score: list<[<br><div class="l-doc__code-indent">name: ?string,</div><div class="l-doc__code-indent">value: ?number</div>]>,<br>sortCriteria: [<br><div class="l-doc__code-indent">name: ?string,</div><div class="l-doc__code-indent">value: ?number</div>]</div><br><br>' + sm.bScoreSchoolList.Template.base({params: {score: [{name: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', value: 2.3}, {name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', value: 2.7}, {name: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', value: 3.5}, {name: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', value: 4}], sortCriteria: {name: '\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430', value: 2.3}}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockScore.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockScore.Template.doc';
}
// This file was automatically generated from b-block-search.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockSearch.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockSearch == 'undefined') { sm.lDoc.nDemo.bBlockSearch = {}; }
if (typeof sm.lDoc.nDemo.bBlockSearch.Template == 'undefined') { sm.lDoc.nDemo.bBlockSearch.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockSearch.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bSearch.Template.base({params: {placeholder: '\u041F\u043E\u0438\u0441\u043A'}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockSearch.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockSearch.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockSearch.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bSearch.Template.base({params: {placeholder: '\u041F\u043E\u0438\u0441\u043A'}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockSearch.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockSearch.Template.doc';
}
// This file was automatically generated from b-block-sort.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockSort.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockSort == 'undefined') { sm.lDoc.nDemo.bBlockSort = {}; }
if (typeof sm.lDoc.nDemo.bBlockSort.Template == 'undefined') { sm.lDoc.nDemo.bBlockSort.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockSort.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bSort.Template.base(null, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockSort.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockSort.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockSort.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSearchResult.bSort.Template.base(null, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockSort.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockSort.Template.doc';
}
// This file was automatically generated from b-block-stars.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lDoc.nDemo.bBlockStars.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lDoc == 'undefined') { sm.lDoc = {}; }
if (typeof sm.lDoc.nDemo == 'undefined') { sm.lDoc.nDemo = {}; }
if (typeof sm.lDoc.nDemo.bBlockStars == 'undefined') { sm.lDoc.nDemo.bBlockStars = {}; }
if (typeof sm.lDoc.nDemo.bBlockStars.Template == 'undefined') { sm.lDoc.nDemo.bBlockStars.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockStars.Template.preview = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.bStars.Template.base({params: {data: {mark: 4}}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockStars.Template.preview.soyTemplateName = 'sm.lDoc.nDemo.bBlockStars.Template.preview';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lDoc.nDemo.bBlockStars.Template.doc = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<br>NOT CLICKABLE:<br>' + sm.bStars.Template.base({params: {data: {mark: 1}, config: {style: {theme: 'colored'}}}}, null, opt_ijData) + '<br>' + sm.bStars.Template.base({params: {data: {mark: 2}}}, null, opt_ijData) + '<br>' + sm.bStars.Template.base({params: {data: {mark: 3}}}, null, opt_ijData) + '<br>' + sm.bStars.Template.base({params: {data: {mark: 4}}}, null, opt_ijData) + '<br>' + sm.bStars.Template.base({params: {data: {mark: 5}}}, null, opt_ijData) + '<br><br>COLORED:<br>' + sm.bStars.Template.base({params: {data: {mark: 3}, config: {style: {theme: 'colored'}, isClickable: true}}}, null, opt_ijData) + '<br><br>LARGE:<br>' + sm.bStars.Template.base({params: {data: {mark: 5}, config: {style: {size: 'large'}}}}, null, opt_ijData) + '<br><br>LARGE COLORED:<br>' + sm.bStars.Template.base({params: {data: {mark: 4}, config: {style: {size: 'large', theme: 'colored'}, isClickable: true}}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lDoc.nDemo.bBlockStars.Template.doc.soyTemplateName = 'sm.lDoc.nDemo.bBlockStars.Template.doc';
}
// This file was automatically generated from g-button-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gButtonDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gButtonDemo == 'undefined') { cl.lDoc.nDemo.gButtonDemo = {}; }
if (typeof cl.lDoc.nDemo.gButtonDemo.Template == 'undefined') { cl.lDoc.nDemo.gButtonDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.buttonDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gButtonDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.buttonDemo.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.buttonDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gButton.Template.button(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gButtonDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList2597 = opt_data.params.data;
  var itemListLen2597 = itemList2597.length;
  for (var itemIndex2597 = 0; itemIndex2597 < itemListLen2597; itemIndex2597++) {
    var itemData2597 = itemList2597[itemIndex2597];
    output += ((itemData2597.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2597.description) + '</h2>' : '') + ((itemData2597.showParams) ? cl.lDoc.nDemo.gButtonDemo.Template.params({stringifyParams: itemData2597.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gButtonDemo.Template.template({params: itemData2597.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gButtonDemo.Template.template({params: itemData2597.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gButtonDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2623 = opt_data.params.data;
  var itemListLen2623 = itemList2623.length;
  for (var itemIndex2623 = 0; itemIndex2623 < itemListLen2623; itemIndex2623++) {
    var itemData2623 = itemList2623[itemIndex2623];
    output += ((itemData2623.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2623.description) + '</h2>' : '') + ((itemData2623.showParams) ? cl.lDoc.nDemo.gButtonDemo.Template.params({stringifyParams: itemData2623.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2623.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2623.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gButtonDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList2658 = opt_data.params.soydoc.docParams;
  var docParamListLen2658 = docParamList2658.length;
  for (var docParamIndex2658 = 0; docParamIndex2658 < docParamListLen2658; docParamIndex2658++) {
    var docParamData2658 = docParamList2658[docParamIndex2658];
    output += cl.lDoc.nDemo.gButtonDemo.Template.docParams({stringifyParams: docParamData2658.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy2665 = '{';
  lb__soy2665 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2665);
  var rb__soy2667 = '}';
  rb__soy2667 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2667);
  var iLimit2669 = opt_data.stringifyParams.length;
  for (var i2669 = 0; i2669 < iLimit2669; i2669++) {
    output += (opt_data.stringifyParams[i2669] == lb__soy2665) ? soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2669] == rb__soy2667) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + ((i2669 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2669 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2669] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2669] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + ((i2669 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2669 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2669] == ',') ? (opt_data.stringifyParams[i2669 - 1] == rb__soy2667 || opt_data.stringifyParams[i2669 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + '<br>' : (opt_data.stringifyParams[i2669] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2669]) + ' ' : (opt_data.stringifyParams[i2669] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2669]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gButtonDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gButtonDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gButtonDemo.Template.docParams';
}
// This file was automatically generated from g-dropdown-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gDropdownDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gDropdownDemo == 'undefined') { cl.lDoc.nDemo.gDropdownDemo = {}; }
if (typeof cl.lDoc.nDemo.gDropdownDemo.Template == 'undefined') { cl.lDoc.nDemo.gDropdownDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.dropdownDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gDropdownDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.dropdownDemo.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.dropdownDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(cl.iFactory.FactoryManager.INSTANCE.renderTemplate({params: {factory: 'abstract', type: 'dropdown', renderParams: opt_data.params}}, null, opt_ijData)));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(cl.iFactory.FactoryManager.INSTANCE.renderTemplate({params: {factory: 'abstract', type: 'dropdown', renderParams: {data: {opener: 'dropdown', content: 'CONTENT!'}}}}, null, opt_ijData)));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gDropdownDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList2723 = opt_data.params.data;
  var itemListLen2723 = itemList2723.length;
  for (var itemIndex2723 = 0; itemIndex2723 < itemListLen2723; itemIndex2723++) {
    var itemData2723 = itemList2723[itemIndex2723];
    output += ((itemData2723.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2723.description) + '</h2>' : '') + ((itemData2723.showParams) ? cl.lDoc.nDemo.gDropdownDemo.Template.params({stringifyParams: itemData2723.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gDropdownDemo.Template.template({params: itemData2723.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gDropdownDemo.Template.template({params: itemData2723.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gDropdownDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2749 = opt_data.params.data;
  var itemListLen2749 = itemList2749.length;
  for (var itemIndex2749 = 0; itemIndex2749 < itemListLen2749; itemIndex2749++) {
    var itemData2749 = itemList2749[itemIndex2749];
    output += ((itemData2749.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2749.description) + '</h2>' : '') + ((itemData2749.showParams) ? cl.lDoc.nDemo.gDropdownDemo.Template.params({stringifyParams: itemData2749.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2749.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2749.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gDropdownDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList2783 = opt_data.params.soydoc.docParams;
  var docParamListLen2783 = docParamList2783.length;
  for (var docParamIndex2783 = 0; docParamIndex2783 < docParamListLen2783; docParamIndex2783++) {
    var docParamData2783 = docParamList2783[docParamIndex2783];
    output += cl.lDoc.nDemo.gDropdownDemo.Template.docParams({stringifyParams: docParamData2783.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy2790 = '{';
  lb__soy2790 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2790);
  var rb__soy2792 = '}';
  rb__soy2792 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2792);
  var iLimit2794 = opt_data.stringifyParams.length;
  for (var i2794 = 0; i2794 < iLimit2794; i2794++) {
    output += (opt_data.stringifyParams[i2794] == lb__soy2790) ? soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2794] == rb__soy2792) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + ((i2794 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2794 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2794] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2794] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + ((i2794 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2794 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2794] == ',') ? (opt_data.stringifyParams[i2794 - 1] == rb__soy2792 || opt_data.stringifyParams[i2794 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + '<br>' : (opt_data.stringifyParams[i2794] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2794]) + ' ' : (opt_data.stringifyParams[i2794] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2794]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gDropdownDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gDropdownDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gDropdownDemo.Template.docParams';
}
// This file was automatically generated from g-hint-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gHintDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gHintDemo == 'undefined') { cl.lDoc.nDemo.gHintDemo = {}; }
if (typeof cl.lDoc.nDemo.gHintDemo.Template == 'undefined') { cl.lDoc.nDemo.gHintDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.hintDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gHintDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.hintDemo.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.hintDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gButton.Template.button(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gHintDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList2844 = opt_data.params.data;
  var itemListLen2844 = itemList2844.length;
  for (var itemIndex2844 = 0; itemIndex2844 < itemListLen2844; itemIndex2844++) {
    var itemData2844 = itemList2844[itemIndex2844];
    output += ((itemData2844.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2844.description) + '</h2>' : '') + ((itemData2844.showParams) ? cl.lDoc.nDemo.gHintDemo.Template.params({stringifyParams: itemData2844.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gHintDemo.Template.template({params: itemData2844.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gHintDemo.Template.template({params: itemData2844.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gHintDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2870 = opt_data.params.data;
  var itemListLen2870 = itemList2870.length;
  for (var itemIndex2870 = 0; itemIndex2870 < itemListLen2870; itemIndex2870++) {
    var itemData2870 = itemList2870[itemIndex2870];
    output += ((itemData2870.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2870.description) + '</h2>' : '') + ((itemData2870.showParams) ? cl.lDoc.nDemo.gHintDemo.Template.params({stringifyParams: itemData2870.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2870.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2870.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gHintDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList2905 = opt_data.params.soydoc.docParams;
  var docParamListLen2905 = docParamList2905.length;
  for (var docParamIndex2905 = 0; docParamIndex2905 < docParamListLen2905; docParamIndex2905++) {
    var docParamData2905 = docParamList2905[docParamIndex2905];
    output += cl.lDoc.nDemo.gHintDemo.Template.docParams({stringifyParams: docParamData2905.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy2912 = '{';
  lb__soy2912 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy2912);
  var rb__soy2914 = '}';
  rb__soy2914 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy2914);
  var iLimit2916 = opt_data.stringifyParams.length;
  for (var i2916 = 0; i2916 < iLimit2916; i2916++) {
    output += (opt_data.stringifyParams[i2916] == lb__soy2912) ? soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2916] == rb__soy2914) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + ((i2916 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2916 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2916] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i2916] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + ((i2916 != opt_data.stringifyParams.length && opt_data.stringifyParams[i2916 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i2916] == ',') ? (opt_data.stringifyParams[i2916 - 1] == rb__soy2914 || opt_data.stringifyParams[i2916 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + '<br>' : (opt_data.stringifyParams[i2916] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i2916]) + ' ' : (opt_data.stringifyParams[i2916] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i2916]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gHintDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gHintDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gHintDemo.Template.docParams';
}
// This file was automatically generated from g-input-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gInputDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gInputDemo == 'undefined') { cl.lDoc.nDemo.gInputDemo = {}; }
if (typeof cl.lDoc.nDemo.gInputDemo.Template == 'undefined') { cl.lDoc.nDemo.gInputDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.inputDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gInputDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.inputDemo.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.inputDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gInput.Template.input(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gInputDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList2966 = opt_data.params.data;
  var itemListLen2966 = itemList2966.length;
  for (var itemIndex2966 = 0; itemIndex2966 < itemListLen2966; itemIndex2966++) {
    var itemData2966 = itemList2966[itemIndex2966];
    output += ((itemData2966.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2966.description) + '</h2>' : '') + ((itemData2966.showParams) ? cl.lDoc.nDemo.gInputDemo.Template.params({stringifyParams: itemData2966.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gInputDemo.Template.template({params: itemData2966.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gInputDemo.Template.template({params: itemData2966.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gInputDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList2992 = opt_data.params.data;
  var itemListLen2992 = itemList2992.length;
  for (var itemIndex2992 = 0; itemIndex2992 < itemListLen2992; itemIndex2992++) {
    var itemData2992 = itemList2992[itemIndex2992];
    output += ((itemData2992.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData2992.description) + '</h2>' : '') + ((itemData2992.showParams) ? cl.lDoc.nDemo.gInputDemo.Template.params({stringifyParams: itemData2992.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2992.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData2992.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gInputDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3027 = opt_data.params.soydoc.docParams;
  var docParamListLen3027 = docParamList3027.length;
  for (var docParamIndex3027 = 0; docParamIndex3027 < docParamListLen3027; docParamIndex3027++) {
    var docParamData3027 = docParamList3027[docParamIndex3027];
    output += cl.lDoc.nDemo.gInputDemo.Template.docParams({stringifyParams: docParamData3027.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3034 = '{';
  lb__soy3034 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3034);
  var rb__soy3036 = '}';
  rb__soy3036 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3036);
  var iLimit3038 = opt_data.stringifyParams.length;
  for (var i3038 = 0; i3038 < iLimit3038; i3038++) {
    output += (opt_data.stringifyParams[i3038] == lb__soy3034) ? soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3038] == rb__soy3036) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + ((i3038 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3038 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3038] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3038] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + ((i3038 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3038 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3038] == ',') ? (opt_data.stringifyParams[i3038 - 1] == rb__soy3036 || opt_data.stringifyParams[i3038 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + '<br>' : (opt_data.stringifyParams[i3038] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3038]) + ' ' : (opt_data.stringifyParams[i3038] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3038]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gInputDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gInputDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gInputDemo.Template.docParams';
}
// This file was automatically generated from g-list-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gListDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gListDemo == 'undefined') { cl.lDoc.nDemo.gListDemo = {}; }
if (typeof cl.lDoc.nDemo.gListDemo.Template == 'undefined') { cl.lDoc.nDemo.gListDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.listDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gListDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.listDemo.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.listDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gList.Template.list(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gListDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3088 = opt_data.params.data;
  var itemListLen3088 = itemList3088.length;
  for (var itemIndex3088 = 0; itemIndex3088 < itemListLen3088; itemIndex3088++) {
    var itemData3088 = itemList3088[itemIndex3088];
    output += ((itemData3088.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3088.description) + '</h2>' : '') + ((itemData3088.showParams) ? cl.lDoc.nDemo.gListDemo.Template.params({stringifyParams: itemData3088.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gListDemo.Template.template({params: itemData3088.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gListDemo.Template.template({params: itemData3088.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gListDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3114 = opt_data.params.data;
  var itemListLen3114 = itemList3114.length;
  for (var itemIndex3114 = 0; itemIndex3114 < itemListLen3114; itemIndex3114++) {
    var itemData3114 = itemList3114[itemIndex3114];
    output += ((itemData3114.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3114.description) + '</h2>' : '') + ((itemData3114.showParams) ? cl.lDoc.nDemo.gListDemo.Template.params({stringifyParams: itemData3114.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3114.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3114.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gListDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3149 = opt_data.params.soydoc.docParams;
  var docParamListLen3149 = docParamList3149.length;
  for (var docParamIndex3149 = 0; docParamIndex3149 < docParamListLen3149; docParamIndex3149++) {
    var docParamData3149 = docParamList3149[docParamIndex3149];
    output += cl.lDoc.nDemo.gListDemo.Template.docParams({stringifyParams: docParamData3149.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3156 = '{';
  lb__soy3156 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3156);
  var rb__soy3158 = '}';
  rb__soy3158 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3158);
  var iLimit3160 = opt_data.stringifyParams.length;
  for (var i3160 = 0; i3160 < iLimit3160; i3160++) {
    output += (opt_data.stringifyParams[i3160] == lb__soy3156) ? soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3160] == rb__soy3158) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + ((i3160 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3160 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3160] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3160] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + ((i3160 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3160 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3160] == ',') ? (opt_data.stringifyParams[i3160 - 1] == rb__soy3158 || opt_data.stringifyParams[i3160 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + '<br>' : (opt_data.stringifyParams[i3160] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3160]) + ' ' : (opt_data.stringifyParams[i3160] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3160]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gListDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gListDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gListDemo.Template.docParams';
}
// This file was automatically generated from g-modal-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gModalDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gModalDemo == 'undefined') { cl.lDoc.nDemo.gModalDemo = {}; }
if (typeof cl.lDoc.nDemo.gModalDemo.Template == 'undefined') { cl.lDoc.nDemo.gModalDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.modalDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gModalDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.modalDemo.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.modalDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gModal.Template.modal(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gModalDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3210 = opt_data.params.data;
  var itemListLen3210 = itemList3210.length;
  for (var itemIndex3210 = 0; itemIndex3210 < itemListLen3210; itemIndex3210++) {
    var itemData3210 = itemList3210[itemIndex3210];
    output += ((itemData3210.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3210.description) + '</h2>' : '') + ((itemData3210.showParams) ? cl.lDoc.nDemo.gModalDemo.Template.params({stringifyParams: itemData3210.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gModalDemo.Template.template({params: itemData3210.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gModalDemo.Template.template({params: itemData3210.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gModalDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3236 = opt_data.params.data;
  var itemListLen3236 = itemList3236.length;
  for (var itemIndex3236 = 0; itemIndex3236 < itemListLen3236; itemIndex3236++) {
    var itemData3236 = itemList3236[itemIndex3236];
    output += ((itemData3236.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3236.description) + '</h2>' : '') + ((itemData3236.showParams) ? cl.lDoc.nDemo.gModalDemo.Template.params({stringifyParams: itemData3236.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3236.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3236.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gModalDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3271 = opt_data.params.soydoc.docParams;
  var docParamListLen3271 = docParamList3271.length;
  for (var docParamIndex3271 = 0; docParamIndex3271 < docParamListLen3271; docParamIndex3271++) {
    var docParamData3271 = docParamList3271[docParamIndex3271];
    output += cl.lDoc.nDemo.gModalDemo.Template.docParams({stringifyParams: docParamData3271.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3278 = '{';
  lb__soy3278 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3278);
  var rb__soy3280 = '}';
  rb__soy3280 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3280);
  var iLimit3282 = opt_data.stringifyParams.length;
  for (var i3282 = 0; i3282 < iLimit3282; i3282++) {
    output += (opt_data.stringifyParams[i3282] == lb__soy3278) ? soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3282] == rb__soy3280) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + ((i3282 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3282 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3282] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3282] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + ((i3282 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3282 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3282] == ',') ? (opt_data.stringifyParams[i3282 - 1] == rb__soy3280 || opt_data.stringifyParams[i3282 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + '<br>' : (opt_data.stringifyParams[i3282] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3282]) + ' ' : (opt_data.stringifyParams[i3282] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3282]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gModalDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gModalDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gModalDemo.Template.docParams';
}
// This file was automatically generated from g-tab-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gTabDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gTabDemo == 'undefined') { cl.lDoc.nDemo.gTabDemo = {}; }
if (typeof cl.lDoc.nDemo.gTabDemo.Template == 'undefined') { cl.lDoc.nDemo.gTabDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.tabDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gTabDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.tabDemo.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.tabDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTab.Template.tab(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gTabDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3332 = opt_data.params.data;
  var itemListLen3332 = itemList3332.length;
  for (var itemIndex3332 = 0; itemIndex3332 < itemListLen3332; itemIndex3332++) {
    var itemData3332 = itemList3332[itemIndex3332];
    output += ((itemData3332.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3332.description) + '</h2>' : '') + ((itemData3332.showParams) ? cl.lDoc.nDemo.gTabDemo.Template.params({stringifyParams: itemData3332.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gTabDemo.Template.template({params: itemData3332.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gTabDemo.Template.template({params: itemData3332.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gTabDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3358 = opt_data.params.data;
  var itemListLen3358 = itemList3358.length;
  for (var itemIndex3358 = 0; itemIndex3358 < itemListLen3358; itemIndex3358++) {
    var itemData3358 = itemList3358[itemIndex3358];
    output += ((itemData3358.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3358.description) + '</h2>' : '') + ((itemData3358.showParams) ? cl.lDoc.nDemo.gTabDemo.Template.params({stringifyParams: itemData3358.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3358.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3358.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gTabDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3393 = opt_data.params.soydoc.docParams;
  var docParamListLen3393 = docParamList3393.length;
  for (var docParamIndex3393 = 0; docParamIndex3393 < docParamListLen3393; docParamIndex3393++) {
    var docParamData3393 = docParamList3393[docParamIndex3393];
    output += cl.lDoc.nDemo.gTabDemo.Template.docParams({stringifyParams: docParamData3393.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3400 = '{';
  lb__soy3400 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3400);
  var rb__soy3402 = '}';
  rb__soy3402 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3402);
  var iLimit3404 = opt_data.stringifyParams.length;
  for (var i3404 = 0; i3404 < iLimit3404; i3404++) {
    output += (opt_data.stringifyParams[i3404] == lb__soy3400) ? soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3404] == rb__soy3402) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + ((i3404 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3404 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3404] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3404] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + ((i3404 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3404 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3404] == ',') ? (opt_data.stringifyParams[i3404 - 1] == rb__soy3402 || opt_data.stringifyParams[i3404 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + '<br>' : (opt_data.stringifyParams[i3404] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3404]) + ' ' : (opt_data.stringifyParams[i3404] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3404]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTabDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTabDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gTabDemo.Template.docParams';
}
// This file was automatically generated from g-textarea-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.gTextareaDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.gTextareaDemo == 'undefined') { cl.lDoc.nDemo.gTextareaDemo = {}; }
if (typeof cl.lDoc.nDemo.gTextareaDemo.Template == 'undefined') { cl.lDoc.nDemo.gTextareaDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.textareaDemo = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.lDoc.nDemo.gTextareaDemo.Template.demo(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.textareaDemo.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.textareaDemo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(cl.gTextarea.Template.textarea(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.gTextareaDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3454 = opt_data.params.data;
  var itemListLen3454 = itemList3454.length;
  for (var itemIndex3454 = 0; itemIndex3454 < itemListLen3454; itemIndex3454++) {
    var itemData3454 = itemList3454[itemIndex3454];
    output += ((itemData3454.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3454.description) + '</h2>' : '') + ((itemData3454.showParams) ? cl.lDoc.nDemo.gTextareaDemo.Template.params({stringifyParams: itemData3454.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.gTextareaDemo.Template.template({params: itemData3454.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.gTextareaDemo.Template.template({params: itemData3454.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.gTextareaDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3480 = opt_data.params.data;
  var itemListLen3480 = itemList3480.length;
  for (var itemIndex3480 = 0; itemIndex3480 < itemListLen3480; itemIndex3480++) {
    var itemData3480 = itemList3480[itemIndex3480];
    output += ((itemData3480.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3480.description) + '</h2>' : '') + ((itemData3480.showParams) ? cl.lDoc.nDemo.gTextareaDemo.Template.params({stringifyParams: itemData3480.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3480.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3480.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.gTextareaDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3515 = opt_data.params.soydoc.docParams;
  var docParamListLen3515 = docParamList3515.length;
  for (var docParamIndex3515 = 0; docParamIndex3515 < docParamListLen3515; docParamIndex3515++) {
    var docParamData3515 = docParamList3515[docParamIndex3515];
    output += cl.lDoc.nDemo.gTextareaDemo.Template.docParams({stringifyParams: docParamData3515.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3522 = '{';
  lb__soy3522 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3522);
  var rb__soy3524 = '}';
  rb__soy3524 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3524);
  var iLimit3526 = opt_data.stringifyParams.length;
  for (var i3526 = 0; i3526 < iLimit3526; i3526++) {
    output += (opt_data.stringifyParams[i3526] == lb__soy3522) ? soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3526] == rb__soy3524) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + ((i3526 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3526 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3526] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3526] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + ((i3526 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3526 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3526] == ',') ? (opt_data.stringifyParams[i3526 - 1] == rb__soy3524 || opt_data.stringifyParams[i3526 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + '<br>' : (opt_data.stringifyParams[i3526] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3526]) + ' ' : (opt_data.stringifyParams[i3526] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3526]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.gTextareaDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.gTextareaDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.gTextareaDemo.Template.docParams';
}
// This file was automatically generated from i-demo.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace cl.lDoc.nDemo.iDemo.Template.
 */

if (typeof cl == 'undefined') { var cl = {}; }
if (typeof cl.lDoc == 'undefined') { cl.lDoc = {}; }
if (typeof cl.lDoc.nDemo == 'undefined') { cl.lDoc.nDemo = {}; }
if (typeof cl.lDoc.nDemo.iDemo == 'undefined') { cl.lDoc.nDemo.iDemo = {}; }
if (typeof cl.lDoc.nDemo.iDemo.Template == 'undefined') { cl.lDoc.nDemo.iDemo.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.demo = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.params.namespace) ? cl.lDoc.nDemo.iDemo.Template.soydoc(opt_data, null, opt_ijData) : '') + '<div class="l-doc__decorate-demo">';
  var itemList3572 = opt_data.params.data;
  var itemListLen3572 = itemList3572.length;
  for (var itemIndex3572 = 0; itemIndex3572 < itemListLen3572; itemIndex3572++) {
    var itemData3572 = itemList3572[itemIndex3572];
    output += ((itemData3572.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3572.description) + '</h2>' : '') + ((itemData3572.showParams) ? cl.lDoc.nDemo.iDemo.Template.params({stringifyParams: itemData3572.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test' + cl.lDoc.nDemo.iDemo.Template.template({params: itemData3572.params}, null, opt_ijData) + '</div>' : cl.lDoc.nDemo.iDemo.Template.template({params: itemData3572.params}, null, opt_ijData));
  }
  output += cl.lDoc.nDemo.iDemo.Template.custom(opt_data, null, opt_ijData) + '</div><div class="l-doc__render-demo">';
  var itemList3598 = opt_data.params.data;
  var itemListLen3598 = itemList3598.length;
  for (var itemIndex3598 = 0; itemIndex3598 < itemListLen3598; itemIndex3598++) {
    var itemData3598 = itemList3598[itemIndex3598];
    output += ((itemData3598.description) ? '<h2 class="l-doc__h2">' + soy.$$escapeHtml(itemData3598.description) + '</h2>' : '') + ((itemData3598.showParams) ? cl.lDoc.nDemo.iDemo.Template.params({stringifyParams: itemData3598.stringifyParams}, null, opt_ijData) : '') + ((opt_data.params.helper) ? '<div class="l-doc-element" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '">' + soy.$$escapeHtml(opt_data.params.type) + '-test<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3598.stringifyParams) + '"></div></div>' : '<div class="l-doc__dummy" data-type="' + soy.$$escapeHtmlAttribute(opt_data.params.type) + '" data-params="' + soy.$$escapeHtmlAttribute(itemData3598.stringifyParams) + '"></div>');
  }
  output += cl.lDoc.nDemo.iDemo.Template.custom(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.demo.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.demo';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.template = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('NO_TEMPLATE');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.template.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.template';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.custom = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.custom.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.custom';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.soydoc = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<h2 class="l-doc__h2">Template namespace: ' + soy.$$escapeHtml(opt_data.params.namespace) + '</h2>';
  var docParamList3635 = opt_data.params.soydoc.docParams;
  var docParamListLen3635 = docParamList3635.length;
  for (var docParamIndex3635 = 0; docParamIndex3635 < docParamListLen3635; docParamIndex3635++) {
    var docParamData3635 = docParamList3635[docParamIndex3635];
    output += cl.lDoc.nDemo.iDemo.Template.docParams({stringifyParams: docParamData3635.description}, null, opt_ijData);
  }
  output += '<br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.soydoc.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.soydoc';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="l-doc__contract">params:  ';
  var lb__soy3642 = '{';
  lb__soy3642 = soydata.$$markUnsanitizedTextForInternalBlocks(lb__soy3642);
  var rb__soy3644 = '}';
  rb__soy3644 = soydata.$$markUnsanitizedTextForInternalBlocks(rb__soy3644);
  var iLimit3646 = opt_data.stringifyParams.length;
  for (var i3646 = 0; i3646 < iLimit3646; i3646++) {
    output += (opt_data.stringifyParams[i3646] == lb__soy3642) ? soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3646] == rb__soy3644) ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + ((i3646 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3646 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3646] == '[') ? soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + '<br><div class="l-doc__indent-block">' : (opt_data.stringifyParams[i3646] == ']') ? '</div><br>' + soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + ((i3646 != opt_data.stringifyParams.length && opt_data.stringifyParams[i3646 + 1] == ',') ? ',' : '') + '<br>' : (opt_data.stringifyParams[i3646] == ',') ? (opt_data.stringifyParams[i3646 - 1] == rb__soy3644 || opt_data.stringifyParams[i3646 - 1] == ']') ? '' : soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + '<br>' : (opt_data.stringifyParams[i3646] == ':') ? soy.$$escapeHtml(opt_data.stringifyParams[i3646]) + ' ' : (opt_data.stringifyParams[i3646] == '"') ? '\'' : soy.$$escapeHtml(opt_data.stringifyParams[i3646]);
  }
  output += '</div><br>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.params.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
cl.lDoc.nDemo.iDemo.Template.docParams = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="l-doc__contract l-doc__contract_pre">params:   ' + soy.$$escapeHtml(opt_data.stringifyParams) + '</div><br>');
};
if (goog.DEBUG) {
  cl.lDoc.nDemo.iDemo.Template.docParams.soyTemplateName = 'cl.lDoc.nDemo.iDemo.Template.docParams';
}
// This file was automatically generated from b-data-block_addresses.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlockAddresses.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bDataBlockAddresses == 'undefined') { sm.lSchool.bDataBlockAddresses = {}; }
if (typeof sm.lSchool.bDataBlockAddresses.Template == 'undefined') { sm.lSchool.bDataBlockAddresses.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockAddresses.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bDataBlockAddresses.Template.init({params: {header: opt_data.params.header, headerType: opt_data.params.headerType ? opt_data.params.headerType : 3, modifier: opt_data.params.modifier ? 'b-data-block_addresses' + opt_data.params.modifier : 'b-data-block_addresses', content: opt_data.params.content}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockAddresses.Template.base.soyTemplateName = 'sm.lSchool.bDataBlockAddresses.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockAddresses.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul class="b-data-block__content">';
  var stageList3692 = opt_data.params.content.stages;
  var stageListLen3692 = stageList3692.length;
  for (var stageIndex3692 = 0; stageIndex3692 < stageListLen3692; stageIndex3692++) {
    var stageData3692 = stageList3692[stageIndex3692];
    output += '<li class="b-data-block__item b-data-block__contact"><div class="b-data-block__item-content"><div class="b-data-block__item-content-left">' + soy.$$escapeHtml(stageData3692.name) + '</div><div class="b-data-block__item-content-right">';
    var addressList3696 = stageData3692.addresses;
    var addressListLen3696 = addressList3696.length;
    for (var addressIndex3696 = 0; addressIndex3696 < addressListLen3696; addressIndex3696++) {
      var addressData3696 = addressList3696[addressIndex3696];
      output += '<div class="b-data-block__item-content-address">' + soy.$$escapeHtml(addressData3696.description) + '</div><div class="b-data-block__item-content-metroStation">' + ((addressData3696.metroStations.length > 0) ? '<div class="b-data-block__metro-icon b-icon_img_metro"></div>' + soy.$$escapeHtml(addressData3696.metroStations[0].name) : '') + '</div>';
    }
    output += '</div>' + ((! (stageIndex3692 == stageListLen3692 - 1)) ? '<div class="b-data-block__line horisontal-line"></div>' : '') + '</div></li>';
  }
  if (opt_data.params.content.phones.length > 0) {
    output += '<li class="b-data-block__item-phones"><div class="b-data-block__item-phones-caption">\u0422\u0435\u043B\u0435\u0444\u043E\u043D\u044B </div>';
    var phoneList3715 = opt_data.params.content.phones;
    var phoneListLen3715 = phoneList3715.length;
    for (var phoneIndex3715 = 0; phoneIndex3715 < phoneListLen3715; phoneIndex3715++) {
      var phoneData3715 = phoneList3715[phoneIndex3715];
      output += soy.$$escapeHtml(phoneData3715) + ((! (phoneIndex3715 == phoneListLen3715 - 1)) ? ', ' : '');
    }
    output += '</li>';
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockAddresses.Template.content.soyTemplateName = 'sm.lSchool.bDataBlockAddresses.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockAddresses.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block' + ((opt_data.params.modifier) ? ' ' + soy.$$escapeHtmlAttribute(opt_data.params.modifier) : '') + '">' + ((opt_data.params.header) ? sm.lSchool.bDataBlockAddresses.Template.header({params: {header: opt_data.params.header}}, null, opt_ijData) : '') + ((opt_data.params.content) ? sm.lSchool.bDataBlockAddresses.Template.content(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockAddresses.Template.init.soyTemplateName = 'sm.lSchool.bDataBlockAddresses.Template.init';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockAddresses.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block__line"></div>' + ((opt_data.params.headerType == 2) ? '<h2 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h2>' : '<h3 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h3>'));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockAddresses.Template.header.soyTemplateName = 'sm.lSchool.bDataBlockAddresses.Template.header';
}
// This file was automatically generated from b-data-block_features.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlockFeatures.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bDataBlockFeatures == 'undefined') { sm.lSchool.bDataBlockFeatures = {}; }
if (typeof sm.lSchool.bDataBlockFeatures.Template == 'undefined') { sm.lSchool.bDataBlockFeatures.Template = {}; }


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
// This file was automatically generated from b-data-block_fold-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlockFoldList.Template.
 */

if (typeof sm == 'undefined') { var sm = {}; }
if (typeof sm.lSchool == 'undefined') { sm.lSchool = {}; }
if (typeof sm.lSchool.bDataBlockFoldList == 'undefined') { sm.lSchool.bDataBlockFoldList = {}; }
if (typeof sm.lSchool.bDataBlockFoldList.Template == 'undefined') { sm.lSchool.bDataBlockFoldList.Template = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFoldList.Template.base = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(sm.lSchool.bDataBlockFoldList.Template.init({params: {header: opt_data.params.header, headerType: opt_data.params.headerType ? opt_data.params.headerType : 3, modifier: opt_data.params.modifier ? 'b-data-block_fold-list' + opt_data.params.modifier : 'b-data-block_fold-list', content: opt_data.params.content}}, null, opt_ijData));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFoldList.Template.base.soyTemplateName = 'sm.lSchool.bDataBlockFoldList.Template.base';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFoldList.Template.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul class="b-data-block__content">';
  var classList3792 = opt_data.params.content;
  var classListLen3792 = classList3792.length;
  for (var classIndex3792 = 0; classIndex3792 < classListLen3792; classIndex3792++) {
    var classData3792 = classList3792[classIndex3792];
    output += (classData3792.items && classData3792.items.length > 0) ? sm.lSchool.bDataBlockFoldList.Template.ratingItem_({params: {name: classData3792.name, items: classData3792.items}}, null, opt_ijData) : '';
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFoldList.Template.content.soyTemplateName = 'sm.lSchool.bDataBlockFoldList.Template.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFoldList.Template.ratingItem_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<li class="b-data-block__item"><a  class="b-data-block__item-content b-data-block__item-content_text-color_red">' + soy.$$escapeHtml(opt_data.params.name) + '</a>' + ((opt_data.params.items) ? '<div class="b-data-block__number">' + soy.$$escapeHtml(opt_data.params.items.length) + '</div>' : '');
  if (opt_data.params.items) {
    output += '<ul class="b-data-block__list i-utils__hidden">';
    var itemList3811 = opt_data.params.items;
    var itemListLen3811 = itemList3811.length;
    for (var itemIndex3811 = 0; itemIndex3811 < itemListLen3811; itemIndex3811++) {
      var itemData3811 = itemList3811[itemIndex3811];
      output += '<li class="b-data-block__list-item">&mdash; ' + soy.$$escapeHtml(itemData3811) + '</li>';
    }
    output += '</ul>';
  }
  output += '</li>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFoldList.Template.ratingItem_.soyTemplateName = 'sm.lSchool.bDataBlockFoldList.Template.ratingItem_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFoldList.Template.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block__line"></div>' + ((opt_data.params.headerType == 2) ? '<h2 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h2>' : '<h3 class="b-data-block__header">' + soy.$$escapeHtml(opt_data.params.header) + '</h3>'));
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFoldList.Template.header.soyTemplateName = 'sm.lSchool.bDataBlockFoldList.Template.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
sm.lSchool.bDataBlockFoldList.Template.init = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="b-data-block' + ((opt_data.params.modifier) ? ' ' + soy.$$escapeHtmlAttribute(opt_data.params.modifier) : '') + '">' + ((opt_data.params.header) ? sm.lSchool.bDataBlockFoldList.Template.header({params: {header: opt_data.params.header}}, null, opt_ijData) : '') + ((opt_data.params.content) ? sm.lSchool.bDataBlockFoldList.Template.content(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  sm.lSchool.bDataBlockFoldList.Template.init.soyTemplateName = 'sm.lSchool.bDataBlockFoldList.Template.init';
}
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
  var ratingList3945 = opt_data.params.content;
  var ratingListLen3945 = ratingList3945.length;
  for (var ratingIndex3945 = 0; ratingIndex3945 < ratingListLen3945; ratingIndex3945++) {
    var ratingData3945 = ratingList3945[ratingIndex3945];
    output += sm.lSchool.bDataBlockRatings.Template.ratingItem_({params: {name: ratingData3945.name, place: ratingData3945.place, href: ratingData3945.href}}, null, opt_ijData);
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
