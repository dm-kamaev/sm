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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<form class="b-feedback__form" method="POST" action="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.url) != null ? ((opt_data.params == null) ? null : (opt_data.params.data == null) ? null : opt_data.params.data.url) : '')) + '"><div class="b-feedback__content"><div class="b-feedback__section b-feedback__section_header"><div class="b-feedback__close-control">' + sm.bIcon.Template.base({params: {spriteCssClass: 'b-icon_img_close-dialog'}}, null, opt_ijData) + '</div><div class="b-feedback__text b-feedback__text_modal-title">\u0412\u0430\u0448 \u043E\u0442\u0437\u044B\u0432</div></div><div class="b-feedback__section b-feedback__section_whoAreYou">' + sm.lSchool.bFeedbackModal.Template.whoAreYou_(null, null, opt_ijData) + '</div><div class="b-feedback__section b-feedback__section_textarea">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'textarea', renderParams: {data: {placeholder: '\u0412\u0430\u0448 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439', name: 'text'}, config: {autoHeight: true}}}}, null, opt_ijData)) + '</div><div class="b-feedback__section b-feedback__section_score"><div class="b-feedback__title-scores">\u0412\u0430\u0448\u0438 \u043E\u0446\u0435\u043D\u043A\u0438</div>' + sm.lSchool.bFeedbackModal.Template.score_(null, null, opt_ijData) + '</div><div class="b-feedback__section b-feedback__section_header">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'button', renderParams: {data: '\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432', config: {theme: 'sienna'}}}}, null, opt_ijData)) + '</div></div></form>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class="b-feedback__text b-feedback__text_header">\u041A\u0442\u043E \u0412\u044B?</span><div class="b-feedback__control b-feedback__control_user-type">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'dropdown-select', renderParams: {data: {defaultCustomText: '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430', listItems: [{label: '\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430'}, {label: '\u0412\u044B\u043F\u0443\u0441\u043A\u043D\u0438\u043A'}, {label: '\u0423\u0447\u0435\u043D\u0438\u043A'}]}, config: {usePlaceholder: true}}}}, null, opt_ijData)) + '</div><div class="b-feedback__class-select i-utils__hidden"><span class="b-feedback__text b-feedback__text_student i-utils__hidden">\u0423\u0447\u0443\u0441\u044C \u0437\u0434\u0435\u0441\u044C \u0432</span><span class="b-feedback__text b-feedback__text_parent i-utils__hidden">\u0420\u0435\u0431\u0451\u043D\u043E\u043A \u0443\u0447\u0438\u0442\u0441\u044F \u0432</span><div class="b-feedback__control b-feedback__control_class-type">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'dropdown-select', renderParams: {data: {listItems: [{label: '1'}, {label: '2'}, {label: '3'}, {label: '4'}, {label: '5'}, {label: '6'}, {label: '7'}, {label: '8'}, {label: '9'}, {label: '10'}, {label: '11'}]}}}}, null, opt_ijData)) + '</div><span class="b-feedback__text">\u043A\u043B\u0430\u0441\u0441\u0435</span></div><div class="b-feedback__graduation-year i-utils__hidden"><span class="b-feedback__text">\u041E\u043A\u043E\u043D\u0447\u0438\u043B \u044D\u0442\u0443 \u0448\u043A\u043E\u043B\u0443 \u0432</span><div class="b-feedback__control b-feedback__control_graduation-year">' + soy.$$escapeHtml(sm.iFactory.TemplateFactoryStendhal.INSTANCE.render({params: {type: 'input-feedback', renderParams: {data: {name: 'year-graduate', maxLength: 4}}}}, null, opt_ijData)) + '</div><span class="b-feedback__text">\u0433\u043E\u0434\u0443</span></div>');
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
  var scores__soy2095 = [{name: 'score[]', title: '\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', description: '\u0414\u043E\u0441\u0442\u0438\u0433\u0430\u044E\u0442 \u043B\u0438 \u0443\u0447\u0435\u043D\u0438\u043A\u0438 \u044D\u0442\u043E\u0439 \u0448\u043A\u043E\u043B\u044B \u0434\u043E\u0441\u0442\u0438\u0433\u0430\u044E\u0442 \u0432\u044B\u0441\u043E\u043A\u0438\u0445 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043D\u0430 \u044D\u043A\u0437\u0430\u043C\u0435\u043D\u0430\u0445?'}, {name: 'score[]', title: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', description: '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043B\u0438 \u0443\u0447\u0438\u0442\u0435\u043B\u044F \u044D\u0442\u043E\u0439 \u0448\u043A\u043E\u043B\u044B \u2014 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043B\u044E\u0431\u044F\u0442 \u0441\u0432\u043E\u044E \u0440\u0430\u0431\u043E\u0442\u0443, \u0445\u043E\u0440\u043E\u0448\u043E \u043E\u0431\u0449\u0430\u044E\u0442\u0441\u044F \u0441 \u0434\u0435\u0442\u044C\u043C\u0438\u0438 \u043F\u043E\u043C\u043E\u0433\u0430\u044E\u0442 \u0438\u043C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u0435 \u0437\u043D\u0430\u043D\u0438\u044F?'}, {name: 'score[]', title: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430', description: '\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430 \u0432 \u0448\u043A\u043E\u043B\u0435, \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u043C\u0435\u0436\u0434\u0443 \u0443\u0447\u0435\u043D\u0438\u043A\u0430\u043C\u0438, \u0443\u0447\u0438\u0442\u0435\u043B\u044F\u043C\u0438, \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044F\u043C\u0438 \u0438 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439 \u0441\u043E\u0437\u0434\u0430\u044E\u0442 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u0443\u044E \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0437\u043D\u0430\u043D\u0438\u0439 \u0441\u0440\u0435\u0434\u0443?'}, {name: 'score[]', title: '\u0418\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430', description: '\u042D\u0442\u0430 \u0448\u043A\u043E\u043B\u0430 \u043E\u0442\u043B\u0438\u0447\u043D\u043E \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0430, \u0432 \u043D\u0435\u0439 \u0435\u0441\u0442\u044C \u0432\u0441\u0451 \u0434\u043B\u044F \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E\u0433\u043E \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u0438 \u0432\u0441\u0435\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0435\u0433\u043E \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044F \u0434\u0435\u0442\u0435\u0439?'}];
  output += '<ul class="b-feedback__scores">';
  var scoreList2097 = scores__soy2095;
  var scoreListLen2097 = scoreList2097.length;
  for (var scoreIndex2097 = 0; scoreIndex2097 < scoreListLen2097; scoreIndex2097++) {
    var scoreData2097 = scoreList2097[scoreIndex2097];
    output += '<li class="b-feedback__score"><div class="b-feedback__title-score">' + soy.$$escapeHtml(scoreData2097.title) + '</div>' + sm.bStars.Template.base({params: {data: {mark: 0}, config: {style: {theme: 'colored', size: 'large'}, isClickable: true}}}, null, opt_ijData) + '<div class="b-feedback__description">' + soy.$$escapeHtml(scoreData2097.description) + '</div></li>';
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  sm.lSchool.bFeedbackModal.Template.score_.soyTemplateName = 'sm.lSchool.bFeedbackModal.Template.score_';
}
