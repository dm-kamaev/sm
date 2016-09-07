goog.provide('sm.lCourse.View');

goog.require('sm.iLayout.ViewStendhal');



goog.scope(function() {



    /**
     * Course View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {sm.iLayout.ViewStendhal}
     */
    sm.lCourse.View = function(opt_params, opt_type, opt_modifier) {
        sm.lCourse.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);
    };
    goog.inherits(sm.lCourse.View, sm.iLayout.ViewStendhal);



    var View = sm.lCourse.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-course'
    };


    /**
     *
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {};
    };
});  // goog.scope
