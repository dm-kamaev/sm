goog.provide('sm.iSmViewport.SmViewport');

goog.require('goog.events.EventTarget');



/**
 * Viewport
 * @constructor
 */
sm.iSmViewport.SmViewport = function() {
    goog.base(this);


    /**
     * Current size
     * @type {?Viewport.Size}
     * @private
     */
    this.size_ = null;


    this.init_();
};
goog.inherits(sm.iSmViewport.SmViewport, goog.events.EventTarget);
goog.addSingletonGetter(sm.iSmViewport.SmViewport);


goog.scope(function() {
    var Viewport = sm.iSmViewport.SmViewport;


    /**
     * Viewport sizes enum
     * @enum {number}
     */
    Viewport.Size = {
        'XXS': 350,
        'XS': 670,
        'S': 790,
        'M': 980,
        'L': 1100,
        'XL': 1280
    };


    /**
     * Events enum
     * @enum {string}
     */
    Viewport.Event = {
        'RESIZE': 'resize'
    };


    /**
     * Current size
     * @return {?Viewport.Size}
     */
    Viewport.prototype.getSize = function() {
        return this.size_;
    };


    /**
     * Viewport initialization
     * @private
     */
    Viewport.prototype.init_ = function() {
        this.size_ = this.calcSize_();

        goog.events.listen(
            window,
            goog.events.EventType.RESIZE,
            this.onResize_,
            false,
            this
        );
    };


    /**
     * Viewport size calculation
     * @return {Viewport.Size}
     * @private
     */
    Viewport.prototype.calcSize_ = function() {
        var size = Viewport.Size.XL;

        var width = Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
        );

        if (width <= Viewport.Size.XXS) {
            size = Viewport.Size.XXS;
        }
        else if (width <= Viewport.Size.XS) {
            size = Viewport.Size.XS;
        }
        else if (width <= Viewport.Size.S) {
            size = Viewport.Size.S;
        }
        else if (width <= Viewport.Size.M) {
            size = Viewport.Size.M;
        }
        else if (width <= Viewport.Size.L) {
            size = Viewport.Size.L;
        }

        return size;
    };


    /**
     * Resize event handling
     * @private
     */
    Viewport.prototype.onResize_ = function() {
        var size = this.calcSize_();

        if (size != this.size_) {
            this.size_ = size;

            this.dispatchEvent({
                'type': Viewport.Event.RESIZE,
                'newSize': size
            });
        }
    };
});  // goog.scope
