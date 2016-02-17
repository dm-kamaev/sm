// This file was automatically generated from b-data-block_fold-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace sm.lSchool.bDataBlockFoldList.Template.
 */

goog.provide('sm.lSchool.bDataBlockFoldList.Template');

goog.require('soy');
goog.require('soydata');


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
  var classList3793 = opt_data.params.content;
  var classListLen3793 = classList3793.length;
  for (var classIndex3793 = 0; classIndex3793 < classListLen3793; classIndex3793++) {
    var classData3793 = classList3793[classIndex3793];
    output += (classData3793.items && classData3793.items.length > 0) ? sm.lSchool.bDataBlockFoldList.Template.ratingItem_({params: {name: classData3793.name, items: classData3793.items}}, null, opt_ijData) : '';
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
    var itemList3812 = opt_data.params.items;
    var itemListLen3812 = itemList3812.length;
    for (var itemIndex3812 = 0; itemIndex3812 < itemListLen3812; itemIndex3812++) {
      var itemData3812 = itemList3812[itemIndex3812];
      output += '<li class="b-data-block__list-item">&mdash; ' + soy.$$escapeHtml(itemData3812) + '</li>';
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
