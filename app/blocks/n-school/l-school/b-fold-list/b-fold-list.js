goog.provide('sm.lSchool.bFoldList.FoldList');

goog.require('cl.iControl.Control');

goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSchool.bFoldList.Template');
goog.require('sm.lSchool.bFoldList.View');



/**
 * Fold List
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSchool.bFoldList.FoldList = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);


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
     * Name of this element in factory
     */
    FoldList.NAME = sm.lSchool.bFoldList.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(FoldList.NAME, {
        control: FoldList,
        view: View
    });

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
            return this.decorateChild(sm.lSchool.bFoldList.FoldList.NAME, elem);
        }, this);
    };
});  // goog.scope
