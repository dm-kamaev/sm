goog.provide('sm.lSearch.Search');

goog.require('goog.ui.Component');
goog.require('sm.bSearch.Template');
goog.require('gorod.gSuggest.Suggest');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * Search result component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearch.Search = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};

};
goog.inherits(sm.lSearch.Search, goog.ui.Component);

goog.scope(function() {
    sm.lSearch.Search.CssClass = {
        ROOT: 'l-search__body'
    };
});

/**
 * creates sm.lSearch.Search instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(
            sm.lSearch.Search.CssClass.ROOT
        );

    if (root) {
        var search = new sm.lSearch.Search();
        search.decorate(root);
    }
});
