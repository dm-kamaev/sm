goog.provide('sm.lSearch.bFilter.ViewDropdown');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('sm.lSearch.bFilter.View');



/**
 * Filter View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.View}
 */
sm.lSearch.bFilter.ViewDropdown = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.ViewDropdown.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /**
     * Hide or show content
     * @type {boolean}
     * @private
     */
    this.contentVisibility_ = null;
};
goog.inherits(sm.lSearch.bFilter.ViewDropdown, sm.lSearch.bFilter.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewDropdown,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_dropdown',
        HEADER: 'b-sm-filter__header',
        CONTENT: 'b-sm-filter__content',
        LIST_OPTIONS: 'b-sm-filter__list-options',
        OPTION: 'b-sm-filter__option'
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * Initializes options
     * @param {Element=} opt_element
     * @override
     */
    View.prototype.initOptions = function(opt_element) {
        this.dom.options = this.getElementsByClass(
            sm.gDropdown.ViewSelect.CssClass.ROOT,
            opt_element
        );
    };


    /**
     * Initializes buttons
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.initButtons = function(element) {
    };


    /**
     * Initializes listeners for buttons
     * @protected
     * @override
     */
    View.prototype.initButtonsListeners = function() {
    };


    /**
     * Initializes containers
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.initContainers = function(element) {
        this.dom.list = this.getElementByClass(
            sm.gDropdown.ViewSelect.CssClass.ROOT
        );
    };
});  // goog.scope
