/**
 * @fileoverview View for map
 */
goog.provide('sm.bSmMap.View');

goog.require('cl.iControl.View');
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
     * A config object with DOM class names
     * @enum {string}
     */
    View.CssClass = {
        ITEM_NAME: 'b-map__href',
        BALLOON: 'b-map__balloon',
        CLOSE_BALLOON: 'b-map__balloon-close',
        ROOT: 'b-map'
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
        var rawParams = this.getRawDataParams_();

        this.params_ = rawParams;

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


    /**
     * Generate balooon html content for ?map? init
     * @return {string}
     */
    View.prototype.generateBalloonHtmlContent = function() {
        return sm.bSmMap.Template.balloon();
    };
});  // goog.scope
