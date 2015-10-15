goog.provide('sm.lDoc.nDemo.bBlockStars.Stars');

goog.require('sm.bStars.Stars');
goog.require('goog.dom');


/**
 * Category Control documentation
 * @constructor
 */
sm.lDoc.nDemo.bBlockStars.Stars = function() {
    console.log('STARS DOC CONSTRUCTOR');
    var elements = goog.dom.getElementsByClass(
        sm.bStars.Stars.CssClass.ROOT
    );

    if (elements !== null) {
        var stars;
        for (var i = 0, elem; elem = elements[i]; i++) {
            stars = new sm.bStars.Stars();
            stars.decorate(elem);
        }
    }
};

new sm.lDoc.nDemo.bBlockStars.Stars();
