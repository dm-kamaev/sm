/**
 * @fileoverview l-school-home instance creator
 */
goog.module('sm.lSchoolHome.SchoolHome.Initer');

const SchoolHome = goog.require('sm.lSchoolHome.SchoolHome');

jQuery(function() {
    var root = goog.dom.getElementByClass(SchoolHome.CssClass.ROOT);

    if (root) {
        const schoolHome = new SchoolHome();
        schoolHome.decorate(root);
    }
});
