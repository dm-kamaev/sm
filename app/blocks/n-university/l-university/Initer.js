/**
 * @fileoverview l-university instance creator
 */
goog.module('sm.lUniversity.University.Initer');

const UniversityInformation = goog.require('sm.lUniversity.University');
const View = goog.require('sm.lUniversity.View');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(UniversityInformation.NAME, View.CssClass.ROOT);
});
