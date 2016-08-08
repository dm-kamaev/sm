goog.provide('sm.lSmSearch.SmSearch');

goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lSmSearch.View');


goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lSmSearch.SmSearch = function(view, opt_domHelper) {
        sm.lSmSearch.SmSearch.base(this, 'constructor', view, opt_domHelper);

        /**
         * Sort control
         * @type {sm.gDropdown.DropdownSelect}
         * @private
         */
        this.sort_ = null;


        /**
         * List Instance
         * @type {sm.bSmItemList.SmItemList}
         * @private
         */
        this.resultsList_ = null;
    };
    goog.inherits(sm.lSmSearch.SmSearch, sm.iLayout.LayoutStendhal);
    var Search = sm.lSmSearch.SmSearch;


    /**
     * @param {Element} element
     * @override
     */
    Search.prototype.decorateInternal = function(element) {
        Search.base(this, 'decorateInternal', element);

        this.sort_ = this.decorateChild(
            'dropdown-select',
            this.getView().getDom().sort
        );

        this.resultsList_ = this.decorateChild(
            'smItemList',
            this.getView().getDom().resultsList
        );
    };


});  // goog.scope


/**
 * creates sm.lSmSearch.SmSearch instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lSmSearch.View.CssClass.ROOT
    );

    var view = new sm.lSmSearch.View(null, null, 'stendhal');
    var instance = new sm.lSmSearch.SmSearch(view);

    instance.decorate(domElement);
});
