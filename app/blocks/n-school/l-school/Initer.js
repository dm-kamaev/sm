/**
 * @fileoverview l-school instance creator
 */
goog.module('sm.lSchool.School.Initer');

const School = goog.require('sm.lSchool.School');

jQuery(function() {
    var root = goog.dom.getElementByClass(School.CssClass.ROOT);

    if (root) {
        const school = new School();
        school.decorate(root);
    }
});
