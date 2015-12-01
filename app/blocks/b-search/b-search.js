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
        LIST_HIDE: 'b-search__list_hidden',
        SUGGEST: 'g-suggest'
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

        // goog.events.listen(
        //     goog.dom.getElementByClass(Search.CssClass.INPUT),
        //     goog.events.EventType.KEYPRESS,
        //     function() { console.log('pressed'); },
        //     false,
        //     this
        // );
        //
        // goog.events.listen(
        //     goog.dom.getElementByClass(Search.CssClass.INPUT),
        //     goog.events.EventType.FOCUS,
        //     this.showList_,
        //     false,
        //     this
        // );
        //
        // goog.events.listen(
        //     goog.dom.getElementByClass(Search.CssClass.INPUT),
        //     goog.events.EventType.BLUR,
        //     this.hideList_,
        //     false,
        //     this
        // );

        var ui = gorod.iUIInstanceStorage.UIInstanceStorage.getInstance();
        var suggest = goog.dom.getElementByClass(gorod.gSuggest.Suggest.Css.ROOT);
        var suggestInstance = ui.getInstanceByElement(suggest);
        suggestInstance.setCallback('getData', function(elem) {
            return JSON.parse(elem);
        });
    };

    /**
     * Clean up the Component.
     */
    Search.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        // goog.events.unlisten(
        //     goog.dom.getElementByClass(Search.CssClass.INPUT),
        //     goog.events.EventType.KEYPRESS,
        //     function() {
        //         console.log('pressed');
        //         this.search_;
        //     }
        // );
        //
        // goog.events.unlisten(
        //     goog.dom.getElementByClass(Search.CssClass.INPUT),
        //     goog.events.EventType.FOCUS,
        //     this.showList_,
        //     false,
        //     this
        // );
        //
        // goog.events.unlisten(
        //     goog.dom.getElementByClass(Search.CssClass.INPUT),
        //     goog.events.EventType.BLUR,
        //     this.hideList_,
        //     false,
        //     this
        // );
    };

    /**
     * Show list
     * @private
     */
    Search.prototype.showList_ = function() {
        var list = goog.dom.getElementByClass(Search.CssClass.LIST);
        goog.dom.classes.remove(list, Search.CssClass.LIST_HIDE);
    };

    /**
     * Hide list
     * @private
     */
    Search.prototype.hideList_ = function() {
        var list = goog.dom.getElementByClass(Search.CssClass.LIST);
        goog.dom.classes.add(list, Search.CssClass.LIST_HIDE);
    };

    /**
     * Search function
     * @private
     */
     Search.prototype.search_ = function() {
        var list = goog.dom.getElementByClass(Search.CssClass.LIST);

     }
});
