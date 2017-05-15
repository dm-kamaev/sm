goog.module('sm.bSmPicture.View');

const ControlView = goog.require('cl.iControl.View');

const CssClass = {
    ROOT: 'b-sm-picture'
};

/**
 * View
 */
class View extends ControlView {

    /**
     * Transform raw params to compressed ones
     * @param {Object} rawParams
     * @return {sm.bSmPicture.Params}
     */
    static getRenderParams(rawParams) {
        return {
            altText: rawParams['altText'],
            size: rawParams['size'],
            sources: rawParams['sources'].map(sourse => ({
                url: sourse['url'],
                size: sourse['size']
            }))
        };
    };
};


/**
 * @constructor
 */
exports = View;

/**
 * @enum {string}
 */
exports.CssClass = CssClass;
