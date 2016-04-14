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
        CLICK_LINK_FEEDBACK: DataBlockFeaturesView.Event.CLICK_LINK_FEEDBACK,
        CLICK_LINK_INACCURACY: DataBlockFeaturesView.Event.CLICK_LINK_INACCURACY
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
            DataBlockFeaturesView.Event.CLICK_LINK_FEEDBACK,
            function(event) {
                event['type'] = DataBlockFeatures.Event.CLICK_LINK_FEEDBACK;
            }
        );

        this.autoDispatch(
            DataBlockFeaturesView.Event.CLICK_LINK_INACCURACY,
            function(event) {
                event['type'] = DataBlockFeatures.Event.CLICK_LINK_INACCURACY;
            }
        );
    };
});

