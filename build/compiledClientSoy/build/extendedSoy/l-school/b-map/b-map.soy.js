// This file was automatically generated from b-map.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bMap.Template.
 */

goog.provide('sm.lSchool.bMap.Template');

goog.require('soy');
goog.require('soydata');
goog.require('cl.iUtils.Utils');
goog.require('sm.bIcon.Template');


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
  var dataParams__soy2113 = '' + soy.$$escapeHtml(cl.iUtils.Utils.stringify({json: (opt_data.params == null) ? null : opt_data.params.data}, null, opt_ijData));
  dataParams__soy2113 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(dataParams__soy2113);
  output += '<div class="b-map" data-params="' + soy.$$escapeHtmlAttribute(dataParams__soy2113) + '"></div>';
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
