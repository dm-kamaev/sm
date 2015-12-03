goog.provide('sm.bSearch.Search');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('sm.bSearch.Template');
goog.require('gorod.gSuggest.Suggest');

/**
 * Input suggest component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bSearch.Search = function(opt_params) {
    goog.base(this);

    /**
     * @private
     * @type {object}
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.bSearch.Search, goog.ui.Component);

goog.scope(function() {
    var Search = sm.bSearch.Search;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Search.CssClass = {
        ROOT: 'b-search',
        INPUT: 'b-search__input',
        LIST: 'b-search__list',
        LIST_HIDE: 'b-search__list_hidden'
    };

    /**
     * Get input value
     * @return {string} Input value
     * @private
     */
    Search.prototype.getValue_ = function() {
        return goog.dom.getElementByClass(Search.CssClass.INPUT).value;
    };

    /**
     * Set up the Component.
     */
    Search.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var ui = gorod.iUIInstanceStorage.UIInstanceStorage.getInstance();
        var suggest = goog.dom.getElementByClass(gorod.gSuggest.Suggest.Css.ROOT);
        var suggestInstance = ui.getInstanceByElement(suggest);

        suggestInstance.addEventListener(
            gorod.gSuggest.Suggest.Events.SELECT,
            this.redirect_
        );

        suggestInstance.setCallback('getData', function(elem) {
            return JSON.parse(elem);
        });
    };

    /**
     * Clean up the Component.
     */
    Search.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');
    };

    /**
     *
     */
    Search.prototype.redirect_ = function(event, data) {
        document.location.href = '/school/' + data.key;
    }
});
