goog.provide('sm.lDoc.nDemo.bBlockFilters.Filters');

goog.require('sm.lSearchResult.bFilters.Filters');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockFilters.Filters = function() {
    var Class = sm.lSearchResult.bFilters.Filters;

    var elements = goog.dom.getElementsByClass(
        Class.CssClass.ROOT
    );

    for (var i = 0, instance, elem; elem = elements[i]; i++) {
        instance = new Class();
        instance.decorate(elem);
    }
};
