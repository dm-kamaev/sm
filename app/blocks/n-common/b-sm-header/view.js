goog.provide('sm.bSmHeader.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.View');
goog.require('sm.gModal.ModalSideMenuView');


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
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-header',
        HEADER_LINKS: 'b-sm-header__menu-link'
    };


    /**
     * @override
     * @param {Element} element
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

        this.dom.sideMenu = this.getElementByClass(
            sm.gModal.ModalSideMenuView.CssClass.ROOT
        );
    };

    /**
     * @return {Array<Element>}
     */
    View.prototype.getLinks = function() {
        return this.dom.links;
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };
});  // goog.scope
