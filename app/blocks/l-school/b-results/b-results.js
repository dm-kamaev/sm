goog.provide('sm.lSchool.bResults.Results');

goog.require('cl.gTab.View');
goog.require('goog.ui.Component');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.lSchool.bResults.Template');

/**
 * sm.lSchool.bResults.Results component
 * @param {Object=} [opt_params = {}]
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bResults.Results = function(opt_params) {
    goog.base(this);

        /**
     * Dom elements
     * @type {Object}
     * @protected
     */
    this.dom = {};

    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.lSchool.bResults.Results, goog.ui.Component);

goog.scope(function() {
    var Results = sm.lSchool.bResults.Results,
        Factory = sm.iFactory.FactoryStendhal,
        TabView = cl.gTab.View,
        DropdownView = cl.gDropdown.View;

    /**
     * Css class enum
     * @enum {string}
     */
    Results.CssClass = {
        ROOT: 'b-results'
    };

    /**
     * Event enum
     * @enum {string}
     */
    Results.Event = {

    };

    /**
     * @override
     */
    Results.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSchool.bResults.Template.results,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * @override
     * @param {Element} element
     */
    Results.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var factory = Factory.getInstance();

        factory.decorate('tab', this.getElementByClass(TabView.CssClass.ROOT));

        factory.decorate('dropdown', this.getElementByClass(DropdownView.CssClass.ROOT));
    };

    /**
     * @override
     */
    Results.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };

    /**
     * @override
     */
    Results.prototype.disposeInternal = function() {
        goog.base(this, 'disposeInternal');

        this.dom = null;
        this.params_ = null;
    };
});
