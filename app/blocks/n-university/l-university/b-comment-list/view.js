goog.provide('sm.lUniversity.bCommentList.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventType');



/**
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lUniversity.bCommentList.View = function(
    opt_params, opt_type, opt_modifier
) {
    sm.lUniversity.bCommentList.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     *     showCommentsButton: Element,
     *     leaveCommentButton: Element,
     *     itemList: Element
     * }
     */
    this.dom = {};
};
goog.inherits(sm.lUniversity.bCommentList.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.lUniversity.bCommentList.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-comment-list',
        SHOW_COMMENTS_BUTTON: 'b-comment-list__show-comments-button',
        SHOW_COMMENTS_BUTTON_WRAP: 'b-comment-list__show-comments-button-wrap',
        LEAVE_COMMENT_BUTTON: 'b-comment-list__leave-comment-button',
        ITEM_LIST: 'b-comment-list__item-list'
    };


    /**
     * Event enum
     * @enum {string}
     * @const
     */
    View.Event = {
        SHOW_BUTTON_CLICK: goog.events.getUniqueId('show-button-click')
    };


    /**
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
        this.initParams_();
    };


    /**
     * @override
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initButtonListeners_();
    };


    /**
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom = {
            showCommentsButton: this.getElementByClass(
                View.CssClass.SHOW_COMMENTS_BUTTON
            ),
            showCommentsButtonWrap: this.getElementByClass(
                View.CssClass.SHOW_COMMENTS_BUTTON_WRAP
            ),
            leaveCommentButton: this.getElementByClass(
                View.CssClass.LEAVE_COMMENT_BUTTON
            ),
            itemList: this.getElementByClass(
                View.CssClass.ITEM_LIST
            )
        };
    };


    /**
     * Init buttons listeners
     * @private
     */
    View.prototype.initButtonListeners_ = function() {
        this.getHandler().listen(
            this.dom.showCommentsButton,
            goog.events.EventType.CLICK,
            this.onShowCommentButtonClick_
        );
    };


    /**
     * Click show button handler
     * @private
     */
    View.prototype.onShowCommentButtonClick_ = function() {
        this.dispatchEvent(View.Event.SHOW_BUTTON_CLICK);
        this.hideShowCommentsButton_();
    };


    /**
     * Hide show comments button
     * @private
     */
    View.prototype.hideShowCommentsButton_ = function() {
        goog.dom.classlist.add(
            this.dom.showCommentsButtonWrap,
            cl.iUtils.Utils.CssClass.HIDDEN
        );
    };


    /**
     * Initializes params from attributes data-params
     * @private
     */
    View.prototype.initParams_ = function() {
        var rawParams = this.getRawDataParams_();

        this.params = this.transformParams_(rawParams);
    };


    /**
     * Return raw data params from dom element
     * @return {Object}
     * @private
     */
    View.prototype.getRawDataParams_ = function() {
        return JSON.parse(
            goog.dom.dataset.get(
                this.getElement(),
                'params'
            )
        );
    };


    /**
     * Transform raw params object to compiled one
     * Item config stay in uncompressed state as in view we dont know
     * about transformation function for it
     * @param  {Object} rawParams
     * @return {sm.bSmItemList.View.Params}
     * @private
     */
    View.prototype.transformParams_ = function(rawParams) {
        return {
            countShownItems: rawParams['countShownItems']
        };
    };
});  // goog.scope
