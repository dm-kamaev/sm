goog.provide('sm.gButton.ViewStendhal');

goog.require('cl.gButton.View');


goog.scope(function() {



    /**
     * Button View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.gButton.View}
     */
    sm.gButton.ViewStendhal = function(opt_params, opt_type, opt_modifier) {
        sm.gButton.ViewStendhal.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);
    };
    goog.inherits(sm.gButton.ViewStendhal, cl.gButton.View);
    var View = sm.gButton.ViewStendhal;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-button_stendhal'
    };


    /**
     * Button onclick handler
     * @override
     * @protected
     */
    View.prototype.onClick = function() {
        this.getElement().focus();

        View.base(this, 'onClick');
    };


    /**
     * Set text
     * @param {string} text
     * @public
     */
    View.prototype.setText = function(text) {
        goog.dom.setTextContent(
            this.getElement(),
            text ? text : this.getParams().defaultText
        );
    };


    /**
     * @protected
     * @override
     */
    View.prototype.initConfig = function() {
        this.initParams_();
        View.base(this, 'initConfig');
    };


    /**
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            defaultText: rawParams['defaultText']
        };
    };


    View.prototype.initParams_ = function() {
        var params = this.getParams();
        this.params = this.transformParams(params);
    };

});  // goog.scope
