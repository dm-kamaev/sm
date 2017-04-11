/**
 * @fileoverview l-error-not-found instance creator
 */
goog.module('sm.lErrorNotFound.ErrorNotFound.Initer');

const ErrorNotFound = goog.require('sm.lErrorNotFound.ErrorNotFound');
const View = goog.require('sm.lErrorNotFound.View');
const Layout = goog.require('sm.iLayout.LayoutStendhal');

jQuery(function() {
    Layout.autoInstance(ErrorNotFound.NAME, View.CssClass.ROOT);
});
