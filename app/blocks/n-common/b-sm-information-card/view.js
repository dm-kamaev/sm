goog.module('sm.bSmInformationCard.View');

const ControlView = goog.require('cl.iControl.View');

const CssClass = {
    ROOT: 'b-sm-information-card'
};

/**
 * View
 */
class View extends ControlView {
    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    constructor(opt_params, opt_type, opt_modifier) {
        super(opt_params, opt_type, opt_modifier);

        /**
         * Collection of DOM elements
         * @type {Object}
         */
        this.dom = {};
    }

    /**
     * @param {Object} rawParams
     * @return {Object}
     */
    static getRenderParams(rawParams) {
        return rawParams;
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    decorateInternal(element) {
        super.decorateInternal(element);

        this.initDom_();
    }

    /**
     * Init DOM
     * @private
     */
    initDom_() {
        this.dom = {
            link: this.getElementByClass(sm.bSmLink.View.CssClass.ROOT),
            buttonLink:
                this.getElementByClass(sm.bSmButtonLink.View.CssClass.ROOT)
        };
    }
};


/**
 * @constructor
 */
exports = View;

/**
 * @enum {string}
 */
exports.CssClass = CssClass;
