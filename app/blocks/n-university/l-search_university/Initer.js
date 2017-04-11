/**
 * @fileoverview l-search_university instance creator
 */
goog.module('sm.lSearch.SearchUniversity.Initer');

const SearchUniversity = goog.require('sm.lSearch.SearchUniversity');
const ViewUniversity = goog.require('sm.lSearch.ViewUniversity');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(SearchUniversity.NAME, ViewUniversity.CssClass.ROOT);
});
