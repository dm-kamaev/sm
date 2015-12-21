goog.provide('sm.lDoc.nDemo.bBlockRating.Rating');

goog.require('sm.bRating.Rating');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockRating.Rating = function() {
    var preview = goog.dom.getElementByClass(
        'l-doc__preview-b-rating'
    );

    var elements = goog.dom.getElementsByClass(
        sm.bRating.Rating.CssClass.ROOT,
        preview
    );

    var rating;

    for (var i = 0, elem; elem = elements[i]; i++) {
        rating = new sm.bRating.Rating();
        rating.decorate(elem);
    }
};
