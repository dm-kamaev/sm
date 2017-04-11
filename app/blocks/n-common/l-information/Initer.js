/**
 * @fileoverview l-information instance creator
 */
goog.module('sm.lInformation.Information.Initer');

const Information = goog.require('sm.lInformation.Information');
const View = goog.require('sm.lInformation.View');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(Information.NAME, View.CssClass.ROOT);
});
