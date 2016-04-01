goog.provide('sm.lDoc.nDemo.bBlockSort.Sort');

goog.require('sm.lSearchResult.bSort.Sort');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockSort.Sort = function() {
    var preview = goog.dom.getElementByClass(
        'l-doc__preview-b-sort'
    );

    var elements = goog.dom.getElementsByClass(
        sm.lSearchResult.bSort.Sort.CssClass.ROOT,
        preview
    );

    var instance;

    for (var i = 0, elem; elem = elements[i]; i++) {
        instance = new sm.lSearchResult.bSort.Sort();
        instance.decorate(elem);
    }
};
