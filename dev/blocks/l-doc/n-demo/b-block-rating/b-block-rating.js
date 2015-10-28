goog.provide('sm.lDoc.nDemo.bBlockRating.Rating');

goog.require('sm.lSchool.bRating.Rating');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockRating.Rating = function() {
    var elements = goog.dom.getElementsByClass(
        sm.lSchool.bRating.Rating.CssClass.ROOT
    );

    var rating;
    for (var i = 0, elem; elem = elements[i]; i++) {
        rating = new sm.lSchool.bRating.Rating();
        rating.decorate(elem);
        rating.setValues([2,2,2,2]);
        rating.setValue(3,0);
    }
};

new sm.lDoc.nDemo.bBlockRating.Rating();
