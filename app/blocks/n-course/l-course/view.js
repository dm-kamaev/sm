goog.provide('sm.lCourse.View');

goog.require('sm.bSmCollapsedText.View');
goog.require('sm.bSmMap.View');
goog.require('sm.bSmScore.ViewBrief');
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
        ROOT: 'l-course',
        ACTION_BUTTON: 'l-course__action-button'
    };


    /**
     *
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);
    };


    /**
     * Init dom elements
     * @override
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');

        goog.object.extend(
            this.dom,
            {
                scoreItems: this.getElementsByClass(
                    sm.bSmScore.ViewBrief.CssClass.ROOT
                ),
                fullDescription: this.getElementByClass(
                    sm.bSmCollapsedText.View.CssClass.ROOT
                ),
                map: this.getElementByClass(
                    sm.bSmMap.View.CssClass.ROOT
                ),
                actionButtons: this.getElementsByClass(
                    View.CssClass.ACTION_BUTTON
                )
            }
        );
    };
});  // goog.scope
