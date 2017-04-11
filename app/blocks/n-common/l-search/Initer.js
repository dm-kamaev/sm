/**
 * @fileoverview l-search instance creator
 */
goog.module('sm.lSearch.Search.Initer');

const Search = goog.require('sm.lSearch.Search');
const View = goog.require('sm.lSearch.View');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(Search.NAME, View.CssClass.ROOT);
});
