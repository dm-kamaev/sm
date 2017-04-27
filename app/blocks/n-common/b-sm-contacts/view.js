goog.provide('sm.bSmContacts.View');

goog.require('cl.iControl.View');



goog.scope(function() {



    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmContacts.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmContacts.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.bSmContacts.View, cl.iControl.View);
    var View = sm.bSmContacts.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-contacts'
    };


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            helperLink: this.getElementByClass(
                sm.bSmLink.SmLink.CssClass.ROOT
            )
        };
    };
});  // goog.scope
