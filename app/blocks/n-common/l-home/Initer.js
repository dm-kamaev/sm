/**
 * @fileoverview l-home instance creator
 */
goog.module('sm.lHome.Home.Initer');

const Home = goog.require('sm.lHome.Home');
const View = goog.require('sm.lHome.View');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(Home.NAME, View.CssClass.ROOT);
});
