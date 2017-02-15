goog.provide('sm.bSmCatalog.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmHeadedList.View');


goog.scope(function() {



    /**
     * View for Header block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmCatalog.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmCatalog.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );

        /**
         * Collection of dom objects
         * @type {{
         *     items: Array<Element>
         * }}
         */
        this.dom = {};
    };
    goog.inherits(sm.bSmCatalog.View, cl.iControl.View);
    var View = sm.bSmCatalog.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-catalog',
        ITEM_LIST: sm.bSmHeadedList.View.CssClass.ROOT
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
            items: this.getElementsByClass(
                View.CssClass.ITEM_LIST
            )
        };
    };
});  // goog.scope
