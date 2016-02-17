// This file was automatically generated from b-feedback-modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bFeedbackModal.Template.
 */

goog.provide('sm.lSchool.bFeedbackModal.Template');

goog.require('soy');
goog.require('soydata');
goog.require('sm.bStars.Template');
goog.require('sm.iFactory.TemplateFactoryStendhal.INSTANCE');


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
