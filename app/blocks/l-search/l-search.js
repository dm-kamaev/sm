goog.provide('sm.lSearch.Search');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSearch.Search');

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
    var Search = sm.lSearch.Search,
        BlockSearch = sm.bSearch.Search;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Search.CssClass = {
        ROOT: 'l-search__body'
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    Search.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearch.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    Search.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var bSearch = goog.dom.getElementByClass(
            BlockSearch.CssClass.INPUT,
            element
        );

        var bSearchInstance = new BlockSearch();
        this.addChild(bSearchInstance);
        bSearchInstance.decorate(bSearch);
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
