goog.provide('sm.lSearch.ViewExperimental');

goog.require('sm.lSearch.View');


goog.scope(function() {



    /**
     * Search View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {sm.lSearch.View}
     */
    sm.lSearch.ViewExperimental = function(opt_params, opt_type, opt_modifier) {
        sm.lSearch.ViewExperimental.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);
    };
    goog.inherits(sm.lSearch.ViewExperimental, sm.lSearch.View);
    var View = sm.lSearch.ViewExperimental;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-search_experimental'
    };
});  // goog.scope
