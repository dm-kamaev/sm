goog.provide('sm.bSmSwitch.View');

goog.require('cl.iControl.View');
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
     * Select link on id
     * @param {number} id
     */
    View.prototype.selectLink = function(id) {
        this.dom.link_wraps.forEach(function(item) {
            goog.dom.classlist.remove(item, View.CssClass.SELECTED);
        });

        goog.dom.classlist.add(this.dom.link_wraps[id], View.CssClass.SELECTED);
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom.links = goog.dom.getElementsByClass(View.CssClass.LINK);
        this.dom.link_wraps =
            goog.dom.getElementsByClass(View.CssClass.LINK_WRAP);
    };

});  // goog.scope
