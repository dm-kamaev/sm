/**
 * @fileoverview l-search_experimental instance creator
 */
goog.module('sm.lSearch.SearchExperimental.Initer');

const SearchExperimental = goog.require('sm.lSearch.SearchExperimental');
const View = goog.require('sm.lSearch.ViewExperimental');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(SearchExperimental.NAME, View.CssClass.ROOT);
});
