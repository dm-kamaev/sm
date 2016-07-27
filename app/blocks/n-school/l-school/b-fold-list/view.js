goog.provide('sm.lSchool.bFoldList.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');



/**
 * Fold List View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSchool.bFoldList.View = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);

    /**
     * List type
     * @type {string}
     * @private
     */
    this.type_ = null;

    /**
     * folded or unfolded list
     * @type {boolean}
     * @private
     */
    this.isFolded_ = null;
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
        TYPE_FOLDED: 'b-fold-list_folded',
        TYPE_UNFOLDED: 'b-fold-list_unfolded',
        UNFOLD_BUTTON: 'b-fold-list__button_unfold',
        FOLD_BUTTON: 'b-fold-list__button_fold',
        NUMBER: 'b-fold-list__number',
        HIDDEN_LIST: 'b-fold-list__list_hidden',
        LINK_LIST: 'b-fold-list__link',
        HIDDEN: 'i-utils__hidden'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        FOLD: 'fold',
        UNFOLD: 'unfold'
    };


    /**
     * List type enum
     * @enum {string}
     */
    View.Type = {
        FOLDED: 'folded',
        UNFOLDED: 'unfolded'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_(element);

        this.type_ = this.getType_();

        this.isFolded_ = true;
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
     * fold list and change its type
     */
    View.prototype.fold = function() {
        this.isFolded_ = true;
        this.setHiddenListVisibility_(false);

        if (this.type_ == View.Type.FOLDED) {
            this.setNumberVisibility_(true);
        }
        else {
            this.setFoldButtonVisibility_(false);
            this.setUnfoldButtonVisibility_(true);
        }
    };


    /**
     * unfold list and change its type
     */
    View.prototype.unfold = function() {
        this.isFolded_ = false;
        this.setHiddenListVisibility_(true);

        if (this.type_ == View.Type.FOLDED) {
            this.setNumberVisibility_(false);
        }
        else {
            this.setFoldButtonVisibility_(true);
            this.setUnfoldButtonVisibility_(false);
        }
    };


    /**
     * get Children Lists this Instance
     * @return {Array}
     */
    View.prototype.getChildrenLists = function() {
        return this.getDom().foldLists;
    };


    /**
     * check the elem contains other Elems
     * @param {Element} elem
     * @param {Array} array
     * @return {?number}
     * @private
     */
    View.prototype.isElemContainsInOtherElems_ = function(elem, array) {
        var elems = array.filter(function(arrayElem) {
            return arrayElem != elem && goog.dom.contains(arrayElem, elem);
        });

        return elems.length;
    };


    /**
     * get type for list (folded or unfolded)
     * @return {string}
     * @private
     */
    View.prototype.getType_ = function() {
        var isFolded = goog.dom.classlist.contains(
            this.getElement(),
            View.CssClass.TYPE_FOLDED
        );

        return isFolded ? View.Type.FOLDED : View.Type.UNFOLDED;
    };


    /**
     * Link list Click handler
     * @private
     */
    View.prototype.onLinkListClick_ = function() {
        var eventType = this.isFolded_ ?
            View.Event.UNFOLD :
            View.Event.FOLD;

        this.dispatchEvent({
            'type': eventType
        });
    };


    /**
     * unfold button Click handler
     * @private
     */
    View.prototype.onUnfoldButtonClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.UNFOLD
        });
    };


    /**
     * fold button Click handler
     * @private
     */
    View.prototype.onFoldButtonClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.FOLD
        });
    };


    /**
     * adds or deletes a class HIDDEN for unfoldButton
     * @param {boolean} value
     * @private
     */
    View.prototype.setUnfoldButtonVisibility_ = function(value) {
        var elem = this.dom.unfoldButton;
        value ?
            goog.dom.classlist.remove(elem, View.CssClass.HIDDEN) :
            goog.dom.classlist.add(elem, View.CssClass.HIDDEN);
    };


    /**
     * adds or deletes a class HIDDEN for foldButton
     * @param {boolean} value
     * @private
     */
    View.prototype.setFoldButtonVisibility_ = function(value) {
        var elem = this.dom.foldButton;
        value ?
            goog.dom.classlist.remove(elem, View.CssClass.HIDDEN) :
            goog.dom.classlist.add(elem, View.CssClass.HIDDEN);
    };


    /**
     * adds or deletes a class HIDDEN for hiddenList
     * @param {boolean} value
     * @private
     */
    View.prototype.setHiddenListVisibility_ = function(value) {
        var elem = this.dom.hiddenList;
        value ?
            goog.dom.classlist.remove(elem, View.CssClass.HIDDEN) :
            goog.dom.classlist.add(elem, View.CssClass.HIDDEN);
    };


    /**
     * adds or deletes a class HIDDEN for number
     * @param {boolean} value
     * @private
     */
    View.prototype.setNumberVisibility_ = function(value) {
        var elem = this.dom.number;
        value ?
            goog.dom.classlist.remove(elem, View.CssClass.HIDDEN) :
            goog.dom.classlist.add(elem, View.CssClass.HIDDEN);
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            foldLists: this.getDomElements_(
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
            hiddenList: this.getDomElement_(
                View.CssClass.HIDDEN_LIST
            ),
            linkList: this.getDomElement_(
                View.CssClass.LINK_LIST
            )
        };
    };


    /**
     * get an array of DOM elements
     * @param {string} elemClass
     * @return {Array}
     * @private
     */
    View.prototype.getDomElements_ = function(elemClass) {
        var elems = this.getElementsByClass(elemClass),
            elemsArr = Array.prototype.slice.call(elems, 0),
            lists = this.getElementsByClass(View.CssClass.ROOT),
            listsArr = Array.prototype.slice.call(lists, 0);

        return elemsArr.filter(function(elem) {
            return !this.isElemContainsInOtherElems_(elem, listsArr);
        }, this);
    };


    /**
     * get DOM element
     * @param {string} elemClass
     * @return {?Element}
     * @private
     */
    View.prototype.getDomElement_ = function(elemClass) {
        var elems = this.getDomElements_(elemClass);
        return elems[0];
    };
});  // goog.scope
