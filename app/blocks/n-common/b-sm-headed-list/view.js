goog.provide('sm.bSmHeadedList.View');

goog.require('cl.iControl.View');


goog.scope(function() {



    /**
     * View for Headed list block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmHeadedList.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmHeadedList.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );

        /**
         * Collection of dom objects
         * @type {{
         *     itemList: Element
         * }}
         */
        this.dom = {};
    };
    goog.inherits(sm.bSmHeadedList.View, cl.iControl.View);
    var View = sm.bSmHeadedList.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-headed-list',
        ITEM_LIST: 'b-sm-headed-list__item-list'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * Init DOM
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            itemList: this.getElementByClass(
                View.CssClass.ITEM_LIST
            )
        };
    };
});  // goog.scope
