goog.provide('sm.bSmItem.ViewUniversity');

goog.require('sm.bSmItem.View');
goog.require('sm.bSmButtonLink.View');



/**
 * Item View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmItem.ViewUniversity = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItem.ViewUniversity.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSmItem.ViewUniversity, sm.bSmItem.View);


goog.scope(function() {
    var View = sm.bSmItem.ViewUniversity;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-item_university',
        STARS: 'b-sm-item__stars'
    };


    /**
     * Initializes dom elements
     * @protected
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');
        this.dom.stars = this.getElementByClass(View.CssClass.STARS);
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object} rawParams
     * @return {sm.bSmItemUniversity.Params}
     * @override
     * @public
     */
    View.getRenderParams = function(rawParams) {
        var params = sm.bSmItem.View.getRenderParams(rawParams);

        var buttonLink = rawParams['buttonLink'] ?
            sm.bSmButtonLink.View.getRenderParams(rawParams['buttonLink']) :
            null;

        var nicety = rawParams['nicety'];
        if (nicety) {
            nicety = nicety.map((item) => {
                var title = item['title'];

                return {
                    title: title ? {
                        textDefault: title['textDefault'],
                        textXs: title['textXs'],
                        selected: title['selected'],
                        tooltip: title['tooltip'],
                    } : null,
                    value: item['value']
                };
            });
        }

        var iconLink = rawParams['iconLink'];

        if (iconLink) {
            iconLink = {
                icon: iconLink['icon'],
                link: iconLink['link'],
                type: iconLink['type']
            };
        }

        goog.object.extend(params.data, {
            buttonLink: buttonLink,
            company: rawParams['company'] ? {
                abbreviation: rawParams['company']['abbreviation'],
                city: rawParams['company']['city'],
                name: rawParams['company']['name']
            } : null,
            nicety: nicety,
            iconLink: iconLink
        });

        return params;
    };

});  // goog.scope
