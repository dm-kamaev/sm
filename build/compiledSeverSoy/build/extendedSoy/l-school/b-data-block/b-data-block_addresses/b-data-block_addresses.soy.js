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
  var stageList3693 = opt_data.params.content.stages;
  var stageListLen3693 = stageList3693.length;
  for (var stageIndex3693 = 0; stageIndex3693 < stageListLen3693; stageIndex3693++) {
    var stageData3693 = stageList3693[stageIndex3693];
    output += '<li class="b-data-block__item b-data-block__contact"><div class="b-data-block__item-content"><div class="b-data-block__item-content-left">' + soy.$$escapeHtml(stageData3693.name) + '</div><div class="b-data-block__item-content-right">';
    var addressList3697 = stageData3693.addresses;
    var addressListLen3697 = addressList3697.length;
    for (var addressIndex3697 = 0; addressIndex3697 < addressListLen3697; addressIndex3697++) {
      var addressData3697 = addressList3697[addressIndex3697];
      output += '<div class="b-data-block__item-content-address">' + soy.$$escapeHtml(addressData3697.description) + '</div><div class="b-data-block__item-content-metroStation">' + ((addressData3697.metroStations.length > 0) ? '<div class="b-data-block__metro-icon b-icon_img_metro"></div>' + soy.$$escapeHtml(addressData3697.metroStations[0].name) : '') + '</div>';
    }
    output += '</div>' + ((! (stageIndex3693 == stageListLen3693 - 1)) ? '<div class="b-data-block__line horisontal-line"></div>' : '') + '</div></li>';
  }
  if (opt_data.params.content.phones.length > 0) {
    output += '<li class="b-data-block__item-phones"><div class="b-data-block__item-phones-caption">\u0422\u0435\u043B\u0435\u0444\u043E\u043D\u044B </div>';
    var phoneList3716 = opt_data.params.content.phones;
    var phoneListLen3716 = phoneList3716.length;
    for (var phoneIndex3716 = 0; phoneIndex3716 < phoneListLen3716; phoneIndex3716++) {
      var phoneData3716 = phoneList3716[phoneIndex3716];
      output += soy.$$escapeHtml(phoneData3716) + ((! (phoneIndex3716 == phoneListLen3716 - 1)) ? ', ' : '');
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
