goog.provide('sm.bSearchPanelUniversity.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Search Panel View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSearchPanelUniversity.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSearchPanelUniversity.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSearchPanelUniversity.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSearchPanelUniversity.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-search-panel-university',
        SEARCH_CITY: 'b-search-panel-university__search-city',
        PAY_TYPE: 'b-search-panel-university__pay-type',
        SEARCH_EGE: 'b-search-panel-university__search-ege',
        BUTTON: 'b-search-panel-university__button'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom = {
            button: this.getElementByClass(
                View.CssClass.BUTTON
            ),
            searchCity: this.getElementByClass(
                View.CssClass.SEARCH_CITY
            ),
            payType: this.getElementByClass(
                View.CssClass.PAY_TYPE
            ),
            searchEge: this.getElementByClass(
                View.CssClass.SEARCH_EGE
            )
        };
    };


    /**
     * Return data-params from dom element
     * @return {Object}
     * @protected
     * @override
     */
    View.prototype.getParams = function() {
        var dataParams = View.base(this, 'getParams');
        return this.transformParams(dataParams);
    };

    /**
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            urlRedirect: rawParams['urlRedirect']
        };
    };
});  // goog.scope
