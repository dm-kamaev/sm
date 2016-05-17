goog.provide('sm.lSchool.bFoldList.FoldList');

goog.require('cl.iControl.Control');

goog.require('sm.lSchool.bFoldList.View');



/**
 * Fold List
 * @param {Object=} opt_view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSchool.bFoldList.FoldList = function(opt_view, opt_params, opt_domHelper) {
    goog.base(this, opt_view, opt_params, opt_domHelper);


    /**
     * fold lists
     * @type {sm.lSchool.bFoldList.FoldList}
     * @private
     */
    this.foldLists_ = [];
};
goog.inherits(sm.lSchool.bFoldList.FoldList, cl.iControl.Control);


goog.scope(function() {
    var FoldList = sm.lSchool.bFoldList.FoldList,
        View = sm.lSchool.bFoldList.View;


    /**
     * @param {Element} element
     * @override
     */
    FoldList.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initFoldLists_();
    };


    /**
     * @override
     */
    FoldList.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.FOLD,
            this.onFold_
        );

        this.viewListen(
            View.Event.UNFOLD,
            this.onUnfold_
        );
    };


    /**
     * fold list and its child lists
     */
    FoldList.prototype.fold = function() {
        this.getView().fold();

        this.foldLists_.forEach(function(list) {
            list.fold();
        });
    };


    /**
     * unfold list
     */
    FoldList.prototype.unfold = function() {
        this.getView().unfold();
    };


    /**
     * fold handler
     * @private
     */
    FoldList.prototype.onFold_ = function() {
        this.fold();
    };


    /**
     * unfold handler
     * @private
     */
    FoldList.prototype.onUnfold_ = function() {
        this.unfold();
    };


    /**
     * folded lists initialization
     * @private
     */
    FoldList.prototype.initFoldLists_ = function() {
        var elements = this.getView().getChildrenLists();

        this.foldLists_ = elements.map(function(elem) {
            return this.decorateChild('fold-list', elem);
        }, this);
    };
});  // goog.scope
