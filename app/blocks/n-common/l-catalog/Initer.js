/**
 * @fileoverview l-catalog instance creator
 */
goog.module('sm.lCatalog.Catalog.Initer');

const Catalog = goog.require('sm.lCatalog.Catalog');
const View = goog.require('sm.lCatalog.View');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(Catalog.NAME, View.CssClass.ROOT);
});
