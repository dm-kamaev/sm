goog.provide('sm.bSmButtonLink.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.View');



/**
 * SummaryBoard View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmButtonLink.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmButtonLink.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     * }
     */
    this.dom = {};
};
goog.inherits(sm.bSmButtonLink.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmButtonLink.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-button-link'
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object} rawParams
     * @return {sm.bSmButtonLink.Params}
     * @override
     * @public
     */
    View.getRenderParams = function(rawParams) {
        var data = rawParams['data'],
            config = rawParams['config'];

        return {
            data: data ? {
                id: data['id'],
                url: data['url'],
                icon: data['icon'],
                iconType: data['iconType'],
                content: data['content']
            } : null,
            config: config ? {
                disableHover: config['disableHover'],
                size: config['size'],
                theme: config['theme'],
                borderRoundSize: config['borderRoundSize']
            } : null
        };
    };

});  // goog.scope
