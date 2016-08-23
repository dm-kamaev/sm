/**
 * @fileoverview View for map
 */
goog.provide('sm.bSmMap.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('sm.bSmMap.Template');

goog.scope(function() {



    /**
     * Map view
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmMap.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmMap.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.bSmMap.View, cl.iControl.View);
    var View = sm.bSmMap.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-map',
        BALLOON: 'b-map__balloon',
        ITEM_NAME: 'b-map__href',
        CLOSE_BALLOON: 'b-map__balloon-close'
    };


    /**
     * @typedef {{
     *     id: number,
     *     name: string,
     *     alias: (string|undefined),
     *     description: (string|undefined),
     *     totalScore: (number|undefined),
     *     address: Array<{
     *         id: number,
     *         lat: number,
     *         lng: number,
     *         name: string,
     *         stages: (string|Array<string>)
     *     }>,
     * }}
     */
    View.MapEntity;


    /**
     * @typedef {{
     *     center: (Array<number>|undefined),
     *     type: (sm.bSmMap.SmMap.PositionType|undefined)
     * }}
     */
    View.PositionParams;

    /**
     * @typedef {{
     *     data: {
     *         entities: Array<sm.bSmMap.View.MapEntity>
     *         position: (sm.bSmMap.View.PositionParams|undefined)
     *     },
     *     config: {
     *         enableScrollZoom: boolean
     *     }
     * }}
     */
    View.Params;


    /**
     * Generate balooon html content for ?map? init
     * @return {string}
     */
    View.prototype.generateBalloonHtmlContent = function() {
        return sm.bSmMap.Template.balloon();
    };


    /**
     * Align baloon relative to point or pin.
     * It center baloon vertically and lift it horizontally
     * @param  {Element} balloonElement
     * @public
     */
    View.prototype.setBalloonOffset = function(balloonElement) {
        var elementSize = goog.style.getSize(balloonElement);
        var leftCoordinate = - (elementSize.width / 2);
        var topCoordinate = - elementSize.height;

        goog.style.setPosition(
            balloonElement,
            leftCoordinate,
            topCoordinate
        );
    };

    /**
     * Init dom elements inside baloon
     * @param {Element} balloonParentElement
     * @return {{
     *     balloon: Element,
     *     closeButton: Element,
     *     title: Element
     * }}
     */
    View.prototype.initBalloonDomElements = function(balloonParentElement) {
        var baloonElement = goog.dom.getElementByClass(
            View.CssClass.BALLOON,
            balloonParentElement
        );
        return {
            balloon: baloonElement,
            closeButton: goog.dom.getElementByClass(
                View.CssClass.CLOSE_BALLOON,
                baloonElement
            ),
            title: goog.dom.getElementByClass(
                View.CssClass.ITEM_NAME,
                baloonElement
            )
        };
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initParams_(element);
    };


    /**
     * Parameters initialization
     * Please note, that we take raw (uncompressed) parameters as they need for
     * object manager of ymaps and there is no reason transform it
     * to compressed ones
     * @private
     */
    View.prototype.initParams_ = function() {
        this.params_ = this.getRawDataParams_();

        if (!this.params_['data']) {
            this.params_['data'] = {};
        }

        if (!this.params_['config']) {
            this.params_['config'] = {};
        }
    };

    /**
     * Get data params from element, with uncompressed fields
     * @return {sm.bSmMap.View.Params}
     * @private
     */
    View.prototype.getRawDataParams_ = function() {
        return JSON.parse(goog.dom.dataset.get(this.getElement(), 'params'));
    };
});  // goog.scope
