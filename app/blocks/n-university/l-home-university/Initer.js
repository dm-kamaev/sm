/**
 * @fileoverview l-home-university instance creator
 */
goog.module('sm.lHomeUniversity.HomeUniversity.Initer');

const HomeUniversity = goog.require('sm.lHomeUniversity.HomeUniversity');
const View = goog.require('sm.lHomeUniversity.View');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(HomeUniversity.NAME, View.CssClass.ROOT);
});
