goog.provide('sm.lDoc.nDemo.bBlockDataBlock.DataBlock');

goog.require('goog.dom');
goog.require('sm.lSchool.bDataBlock.DataBlockFoldList');

sm.lDoc.nDemo.bBlockDataBlock.DataBlock = function() {

    var elements = goog.dom.getElementsByClass(
        sm.lSchool.bDataBlock.DataBlockFoldList.CssClass.ROOT
    );

    var dataBlockFoldList;

    for (var i = 0, item = elements[i], l = elements.length; i < l; i++) {
        dataBlockFoldList = new sm.lSchool.bDataBlock.DataBlockFoldList();
        dataBlockFoldList.decorate(item);
    }
};
