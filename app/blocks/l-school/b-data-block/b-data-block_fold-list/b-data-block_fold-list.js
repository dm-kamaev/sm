goog.provide('sm.lSchool.bDataBlock.DataBlockFoldList');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.ui.Component');

/**
 * Fold list component
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bDataBlock.DataBlockFoldList = function() {
    goog.base(this);

    /**
     * list of dom elements which can be clicked
     * @private
     */
    this.listControls_;

};
goog.inherits(sm.lSchool.bDataBlock.DataBlockFoldList, goog.ui.Component);


goog.scope(function() {
    var FoldList = sm.lSchool.bDataBlock.DataBlockFoldList;

    /**
     * CSS-class enum
     * @enum {string}
     */
    FoldList.CssClass = {
        ROOT: 'b-data-block_fold-list',
        CONTROL: 'b-data-block__item-content',
        OPENED: 'b-data-block__item-content_opened',
        HIDDEN: 'i-utils__hidden',
        LIST: 'b-data-block__list',
        NUMBER: 'b-data-block__number'
    };

    /**
     * Internal decorates the DOM element
     * @param {node} element
     */
    FoldList.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.listControls_ = goog.dom.getElementsByClass(
            FoldList.CssClass.CONTROL,
            element
        );
    };

    /**
     * Sets up the Component.
     */
    FoldList.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        for (var i = 0, l = this.listControls_.length, listControl; i < l; i++)
        {
            listControl = this.listControls_[i];
            this.getHandler().listen(
                listControl,
                goog.events.EventType.CLICK,
                this.controlClickHandler_
            );
        }
    };

    /**
     *  Click on list control handler
     * @param {Object} event
     * @private
     */
    FoldList.prototype.controlClickHandler_ = function(event) {
        this.toggleList_(event.target);
    };

    /**
     * @param {node} clickTarget
     * @private
     */
    FoldList.prototype.toggleList_ = function(clickTarget) {
        var dataItem = goog.dom.getParentElement(clickTarget);
        var list = goog.dom.getElementByClass(
                FoldList.CssClass.LIST,
                dataItem
            );
        var number = goog.dom.getElementByClass(
            FoldList.CssClass.NUMBER,
            dataItem
        );

        goog.dom.classes.toggle(
            clickTarget,
            FoldList.CssClass.OPENED
        );
        goog.dom.classes.toggle(
            list,
            FoldList.CssClass.HIDDEN
        );
        goog.dom.classes.toggle(
            number,
            FoldList.CssClass.HIDDEN
        );

    };
});
