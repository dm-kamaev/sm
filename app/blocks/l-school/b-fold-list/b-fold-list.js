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
            View.Event.FOLD_BUTTON_CLICK,
            this.onFoldButtonClick_
        );
    };

    /**
     * @private
     */
    FoldList.prototype.onFoldButtonClick_ = function() {
        for (var i = 0; i < this.foldLists_.length; i++) {
            this.foldLists_[i].getView().hideActiveList();
            this.foldLists_[i].getView().showNumber();
        }
    };

    /**
     * subsidiaries folded lists initialization
     * @private
     */
    FoldList.prototype.initFoldLists_ = function() {
        var domElements = this.getView().getDom();

        if (domElements.foldLists) {
            var elements = this.getElementsThisInstance_(domElements.foldLists);

            for (var i = 0; i < elements.length; i++) {
                this.foldLists_.push(this.decorateChild(
                    'fold-list',
                    elements[i]
                ));
            }
        }
    };

    /**
     * get Elements that contain this Instance
     * @param {Array} array
     * @return {Array}
     * @private
     */
    FoldList.prototype.getElementsThisInstance_ = function(array) {
        var result = [];

        for (var i = 0; i < array.length; i++) {
            var isContains = false;

            for (var j = 0; j < array.length; j++) {
                if (j != i && goog.dom.contains(array[j], array[i])) {
                    isContains = true;
                }
            }

            if (!isContains) {
                result.push(array[i]);
            }
        }
        return result;
    };
});
