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
     * @type {sm.bSmBadge.View.DataParams}
     * @protected
     */
    this.params = null;


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
        ITEM_LINK: 'b-sm-badge__item-link',
        HINT: 'b-sm-badge__hint',
        LINK_HINT: 'b-sm-badge__link-hint'
    };


    /**
     * @typedef {{
     *     entityType: string
     * }}
     */
    sm.bSmBadge.View.DataParams;


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
        this.initParams_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        if (this.isActive_) {
            this.initHintControlListeners_();
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
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            items: this.getElementsByClass(
                View.CssClass.ITEM_LINK
            ),
            hint: this.getElementByClass(
                View.CssClass.HINT
            ),
            linkHint: this.getElementByClass(
                View.CssClass.LINK_HINT
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


    /**
     * Init data params from element
     * @private
     */
    View.prototype.initParams_ = function() {
        this.params = this.transformDataParams_(
            this.getParams()
        );
    };


    /**
     * Transform data params to compressed ones
     * @param {Object<string, (string|number)>} rawParams
     * @return {sm.bSmBadge.View.DataParams}
     * @private
     */
    View.prototype.transformDataParams_ = function(rawParams) {
        return {
            entityType: rawParams['entityType']
        };
    };
});  // goog.scope
