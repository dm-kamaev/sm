goog.provide('sm.bDataBlock.DataBlockFeatures');

goog.require('sm.bDataBlock.DataBlock');
goog.require('sm.bDataBlock.DataBlockFeaturesView');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');
goog.require('sm.lSchool.bDataBlock.TemplateFeatures');



/**
 * Data Block Features
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.bDataBlock.DataBlock}
 */
sm.bDataBlock.DataBlockFeatures = function(view, opt_domHelper) {

    goog.base(this, view, opt_domHelper);
};
goog.inherits(sm.bDataBlock.DataBlockFeatures, sm.bDataBlock.DataBlock);


goog.scope(function() {
    var DataBlockFeatures = sm.bDataBlock.DataBlockFeatures,
        DataBlockFeaturesView = sm.bDataBlock.DataBlockFeaturesView;

    /**
     * Name of this element in factory
     */
    DataBlockFeatures.NAME = sm.lSchool.bDataBlock.TemplateFeatures.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(DataBlockFeatures.NAME, {
        control: DataBlockFeatures,
        view: DataBlockFeaturesView
    });

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
});  // goog.scope

