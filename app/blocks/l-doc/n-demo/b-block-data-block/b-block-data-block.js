goog.provide('sm.lDoc.nDemo.bBlockDataBlock.DataBlock');

goog.require('goog.dom');
goog.require('sm.lSchool.bDataBlockFoldList.FoldList');

sm.lDoc.nDemo.bBlockDataBlock.DataBlock = function() {

    var elements = goog.dom.getElementsByClass(
        sm.lSchool.bDataBlockFoldList.FoldList.CssClass.ROOT
    );

    var dataBlockFoldList;

    for (var i = 0, item = elements[i], l = elements.length; i < l; i++) {
        dataBlockFoldList = new sm.lSchool.bDataBlockFoldList.FoldList();
        dataBlockFoldList.decorate(item);
    }
};
