goog.provide('sm.bDataBlock.DataBlockFeatures');

goog.require('sm.bDataBlock.DataBlock');
goog.require('sm.bDataBlock.DataBlockFeaturesView');

/**
 * Data Block Features
 * @param {Object=} opt_view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.bDataBlock.DataBlock}
 */
sm.bDataBlock.DataBlockFeatures = function(opt_view,
    opt_params, opt_domHelper) {

    goog.base(this, opt_view, opt_params, opt_domHelper);
};
goog.inherits(sm.bDataBlock.DataBlockFeatures, sm.bDataBlock.DataBlock);

goog.scope(function() {
    var DataBlockFeatures = sm.bDataBlock.DataBlockFeatures,
        DataBlockFeaturesView = sm.bDataBlock.DataBlockFeaturesView;

    /**
     * Event enum
     * @enum
     */
    DataBlockFeatures.Event = {
        LINK_FEEDBACK_CLICK: DataBlockFeaturesView.Event.LINK_FEEDBACK_CLICK,
        LINK_INACCURACY_CLICK: DataBlockFeaturesView.Event.LINK_INACCURACY_CLICK
    };

    /**
     * @override
     * @param {Element} element
     */
    DataBlockFeatures.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

    /**
     * @override
     */
    DataBlockFeatures.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.autoDispatch(
            DataBlockFeaturesView.Event.LINK_FEEDBACK_CLICK
        );

        this.autoDispatch(
            DataBlockFeaturesView.Event.LINK_INACCURACY_CLICK
        );
    };
});

