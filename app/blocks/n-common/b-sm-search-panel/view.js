goog.provide('sm.bSmSearchPanel.View');

goog.require('cl.iControl.View');
goog.require('sm.bSearch.Search');



goog.scope(function() {



    /**
     * View for search panel
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
     sm.bSmSearchPanel.View = function(opt_params, opt_type, opt_modifier) {
         sm.bSmSearchPanel.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.bSmSearchPanel.View, cl.iControl.View);
    var View = sm.bSmSearchPanel.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-search-panel'
    };


    /**
     * @param {Element} element
     * @override
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
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            search: this.getElementByClass(
                sm.bSearch.Search.CssClass.ROOT
            ),
            button: this.getElementByClass(
                cl.gButton.View.CssClass.ROOT
            ),
            links: this.getElementsByClass(
                sm.bSmLink.View.CssClass.ROOT
            )
        };
    };
});  // goog.scope
