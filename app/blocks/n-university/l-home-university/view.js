/**
 * @fileoverview Home page view of universities
 */
goog.module('sm.lHomeUniversity.View');

const ILayoutViewStendhal = goog.require('sm.iLayout.ViewStendhal');



/**
 * Css class enum
 * @enum {string}
 */
const CssClass = {
    ROOT: 'l-home-university'
};


/**
 * University home View
 * @class View
 * @extends {sm.iLayout.ViewStendhal}
 */
class View extends ILayoutViewStendhal {



    /**
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     */
    constructor(opt_params, opt_type, opt_modifier) {
        super(opt_params, opt_type, opt_modifier);
    }

}

exports = View;
exports.CssClass = CssClass;
