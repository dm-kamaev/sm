goog.provide('sm.bSmItem.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');



/**
 * Item View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmItem.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItem.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSmItem.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmItem.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-item'
    };


    /**
     * @typedef {{
     *     data: {
     *         id: ?number,
     *         type: string,
     *         name: {
     *             light: string,
     *             bold: ?string
     *         },
     *         alias: ?string,
     *         score: ?sm.bSmScore.Template.Params.Data,
     *         description: (string|undefined),
     *         metro: ?Array<{
     *             id: number,
     *             name: string
     *         }>,
     *         area: ?Array<{
     *             id: number,
     *             name: string
     *         }>
     *     }
     * }}
     */
    View.RenderParams;


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initParams_();
    };


    /**
     * Initializes params from attributes data-params
     * @private
     */
    View.prototype.initParams_ = function() {
        this.params = JSON.parse(
            goog.dom.dataset.get(
                this.getElement(),
                'params'
            )
        );
    };
});  // goog.scope
