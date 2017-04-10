/**
 * @fileoverview View for university search page
 */
goog.module('sm.lSearch.ViewUniversity');

var View = goog.require('sm.lSearch.View');


/**
 * University Search View
 * @class ViewUniversity
 * @extends {View}
 */
class ViewUniversity extends View {



    /**
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     */
    constructor(opt_params, opt_type, opt_modifier) {
        super(opt_params, opt_type, opt_modifier);


        /**
         * @type {sm.lSearch.View.Params}
         * @protected
         */
        this.params = null;
    }

    /**
     * Css class enum
     * @enum {string}
     */
    static get CssClass() {
        return {
            ROOT: 'l-search_university'
        };
    };
}

exports = ViewUniversity;
