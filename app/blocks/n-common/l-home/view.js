goog.provide('sm.lHome.View');

goog.require('goog.dom.classlist');
goog.require('sm.iLayout.ViewStendhal');


goog.scope(function() {



    /**
     * Home View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {sm.iLayout.ViewStendhal}
     */
    sm.lHome.View = function(opt_params, opt_type, opt_modifier) {
        sm.lHome.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );

        /**
         * @type {Object}
         * @protected
         */
        this.params = {};

    };
    goog.inherits(sm.lHome.View, sm.iLayout.ViewStendhal);
    var View = sm.lHome.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-home'
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);
    };
});  // goog.scope
