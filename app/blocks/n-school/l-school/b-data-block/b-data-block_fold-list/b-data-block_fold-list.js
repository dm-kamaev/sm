goog.provide('sm.lSchool.bDataBlock.DataBlockFoldList');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSchool.bFoldList.FoldList');



/**
 * Fold list component
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bDataBlock.DataBlockFoldList = function() {
    goog.base(this);


    /**
     * folded list
     * @type {sm.lSchool.bFoldList.FoldList}
     * @private
     */
    this.foldList_ = null;
};
goog.inherits(sm.lSchool.bDataBlock.DataBlockFoldList, goog.ui.Component);


goog.scope(function() {
    var DataBlockFoldList = sm.lSchool.bDataBlock.DataBlockFoldList,
        factory = sm.iCloblFactory.FactoryStendhal.getInstance();


    /**
     * CSS-class enum
     * @enum {string}
     */
    DataBlockFoldList.CssClass = {
        ROOT: 'b-data-block_fold-list'
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    DataBlockFoldList.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initFoldList_();
    };


    /**
     * initialization folded list
     * @return {sm.lSchool.bDataBlock.DataBlockFoldList}
     * @private
     */
    DataBlockFoldList.prototype.initFoldList_ = function() {
        this.foldList_ = factory.decorate(
            sm.lSchool.bFoldList.FoldList.NAME,
            this.getElementByClass(sm.lSchool.bFoldList.View.CssClass.ROOT),
            null,
            this
        );
        return this;
    };


    /**
     * Sets up the Component.
     */
    DataBlockFoldList.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };
});  // goog.scope
