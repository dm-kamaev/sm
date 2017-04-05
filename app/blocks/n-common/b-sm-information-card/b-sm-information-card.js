goog.module('sm.bSmInformationCard.SmInformationCard');

const EventType = goog.require('goog.events.EventType');
const Control = goog.require('cl.iControl.Control');
const View = goog.require('sm.bSmInformationCard.View');
const Factory = goog.require('sm.iCloblFactory.FactoryStendhal');
const Template = goog.require('sm.bSmInformationCard.Template');
const Link = goog.require('sm.bSmLink.SmLink');
const ButtonLink = goog.require('sm.bSmButtonLink.SmButtonLink');


/**
 * Card with some information
 */
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
     * @param {Object} rawParams
     * @return {Object}
     */
    static getRenderParams(rawParams) {
        return View.getRenderParams(rawParams);
    }

    /**
     * @return {string}
     */
    static get NAME() {
        return Template.NAME();
    }

    /**
     * @return {Object<string>}
     */
    static get Event() {
        return {
            CLICK: EventType.CLICK
        };
    }

    /**
     * @param {Element} element
     * @protected
     * @override
     */
    decorateInternal(element) {
        super.decorateInternal(element);

        this.initLinks_();
    }

    /**
     * Init link elements
     * @private
     */
    initLinks_() {
        const dom = this.getView().getDom();

        if (dom.link) {
            this.decorateChild(
                Link.NAME,
                dom.link
            );
        }

        if (dom.buttonLink) {
            this.decorateChild(
                ButtonLink.NAME,
                dom.buttonLink
            );
        }
    }
};


Factory.getInstance().register(InformationCard.NAME, {
    control: InformationCard,
    view: View
});


exports = InformationCard;
