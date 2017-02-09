goog.provide('sm.lUniversity.University');

goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lUniversity.View');


goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lUniversity.University = function(view, opt_domHelper) {
        sm.lUniversity.University.base(
            this, 'constructor', view, opt_domHelper
        );
    };
    goog.inherits(sm.lUniversity.University, sm.iLayout.LayoutStendhal);
    var University = sm.lUniversity.University,
        View = sm.lUniversity.View;


    /**
     * @param {Element} element
     * @override
     */
    University.prototype.decorateInternal = function(element) {
        University.base(this, 'decorateInternal', element);

        this.initSketch_();
        this.initDescriptionList_();
        this.initSummaryBoard_();
        this.initCutDescription_();
    };


    /**
     * @override
     */
    University.prototype.enterDocument = function() {
        University.base(this, 'enterDocument');
    };

        /**
     * @override
     */
    University.prototype.enterDocument = function() {
        University.base(this, 'enterDocument');
    };


    /**
     * @private
     */
    University.prototype.initSketch_ = function() {
        this.decorateChild(
            'smSketch',
            this.getView().getDom().sketch
        );
    };


    /**
     * @private
     */
    University.prototype.initSummaryBoard_ = function() {
        this.decorateChild(
            'summary-board',
            this.getView().getDom().summaryBoard
        );
    };


    /**
     * @private
     */
    University.prototype.initDescriptionList_ = function() {
        this.decorateChild(
            'lUniversity-descriptionList',
            this.getView().getDom().descriptionList
        );
    };


    /**
     * Initializes instance of cut description
     * @private
     */
    University.prototype.initCutDescription_ = function() {
        this.decorateChild(
            'smCollapsedText',
            this.getView().getDom().cutDescription
        );
    };
});  // goog.scope


/**
 * creates sm.lUniversity.University instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lUniversity.View.CssClass.ROOT
    );

    var view = new sm.lUniversity.View();
    var instance = new sm.lUniversity.University(view);

    instance.decorate(domElement);
});
