goog.provide('sm.bDataBlock.DataBlockFeaturesView');

goog.require('sm.bDataBlock.View');

/**
 * Data Block View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.bDataBlock.View}
 */
sm.bDataBlock.DataBlockFeaturesView = function(opt_params,
    opt_template, opt_modifier) {

    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.bDataBlock.DataBlockFeaturesView, sm.bDataBlock.View);

goog.scope(function() {
    var DataBlockFeaturesView = sm.bDataBlock.DataBlockFeaturesView;

    /**
     * CssClass enum
     * @enum
     */
    DataBlockFeaturesView.CssClass = {
        ROOT: 'l-school__section_features',
        LINK_FEEDBACK: 'b-data-block__link-feedback',
        LINK_INACCURACY: 'b-data-block__link-inaccuracy'
    };

    /**
     * Event enum
     * @enum
     */
    DataBlockFeaturesView.Event = {
        CLICK_LINK_FEEDBACK: 'click-link-feedback',
        CLICK_LINK_INACCURACY: 'click-link-inaccuracy'
    };

    /**
     * @override
     * @param {Element} element
     */
    DataBlockFeaturesView.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_(element);
    };

    /**
     * @override
     */
    DataBlockFeaturesView.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.linkFeedback,
            goog.events.EventType.CLICK,
            this.onClicklinkFeedback_
        );

        this.getHandler().listen(
            this.dom.linkInaccuracy,
            goog.events.EventType.CLICK,
            this.onClicklinkInaccuracy_
        );
    };

    /**
     * Click link Feedback
     * @private
     */
    DataBlockFeaturesView.prototype.onClicklinkFeedback_ = function() {
        this.dispatchEvent({
            'type': DataBlockFeaturesView.Event.CLICK_LINK_FEEDBACK
        });
    };

    /**
     * Click link Feedback
     * @private
     */
    DataBlockFeaturesView.prototype.onClicklinkInaccuracy_ = function() {
        this.dispatchEvent({
            'type': DataBlockFeaturesView.Event.CLICK_LINK_INACCURACY
        });
    };

    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    DataBlockFeaturesView.prototype.initDom_ = function(element) {
        this.dom = {
            linkFeedback: this.getElementByClass(
                DataBlockFeaturesView.CssClass.LINK_FEEDBACK
            ),
            linkInaccuracy: this.getElementByClass(
                DataBlockFeaturesView.CssClass.LINK_INACCURACY
            )
        };
    };
});
