goog.provide('sm.lDoc.Doc');

goog.require('sm.lDoc.nDemo.bBlockComments.Comments');
goog.require('sm.lDoc.nDemo.bBlockFeedbackModal.BlockFeedbackModal');
goog.require('sm.lDoc.nDemo.bBlockStars.Stars');
goog.require('sm.lDoc.nDemo.bBlockSchoolList.SchoolList');
goog.require('sm.lDoc.nDemo.bBlockSchoolListItem.SchoolListItem');
goog.require('sm.lDoc.nDemo.bBlockSort.Sort');
goog.require('sm.lDoc.nDemo.bBlockFilters.Filters');
goog.require('sm.lDoc.nDemo.bBlockDataBlock.DataBlock');

goog.require('sm.lSchool.School');
goog.require('sm.lSearchResult.SearchResult');

goog.require('sm.bMap.Map');


sm.lDoc.Doc = function() {

};

jQuery(function() {
    var doc = goog.dom.getElementByClass('l-doc');

    if (doc) {
        new sm.lDoc.nDemo.bBlockFilters.Filters();
        new sm.lDoc.nDemo.bBlockComments.Comments();
        new sm.lDoc.nDemo.bBlockFeedbackModal.BlockFeedbackModal(doc);
        new sm.lDoc.nDemo.bBlockSort.Sort();
        new sm.lDoc.nDemo.bBlockSchoolList.SchoolList();
        new sm.lDoc.nDemo.bBlockStars.Stars();
        new sm.lDoc.nDemo.bBlockDataBlock.DataBlock();
        new sm.lDoc.nDemo.bBlockSchoolListItem.SchoolListItem();
    }
});
