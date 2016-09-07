goog.provide('sm.lCourse.Course');

goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lCourse.View');


goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lCourse.Course = function(view, opt_domHelper) {
        sm.lCourse.Course.base(this, 'constructor', view, opt_domHelper);
    };
    goog.inherits(sm.lCourse.Course, sm.iLayout.LayoutStendhal);
    var Course = sm.lCourse.Course;


    /**
     * @param {Element} element
     * @override
     */
    Course.prototype.decorateInternal = function(element) {
        Course.base(this, 'decorateInternal', element);
    };
});  // goog.scope


/**
 * creates sm.lCourse.Course instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lCourse.View.CssClass.ROOT
    );

    var view = new sm.lCourse.View(null, null, 'stendhal');
    var instance = new sm.lCourse.Course(view);

    instance.decorate(domElement);
});
