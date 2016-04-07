goog.provide('sm.gAuthSocial.ViewStendhal');

goog.require('cl.gAuthSocial.View');

/**
 * sm.gAuthSocial.ViewStendhal
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gAuthSocial.View}
 */
sm.gAuthSocial.ViewStendhal = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.gAuthSocial.ViewStendhal, cl.gAuthSocial.View);


goog.scope(function() {
    var View = sm.gAuthSocial.ViewStendhal;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        HREF: cl.gAuthSocial.View.CssClass.ROOT + '__href'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.href = this.getElementByClass(View.CssClass.HREF);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        this.getHandler().listen(
            this.dom.href,
            goog.events.EventType.CLICK,
            this.onHrefClick
        );
    };

    /**
     * On href click actions
     * @protected
     */
    View.prototype.onHrefClick = function() {
        window.open('http://mel.fm/terms');
    };
});
