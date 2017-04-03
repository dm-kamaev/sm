goog.module('sm.bSmInformationCard.View');

const ControlView = goog.require('cl.iControl.View');

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
    }
};

/** @constructor */
exports = View;

/**
 * Transform raw params to compressed ones
 * @param {Object<string, (string|number|Object)>} rawParams
 * @return {sm.bSmInformationCard.SmInformationCard.RenderParams}
 */
exports.getRenderParams = function(rawParams) {
    return {};
}
