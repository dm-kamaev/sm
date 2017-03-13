goog.provide('sm.bSearchPanel.SearchPanel');

goog.require('cl.iControl.Control');

goog.require('sm.bSearch.Search');
goog.require('sm.bSearchPanel.Template');
goog.require('sm.bSearchPanel.View');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Search Panel
 * @param {Object=} opt_view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSearchPanel.SearchPanel = function(opt_view, opt_domHelper) {
    goog.base(this, opt_view, opt_domHelper);


    /**
     * Search instance
     * @type {?sm.bSearch.Search}
     * @private
     */
    this.search_ = null;
};
goog.inherits(sm.bSearchPanel.SearchPanel, cl.iControl.Control);


goog.scope(function() {
    var SearchPanel = sm.bSearchPanel.SearchPanel,
        View = sm.bSearchPanel.View,
        Search = sm.bSearch.Search;

    /**
     * Name of this element in factory
     */
    SearchPanel.NAME = sm.bSearchPanel.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(SearchPanel.NAME, {
        control: SearchPanel,
        view: View
    });

    /**
     * @param {Element} element
     * @override
     */
    SearchPanel.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.search_ = new Search();
        this.addChild(this.search_);
        this.search_.decorate(this.getView().getDom().search);
    };


    /**
     * @override
     */
    SearchPanel.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.CLICK_BUTTON,
            this.onButtonClick_
        );
    };


    /**
     * Button click handler
     * @private
     */
    SearchPanel.prototype.onButtonClick_ = function() {
        this.searchRequest_(this.search_.getText());
    };


     /**
     * Search redirect
     * @param {string} searchString
     * @private
     */
    SearchPanel.prototype.searchRequest_ = function(searchString) {
        var url = '/school';
        if (searchString) {
            url += '?name=' + encodeURIComponent(searchString);
        }
        document.location.href = url;
    };
});  // goog.scope
