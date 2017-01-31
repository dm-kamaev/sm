goog.provide('sm.lSearch.bFilter.FilterSwitch');

goog.require('sm.bSmRadioButton.SmRadioButton');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.TemplateSwitch');
goog.require('sm.lSearch.bFilter.ViewSwitch');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.lSearch.bFilter.Filter}
 */
sm.lSearch.bFilter.FilterSwitch = function(view, opt_domHelper) {
    sm.lSearch.bFilter.FilterSwitch.base(this, 'constructor',
        view, opt_domHelper);
};
goog.inherits(sm.lSearch.bFilter.FilterSwitch, sm.lSearch.bFilter.Filter);


goog.scope(function() {
    var FilterSwitch = sm.lSearch.bFilter.FilterSwitch,
        View = sm.lSearch.bFilter.ViewSwitch;

    /**
     * Name of this element in factory
     */
    FilterSwitch.NAME = sm.lSearch.bFilter.TemplateSwitch.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(FilterSwitch.NAME, {
        control: FilterSwitch,
        view: View
    });

    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    FilterSwitch.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * Initializes listeners for options
     * @protected
     */
    FilterSwitch.prototype.initOptionsListeners = function() {
        var handler = this.getHandler();

        for (var i = 0; i < this.options.length; i++) {
            handler.listen(
                this.options[i],
                sm.bSmRadioButton.SmRadioButton.Event.CHECK,
                this.onOptionCheck
            );

            handler.listen(
                this.options[i],
                sm.bSmRadioButton.SmRadioButton.Event.UNCHECK,
                this.onOptionUnheck
            );
        }
    };


    /**
     * Initializes options
     * @protected
     */
    FilterSwitch.prototype.initOptions = function() {
        this.getView().initOptions();

        var elements = this.getView().getDom().options,
            instance;

        this.options = [];

        for (var i = 0; i < elements.length; i++) {
            instance = this.decorateChild(
                sm.bSmRadioButton.SmRadioButton.NAME,
                elements[i]
            );

            this.options.push(instance);
        }
    };
});  // goog.scope
