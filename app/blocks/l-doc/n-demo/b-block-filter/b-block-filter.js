goog.provide('sm.lSearchResult.bBlockFilter.Filter');

goog.require('sm.lSearchResult.bFilter.Filter');
goog.require('goog.dom');

sm.lSearchResult.bBlockFilter.Filter = function() {
    var Class = sm.lSearchResult.bFilter.Filter;

    var elements = goog.dom.getElementsByClass(
        Class.CssClass.ROOT
    );

    for (var i = 0, instance, elem; elem = elements[i]; i++) {
        instance = new Class();
        instance.decorate(elem);
    }
};


jQuery(function() {
    var doc = goog.dom.getElementByClass('l-doc');
    if (doc) {
        new sm.lSearchResult.bBlockFilter.Filter();
    }
});
