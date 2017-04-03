goog.module('sm.bSmInformationCard.SmInformationCard');

const Control = goog.require('cl.iControl.Control');
const View = goog.require('sm.bSmInformationCard.View');
const Factory = goog.require('sm.iCloblFactory.FactoryStendhal');
const Template = goog.require('sm.bSmInformationCard.Template');
const className = Template.NAME();
const EventType = goog.require('goog.events.EventType');


class InformationCard extends Control {
    /**
     * @param {cl.gButton.View} view
     * @param {Object=} opt_params
     * @param {Object=} opt_domHelper
     */
    constructor(view, opt_params, opt_domHelper) {
        super(view, opt_params, opt_domHelper);
    }

    /**
     * @param {Element} element
     * @protected
     * @override
     */
    decorateInternal(element) {
        super.decorateInternal(element);
        console.log('decorate internal');
    }
};

Factory.getInstance().register(className, {
    control: InformationCard,
    view: View
});

/** @constructor */
exports = InformationCard;

/** @type {string} */
exports.NAME = Template.NAME();

/** @enum {string} */
exports.Event = {
    CLICK: EventType.CLICK
};

/**
 * Transform raw params to compressed ones
 * @param {Object<string, (string|number|Object)>} rawParams
 * @return {sm.bSmInformationCard.SmInformationCard.RenderParams}
 */
exports.getRenderParams = function(rawParams) {
    return View.getRenderParams(rawParams);
}
