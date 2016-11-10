goog.provide('sm.iAnimate.Animate');



goog.scope(function() {
var Animate = sm.iAnimate.Animate;


    /**
     * Css class enum
     * @enum {string}
     */
    Animate.CssClass = {
        ANIMATE: 'i-animate'
    };


    /**
     * Checks if css animation supported
     * @return {boolean}
     */
    Animate.isSupported = function() {
        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            pfx = '',
            elm = document.createElement('div');

        if (elm.style.animationName !== undefined) {
            animation = true;
        }

        if (animation === false) {
            for (var i = 0; i < domPrefixes.length; i++) {
                if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                    pfx = domPrefixes[i];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                    break;
                }
            }
        }

        return animation;
    };
});  // goog.scope
