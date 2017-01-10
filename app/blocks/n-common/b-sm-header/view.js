goog.provide('sm.bSmHeader.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.View');


goog.scope(function() {



    /**
     * View for Header block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmHeader.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmHeader.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );

        /**
         * Collection of dom objects
         * @type {{
         *   links: {Array<Element>}
         * }}
         */
        this.dom = {};
    };
    goog.inherits(sm.bSmHeader.View, cl.iControl.View);
    var View = sm.bSmHeader.View;


    /**
     * List of CSS classes
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-header',
        HEADER_LINKS: 'b-sm-header__menu-link'
    };

    /**
     * @return {Array<Element>}
     * @public
     */
    View.prototype.getLinks = function() {
        return this.dom.links;
    };


    /**
     * @override
     * @public
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
    };

    /**
     * Dom initialization
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom.links = this.getElementsByClass(
            View.CssClass.HEADER_LINKS
        );
    };
});  // goog.scope
