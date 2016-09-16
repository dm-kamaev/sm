goog.provide('sm.bSmBadge.View');

goog.require('cl.iControl.View');
goog.require('goog.array');
goog.require('goog.dom.classlist');



/**
 * Badge View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmBadge.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmBadge.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);

    /**
     * It defines active badge or not
     * @type {boolean}
     * @private
     */
    this.isActive_ = false;


    /**
     * hide or show hint
     * @type {boolean}
     * @private
     */
    this.isHintVisible_ = false;
};
goog.inherits(sm.bSmBadge.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSmBadge.View;


     /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-badge',
        ACTIVE_STATE: 'b-sm-badge_active',
        ITEM: 'b-sm-badge__item',
        HINT: 'b-sm-badge__hint',
        HINT_LINK: 'b-sm-badge__hint-link'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        ITEM_CLICK: 'item-click',
        HINT_LINK_CLICK: 'hint-link-click'
    };


    /**
     * @typedef {{
     *     data: Array<{
     *         id: number,
     *         name: string
     *     }>
     * }}
     */
    sm.bSmBadge.View.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Array<Object<string, (number|string)>>} rawParams
     * @return {sm.bSmBadge.View.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        return {
            data: goog.array.map(rawParams, function(item) {
                return {
                    id: item['id'],
                    name: item['name']
                };
            })
        };
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initState_();
        this.initDom_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        if (this.isActive_) {
            this.initItemsListeners_();
            this.initHintControlListeners_();
        }
    };


    /**
     * Initializes listeners for items
     * @private
     */
    View.prototype.initItemsListeners_ = function() {
        for (var i = 0; i < this.dom.items.length; i++) {
            this.getHandler().listen(
                this.dom.items[i],
                goog.events.EventType.CLICK,
                this.onItemClick_.bind(this)
            );
        }
    };


    /**
     * Initializes listeners for hint
     * @private
     */
    View.prototype.initHintControlListeners_ = function() {
        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onRootElementClick_
        );

        this.getHandler().listen(
            document,
            goog.events.EventType.CLICK,
            this.onDocumentClick_
        );

        if (this.dom.hintLink) {
            this.getHandler().listen(
                this.dom.hintLink,
                goog.events.EventType.CLICK,
                this.onHintLinkClick_
            );
        }
    };


    /**
     * On hint link click
     * @private
     */
    View.prototype.onHintLinkClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.HINT_LINK_CLICK
        });
    };


    /**
     * If click was not in Element and hint is visible, then hide the hint
     * @param  {Object} event
     * @private
     */
    View.prototype.onDocumentClick_ = function(event) {
        var isContaints = goog.dom.contains(
            this.getElement(),
            event.target
        );

        if (this.isHintVisible_ && !isContaints) {
            this.setHintVisibility_(false);
        }
    };


    /**
     * On Element click
     * @private
     */
    View.prototype.onRootElementClick_ = function() {
        if (this.dom.hint) {
            this.isHintVisible_ ?
                this.setHintVisibility_(false) :
                this.setHintVisibility_(true);
        }
    };


    /**
     * On item click
     * @param {Object} event
     * @private
     */
    View.prototype.onItemClick_ = function(event) {
        var data = this.getSearchParams_(event.target);

        this.dispatchEvent({
            'type': View.Event.ITEM_CLICK,
            'data': data
        });
    };


    /**
     * Adds or deletes class to show hint
     * @param {bool} visible
     * @private
     */
    View.prototype.setHintVisibility_ = function(visible) {
        visible ?
            goog.dom.classlist.add(
                this.dom.hint,
                cl.gHint.View.CssClass.INCLUDE_CLICK_MODE
            ) :
            goog.dom.classlist.remove(
                this.dom.hint,
                cl.gHint.View.CssClass.INCLUDE_CLICK_MODE
            );

        this.isHintVisible_ = visible;
    };


    /**
     * Get search params
     * @param {Element} item
     * @return {{
     *     id: number,
     *     name: string
     * }}
     * @private
     */
    View.prototype.getSearchParams_ = function(item) {
        var params = this.getDataParams_(item),
            data = {};

        if (params.id) {
            data[params.type + 'Id'] = params.id;
            data.name = params.name;
        } else {
            data = null;
        }
        return data;
    };


    /**
     * Get data-params
     * @param {Element} element
     * @return {{
     *     id: number,
     *     name: string,
     *     type: string
     * }}
     * @private
     */
    View.prototype.getDataParams_ = function(element) {
        return JSON.parse(
            goog.dom.dataset.get(
                element,
                'params'
            )
        );
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            items: this.getElementsByClass(
                View.CssClass.ITEM
            ),
            hint: this.getElementByClass(
                View.CssClass.HINT
            ),
            hintLink: this.getElementByClass(
                View.CssClass.HINT_LINK
            )
        };
    };


    /**
     * It defines active badge or not
     * @private
     */
    View.prototype.initState_ = function() {
        this.isActive_ = goog.dom.classlist.contains(
            this.getElement(),
            View.CssClass.ACTIVE_STATE
        );
    };
});  // goog.scope
