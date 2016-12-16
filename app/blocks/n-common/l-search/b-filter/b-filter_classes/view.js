goog.provide('sm.lSearch.bFilter.ViewClasses');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('sm.lSearch.bFilter.View');



/**
 * Filter View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.View}
 */
sm.lSearch.bFilter.ViewClasses = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.ViewClasses.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lSearch.bFilter.ViewClasses, sm.lSearch.bFilter.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewClasses;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_classes',
        OPTION_LIST: 'b-sm-filter__option-list',
        OPTION_LABELS: 'b-sm-filter__option-labels',
        OPTION_KINDERARTEN: 'b-sm-filter__option-kindergarten'
    };


    /**
     * Initializes options
     * @param {Element=} opt_element
     */
    View.prototype.initOptions = function(opt_element) {
        this.dom.optionList = this.getElementByClass(
            View.CssClass.OPTION_LIST
        );

        this.dom.optionLabels = this.getElementByClass(
            View.CssClass.OPTION_LABELS
        );

        this.dom.optionKindergarten = this.getElementByClass(
            View.CssClass.OPTION_KINDERARTEN
        );
    };
});  // goog.scope
