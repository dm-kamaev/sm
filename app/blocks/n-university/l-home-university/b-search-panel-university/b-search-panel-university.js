goog.provide('sm.bSearchPanelUniversity.SearchPanelUniversity');

goog.require('cl.iControl.Control');
goog.require('sm.bSearch.Search');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.bSearchPanelUniversity.Template');
goog.require('sm.bSearchPanelUniversity.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSearchPanelUniversity.SearchPanelUniversity =
    function(view, opt_domHelper) {
    sm.bSearchPanelUniversity.SearchPanelUniversity.base(this, 'constructor',
        view, opt_domHelper);

    /**
     * Instance of bSearch
     * @type {sm.bSearch.Search}
     * @private
     */
    this.searchCity_ = null;


    /**
     * Instance of dropdown
     * @type {sm.gDropdown.DropdownSelect}
     * @private
     */
    this.payType_ = null;


    /**
     * Instance of bFilter
     * @type {sm.lSearch.bFilter.Filter}
     * @private
     */
    this.searchEge_ = null;


    /**
     * Instance of button
     * @type {sm.gButton.ButtonStendhal}
     * @private
     */
    this.button_ = null;
};
goog.inherits(
    sm.bSearchPanelUniversity.SearchPanelUniversity,
    cl.iControl.Control
);


goog.scope(function() {
    var SearchPanel = sm.bSearchPanelUniversity.SearchPanelUniversity,
        View = sm.bSearchPanelUniversity.View;

    /**
     * Name of this element in factory
     */
    SearchPanel.NAME = sm.bSearchPanelUniversity.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(SearchPanel.NAME, {
        control: SearchPanel,
        view: View
    });

    /**
     * Event enum
     * @enum {string}
     */
    SearchPanel.Event = {
        SUBMIT: goog.events.getUniqueId('submit')
    };


    /**
     * @typedef {?}
     */
    SearchPanel.FilterData;


    /**
     * @override
     * @param {Element} element
     */
    SearchPanel.prototype.decorateInternal = function(element) {
        SearchPanel.base(this, 'decorateInternal', element);

        this.initSearchBlocks_();
        this.initButton_();
    };


    /**
     * @override
     */
    SearchPanel.prototype.enterDocument = function() {
        SearchPanel.base(this, 'enterDocument');

        this.initButtonListeners_();
    };

    /**
     * Get data
     * @return {{
     *      searchCity: string,
     *      payType: number,
     *      searchEge: sm.lSearch.bFilter.Filter.Data
     * }}
     */
    SearchPanel.prototype.getData = function() {
        return {
            searchCity: this.searchCity_.getText(),
            payType: this.payType_.getValue(),
            searchEge: this.searchEge_.getCheckedData()
        };
    };


    /**
     * Initializes listeners for button submit
     * @private
     */
    SearchPanel.prototype.initButtonListeners_ = function() {
        if (this.button_) {
            this.getHandler().listen(
                this.button_,
                cl.gButton.Button.Event.CLICK,
                this.onSubmit_
            );
        }
    };


    /**
     * Button submit handler
     * @private
     */
    SearchPanel.prototype.onSubmit_ = function() {
        this.dispatchEvent({
            'type': SearchPanel.Event.SUBMIT,
            'data': this.getData()
        });
    };



    /**
     * Initializes filter array
     * @private
     */
    SearchPanel.prototype.initSearchBlocks_ = function() {
        var dom = this.getView().getDom();

        this.searchCity_ = new sm.bSearch.Search();
        this.addChild(this.searchCity_);
        this.searchCity_.decorate(dom.searchCity);

        this.payType_ = this.decorateChild(
            sm.gDropdown.DropdownSelect.NAME,
            dom.payType
        );

        this.searchEge_ = this.decorateChild(
            sm.lSearch.bFilter.Filter.NAME,
            dom.searchEge
        );
    };


    /**
     * Initializes button submit
     * @private
     */
    SearchPanel.prototype.initButton_ = function() {
        this.button_ = this.decorateChild(
            sm.gButton.ButtonStendhal.NAME,
            this.getView().getDom().button
        );
    };
});  // goog.scope
