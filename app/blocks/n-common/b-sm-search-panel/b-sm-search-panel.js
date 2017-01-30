goog.provide('sm.bSmSearchPanel.SmSearchPanel');

goog.require('cl.iControl.Control');
goog.require('sm.bSearch.Search');
goog.require('sm.bSmSearchPanel.Template');
goog.require('sm.bSmSearchPanel.View');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



goog.scope(function() {
    var View = sm.bSmSearchPanel.View;



    /**
     * Ymaps ballon content template block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmSearchPanel.SmSearchPanel = function(view, opt_domHelper) {
        sm.bSmSearchPanel.SmSearchPanel.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Instance search
         * @type {sm.bSearch.Search}
         * @private
         */
        this.search_ = null;


        /**
         * Instance button
         * @type {cl.gButton.Button}
         * @private
         */
        this.button_ = null;


        /**
         * Instances links
         * @type {Array<sm.bSmLink.SmLink>}
         * @private
         */
        this.links_ = [];
    };
    goog.inherits(sm.bSmSearchPanel.SmSearchPanel, cl.iControl.Control);
    var SearchPanel = sm.bSmSearchPanel.SmSearchPanel;

    /**
     * Name of this element in factory
     */
    SearchPanel.NAME = sm.bSmSearchPanel.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(SearchPanel.NAME, {
        control: SearchPanel,
        view: View
    });

    /**
     * @param {Element} element
     * @override
     */
    SearchPanel.prototype.decorateInternal = function(element) {
        SearchPanel.base(this, 'decorateInternal', element);

        this.initSearch_();
        this.initButton_();
        this.initLinks_();
    };


    /**
     * @override
     */
    SearchPanel.prototype.enterDocument = function() {
        SearchPanel.base(this, 'enterDocument');

        this.initButtonListeners_();
    };


    /**
     * Initializes listeners for button
     * @private
     */
    SearchPanel.prototype.initButtonListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.button_,
            cl.gButton.Button.Event.CLICK,
            this.onButtonClick_
        );
    };


    /**
     * Button handler
     * @private
     */
    SearchPanel.prototype.onButtonClick_ = function() {
        this.search_.search();
    };


    /**
     * Search field initialization
     * @private
     */
    SearchPanel.prototype.initSearch_ = function() {
        this.search_ = new sm.bSearch.Search();
        this.addChild(this.search_);
        this.search_.decorate(this.getView().getDom().search);
    };


    /**
     * Button initialization
     * @private
     */
    SearchPanel.prototype.initButton_ = function() {
        this.button_ = this.decorateChild(
            'button',
            this.getView().getDom().button
        );
    };


    /**
     * Links initialization
     * @private
     */
    SearchPanel.prototype.initLinks_ = function() {
        this.links_ = this.decorateChildren(
            'smLink',
            this.getView().getDom().links
        );
    };
});  // goog.scope
