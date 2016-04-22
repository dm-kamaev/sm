goog.provide('sm.lSchool.bFoldList.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');

/**
 * Fold List View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSchool.bFoldList.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.lSchool.bFoldList.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.lSchool.bFoldList.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-fold-list',
        UNFOLD_BUTTON: 'b-fold-list__item_button-unfold',
        FOLD_BUTTON: 'b-fold-list__item_button-fold',
        NUMBER: 'b-fold-list__number',
        OTHER_LIST: 'b-fold-list__list_other',
        LINK_LIST: 'b-fold-list__link',
        ACTIVE_LIST: 'b-fold-list__list_active',
        HIDDEN: 'i-utils__hidden'
    };

    /**
     * Event enum
     * @enum {String}
     */
    View.Event = {
       FOLD_BUTTON_CLICK: 'fold-button-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_(element);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        if (this.dom.linkList) {
            this.getHandler().listen(
                this.dom.linkList,
                goog.events.EventType.CLICK,
                this.onLinkListClick_
            );
        }

        if (this.dom.unfoldButton) {
            this.getHandler().listen(
                this.dom.unfoldButton,
                goog.events.EventType.CLICK,
                this.onUnfoldButtonClick_
            );
        }

        if (this.dom.foldButton) {
            this.getHandler().listen(
                this.dom.foldButton,
                goog.events.EventType.CLICK,
                this.onFoldButtonClick_
            );
        }
    };

    /**
     * closes all open lists
     */
    View.prototype.hideActiveList = function() {
        if (this.dom.activeList) {
            var isContains = goog.dom.classlist.contains(
                this.dom.activeList,
                View.CssClass.HIDDEN
            );

            if (!isContains) {
                goog.dom.classlist.add(
                    this.dom.activeList,
                    View.CssClass.HIDDEN
                );
            }
        }
    };

    /**
     * It shows the number of items of all links
     */
    View.prototype.showNumber = function() {
        if (this.dom.number) {
            var isContains = goog.dom.classlist.contains(
                this.dom.number,
                View.CssClass.HIDDEN
            );

            if (isContains) {
                goog.dom.classlist.remove(
                    this.dom.number,
                    View.CssClass.HIDDEN
                );
            }
        }
    };

    /**
     * @private
     */
    View.prototype.onLinkListClick_ = function() {
        this.hideShowNumber_();
        this.hideShowActiveList_();
    };

    /**
     * @private
     */
    View.prototype.onUnfoldButtonClick_ = function() {
        this.hideShowOtherList_();
        this.hideShowUnfoldButton_();
        this.hideShowFoldButton_();
    };

    /**
     * @private
     */
    View.prototype.onFoldButtonClick_ = function() {
        this.hideShowOtherList_();
        this.hideShowFoldButton_();
        this.hideShowUnfoldButton_();

        this.dispatchEvent({
            'type': View.Event.FOLD_BUTTON_CLICK
        });
    };

    /**
     * @private
     */
    View.prototype.hideShowActiveList_ = function() {
        goog.dom.classlist.toggle(
            this.dom.activeList,
            View.CssClass.HIDDEN
        );
    };

    /**
     * @private
     */
    View.prototype.hideShowUnfoldButton_ = function() {
        goog.dom.classlist.toggle(
            this.dom.unfoldButton,
            View.CssClass.HIDDEN
        );
    };

    /**
     * @private
     */
    View.prototype.hideShowFoldButton_ = function() {
        goog.dom.classlist.toggle(
            this.dom.foldButton,
            View.CssClass.HIDDEN
        );
    };

    /**
     * @private
     */
    View.prototype.hideShowOtherList_ = function() {
        goog.dom.classlist.toggle(
            this.dom.otherList,
            View.CssClass.HIDDEN
        );
    };

    /**
     * @private
     */
    View.prototype.hideShowNumber_ = function() {
        goog.dom.classlist.toggle(
            this.dom.number,
            View.CssClass.HIDDEN
        );
    };

    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            foldLists: this.getElementsByClass(
                View.CssClass.ROOT
            ),
            unfoldButton: this.getDomElement_(
                View.CssClass.UNFOLD_BUTTON
            ),
            foldButton: this.getDomElement_(
                View.CssClass.FOLD_BUTTON
            ),
            number: this.getDomElement_(
                View.CssClass.NUMBER
            ),
            otherList: this.getDomElement_(
                View.CssClass.OTHER_LIST
            ),
            linkList: this.getDomElement_(
                View.CssClass.LINK_LIST
            ),
            activeList: this.getDomElement_(
                View.CssClass.ACTIVE_LIST
            )
        };
    };

    /**
     * get Dom element of this Instance
     * @param {string} elemClass
     * @return {Element}
     * @private
     */
    View.prototype.getDomElement_ = function(elemClass) {
        var result = '';

        var elements = this.getElementsByClass(
            elemClass,
            this.getElement()
        );

        for (var i = 0; i < elements.length; i++) {
            var parent = goog.dom.getAncestorByClass(
                elements[i],
                View.CssClass.ROOT
            );

            if (parent === this.getElement()) {
                result = elements[i];
            }
        }
        return result;
    };
});
