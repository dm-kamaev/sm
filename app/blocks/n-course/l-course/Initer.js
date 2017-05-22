/**
 * @fileoverview l-course instance creator
 */
goog.module('sm.lCourse.Course.Initer');

const CourseInformation = goog.require('sm.lCourse.Course');
const View = goog.require('sm.lCourse.View');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(CourseInformation.NAME, View.CssClass.ROOT);
});
