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
