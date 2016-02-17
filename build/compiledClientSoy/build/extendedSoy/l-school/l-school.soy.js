// This file was automatically generated from l-school.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.Template.
 */

goog.provide('sm.lSchool.Template');

goog.require('soy');
goog.require('soydata');
goog.require('goog.asserts');
goog.require('cl.iUtils.Utils');
goog.require('sm.bHeader.Template');
goog.require('sm.bPopularSchools.Template');
goog.require('sm.bScore.Template');
goog.require('sm.iFactory.TemplateFactoryStendhal.INSTANCE');
goog.require('sm.lSchool.bComments.Template');
goog.require('sm.lSchool.bDataBlockAddresses.Template');
goog.require('sm.lSchool.bDataBlockFeatures.Template');
goog.require('sm.lSchool.bDataBlockFoldList.Template');
goog.require('sm.lSchool.bDataBlockInformation.Template');
goog.require('sm.lSchool.bDataBlockLinks.Template');
goog.require('sm.lSchool.bDataBlockRatings.Template');
goog.require('sm.lSchool.bFooter.Template');
goog.require('sm.lSchool.bMap.Template');
goog.require('sm.lSchool.bResults.Template');


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
