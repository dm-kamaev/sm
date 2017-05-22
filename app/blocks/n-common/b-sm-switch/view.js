goog.provide('sm.bSmSwitch.View');

goog.require('cl.iControl.View');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.json');

goog.require('sm.bSmSwitch.Event.ItemSelect');



/**
 * Dropdown View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmSwitch.View = function(opt_params, opt_template, opt_modifier) {
    sm.bSmSwitch.View.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );
};
goog.inherits(sm.bSmSwitch.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmSwitch.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-switch',
        LINK: 'b-sm-switch__link',
        SELECTED: 'b-sm-switch__link_selected',
        LINK_WRAP: 'b-sm-switch__link-wrapper'
    };

    /**
     * Select item on id
     * @param {number} id
     */
    View.prototype.selectItem = function(id) {
        this.dom.linkWraps.forEach(function(item) {
            goog.dom.classlist.remove(item, View.CssClass.SELECTED);
        });

        goog.dom.classlist.add(this.dom.linkWraps[id], View.CssClass.SELECTED);
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.params = this.transformParams(this.getParams());

        this.dom.links = goog.dom.getElementsByClass(View.CssClass.LINK);
        this.dom.linkWraps = goog.array.toArray(
            goog.dom.getElementsByClass(View.CssClass.LINK_WRAP)
        );
    };


    /**
     * Transform params to compressed ones
     * @param {Object} rawParams
     * @return {sm.bSmSwitch.Params.Data}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            selectedItemId: rawParams['selectedItemId'],
            items: rawParams['items'] ?
                rawParams['items'].map(function(item) {
                    return {
                        label: item['label'],
                        value: item['value'],
                        url: item['url']
                    };
                }) : []
        };
    };

});  // goog.scope
