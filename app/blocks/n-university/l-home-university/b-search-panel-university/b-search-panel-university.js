goog.provide('sm.bSearchPanelUniversity.SearchPanelUniversity');

goog.require('cl.iControl.Control');
goog.require('sm.bSearch.Search');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iSmQueryBuilder.QueryBuilder');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.iSmViewport.SmViewport');
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

    var QueryBuilder = goog.module.get('sm.iSmQueryBuilder.QueryBuilder');

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


    /**
     * Query builder instance
     * @type {sm.iSmQueryBuilder.QueryBuilder}
     * @private
     */
    this.queryBuilder_ = new QueryBuilder();
};
goog.inherits(
    sm.bSearchPanelUniversity.SearchPanelUniversity,
    cl.iControl.Control
);


goog.scope(function() {
    var SearchPanel = sm.bSearchPanelUniversity.SearchPanelUniversity,
        View = sm.bSearchPanelUniversity.View,
        viewport = sm.iSmViewport.SmViewport.getInstance();

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

        this.initViewportListener_();
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
     *      cities: ?number,
     *      payType: (number|number[]),
     *      egeSubjects: ?(number[])
     * }}
     */
    SearchPanel.prototype.getData = function() {
        var data = {
            payType: this.payType_.getValue()
        };

        var cities = this.searchCity_.getCityId();
        if (cities) {
            data.cities = cities;
        }

        var ege = this.getEgeIdes();
        if (ege.length) {
            data.egeSubjects = ege;
        }

        return data;
    };


    /**
     * Get data
     * @return {number[]}
     */
    SearchPanel.prototype.getEgeIdes = function() {
        var ege = this.searchEge_.getCheckedData();
        return ege.map(item => item.value);
    };


    /**
     * Get ege labels
     * @return {string[]}
     */
    SearchPanel.prototype.getEgeLabels = function() {
        var ege = this.searchEge_.getCheckedData();
        return ege.map(item => item.label);
    };


    /**
     * Get data for analytics
     * @return {string}
     * @protected
     */
    SearchPanel.prototype.getDataForAnalytics = function() {
        var data = [
            'payType=' + this.payType_.getLabel()
        ];

        var city = this.searchCity_.getText();
        if (city) {
            data.push('cities=' + city);
        }

        var ege = this.getEgeLabels();
        if (ege.length) {
            data.push('egeSubjects=' + ege.join(','));
        }

        return data.join('&');
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
        this.sendAnalytics_();
        this.redirect_();
    };


    /**
     * Send data to analytics
     * @private
     */
    SearchPanel.prototype.sendAnalytics_ = function() {
        var data = {
            'hitType': 'event',
            'eventCategory': 'homepage',
            'eventAction': 'search',
            'eventLabel': this.getDataForAnalytics()
        };

        sm.iAnalytics.Analytics.getInstance().send(data);
    };


    /**
     * Button submit handler
     * @private
     */
    SearchPanel.prototype.redirect_ = function() {
        var data = this.getData();
        var queryData = this.queryBuilder_.buildUrlQuery(data);
        var url = this.params.urlRedirect + '?' + queryData.toString();

        window.location.href = url;
    };

    /**
     * Initializes listeners for viewport
     * @private
     */
    SearchPanel.prototype.initViewportListener_ = function() {
        this.getHandler().listen(
            viewport,
            sm.iSmViewport.SmViewport.Event.RESIZE,
            this.onResize_
        );
    };


    /**
     * Resize handler
     * @private
     */
    SearchPanel.prototype.onResize_ = function() {
        this.displayNeededCountOfCheckboxes();
    };

    /**
     * Show/hide options in different sizes of screen
     */
    SearchPanel.prototype.displayNeededCountOfCheckboxes = function() {
        if (viewport.getSize() <= sm.iSmViewport.SmViewport.Size.XS) {
            this.searchEge_.showLess();
        } else {
            this.searchEge_.showMore();
        }
    };


    /**
     * Initializes filter array
     * @private
     */
    SearchPanel.prototype.initSearchBlocks_ = function() {
        var dom = this.getView().getDom();

        this.searchEge_ = this.decorateChild(
            sm.lSearch.bFilter.Filter.NAME,
            dom.searchEge
        );
        this.displayNeededCountOfCheckboxes();

        this.searchCity_ = new sm.bSearch.Search();
        this.addChild(this.searchCity_);
        this.searchCity_.decorate(dom.searchCity);

        this.payType_ = this.decorateChild(
            sm.gDropdown.DropdownSelect.NAME,
            dom.payType
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
