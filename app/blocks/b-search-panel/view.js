goog.provide('sm.bSearchPanel.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');

/**
 * Search Panel View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSearchPanel.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

};
goog.inherits(sm.bSearchPanel.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSearchPanel.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-search-panel',
        BUTTON: 'b-search-panel__button'
    };

    /**
     * Event enum
     * @enum {String}
     */
    View.Event = {
       CLICK_BUTTON: 'click-button'
    };

    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_(element);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.button,
            goog.events.EventType.CLICK,
            this.onClickButton_
        );
    };

    /**
     * gets DOM elements
     * @param {Element} root
     * @private
     */
    View.prototype.initElements_ = function(root) {
        this.dom = {
            button: goog.dom.getElementByClass(
                View.CssClass.BUTTON
            ),
            search: goog.dom.getElementByClass(
                sm.bSearch.Search.CssClass.ROOT
            )
        };
    };

    /**
     * Click button
     * @private
     */
    View.prototype.onClickButton_ = function() {
        this.dispatchEvent({
            'type': View.Event.CLICK_BUTTON
        });
    };

});
