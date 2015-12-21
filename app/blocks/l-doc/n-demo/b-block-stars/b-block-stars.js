goog.provide('sm.lDoc.nDemo.bBlockStars.Stars');

goog.require('sm.bStars.Stars');
goog.require('goog.dom');


/**
 * Category Control documentation
 * @constructor
 */
sm.lDoc.nDemo.bBlockStars.Stars = function() {
    var elements = goog.dom.getElementsByClass(
        sm.bStars.Stars.CssClass.ROOT
    );

    var params = [
        {
            data:{
                mark:1
            }
        },{
            data:{
                mark:2
            }
        },{
            data:{
                mark:3
            }
        },{
            data:{
                mark:4
            }
        },{
            data:{
                mark:5
            }

        },{
            data:{
                mark:3
            },
            config:{
                style:{
                    theme:'colored'
                },
                isClickable: true
            }
        },{
            data:{
                mark:5
            },
            connfig: {
                style:{
                    size:'large'
                }
            }
        },{
            data:{
                mark:4
            },
            config: {
                style:{
                    theme:'colored',
                    size:'large'
                },
                isClickable:true
            }
        }
    ]




    if (elements !== null) {
        var stars;
        for (var i = 0, elem; elem = elements[i]; i++) {
            stars = new sm.bStars.Stars(params[i]);
            stars.decorate(elem);
        }
    }

};
