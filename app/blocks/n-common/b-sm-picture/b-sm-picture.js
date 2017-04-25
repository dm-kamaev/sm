goog.module('sm.bSmPicture.SmPicture');

const Control = goog.require('cl.iControl.Control');
const View = goog.require('sm.bSmPicture.View');
const Factory = goog.require('sm.iCloblFactory.FactoryStendhal');
const Template = goog.require('sm.bSmPicture.Template');


/**
 * Picture tag
 */
class Picture extends Control {
    /**
     * @return {string}
     */
    static get NAME() {
        return Template.NAME();
    }

    /**
     * Transform raw params to compressed ones
     * @param {Object} rawParams
     * @return {sm.bSmPicture.Params}
     */
    static getRenderParams(rawParams) {
        return View.getRenderParams(rawParams);
    };
};


Factory.getInstance().register(Picture.NAME, {
    control: Picture,
    view: View
});


/**
 * @constructor
 */
exports = Picture;
