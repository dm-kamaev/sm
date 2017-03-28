goog.provide('sm.lSearch.bTooltip.Tooltip');

goog.require('cl.iControl.Control');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSearch.bTooltip.Template');
goog.require('sm.lSearch.bTooltip.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSearch.bTooltip.Tooltip = function(view, opt_domHelper) {
    sm.lSearch.bTooltip.Tooltip.base(this, 'constructor',
        view, opt_domHelper);


    /**
     * Instance button
     * @type {sm.gButton.ButtonStendhal}
     * @private
     */
    this.button_ = null;
};
goog.inherits(sm.lSearch.bTooltip.Tooltip, cl.iControl.Control);


goog.scope(function() {
    var Tooltip = sm.lSearch.bTooltip.Tooltip,
        View = sm.lSearch.bTooltip.View;

    /**
     * Name of this element in factory
     */
    Tooltip.NAME = sm.lSearch.bTooltip.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Tooltip.NAME,
        {
            control: Tooltip,
            view: View
        }
    );

    /**
     * Event enum
     * @enum {string}
     */
    Tooltip.Event = {
        CLICK: sm.gButton.ButtonStendhal.Event.CLICK
    };


    /**
     * Animate classes
     * @enum {string}
     */
    Tooltip.Animation = View.Animation;


    /**
     * Show element for specified time
     * @param {Tooltip.Speed} speed
     * @public
     */
    Tooltip.prototype.display = function(speed) {
        this.getView().display(speed);
    };


    /**
     * Show button
     * @public
     */
    Tooltip.prototype.showButton = function() {
        this.getView().showButton();
    };


    /**
     * Hide button
     * @public
     */
    Tooltip.prototype.hideButton = function() {
        this.getView().hideButton();
    };


    /**
     * Set text
     * @param {string} text
     * @public
     */
    Tooltip.prototype.setText = function(text) {
        this.getView().setText(text);
    };


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    Tooltip.prototype.decorateInternal = function(element) {
        Tooltip.base(this, 'decorateInternal', element);

        this.decorateButton_();
    };


    /**
     * Decorate button
     * @private
     */
    Tooltip.prototype.decorateButton_ = function() {
        var button = this.getView().getDom().button;
        if (button) {
            this.button_ = this.decorateChild('button', button);
        }
    };
});  // goog.scope
