goog.provide('sm.lSearchResult.bFilter.Filter');

goog.require('goog.ui.Component');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * Filter component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bFilter.Filter = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type{Object}
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.lSearchResult.bFilter.Filter, goog.ui.Component);

goog.scope(function() {
    var Filter = sm.lSearchResult.bFilter.Filter;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Filter.CssClass = {
        ROOT: 'b-filter'
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    Filter.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bSchoolList.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Getter for form serialize array
     * @returns {Array.<Object.<string, *>>|*}
     * @public
     */
    Filter.prototype.getFormSerializeArray = function() {
        var form = jQuery(this.getElement()),
            data = form.serializeArray();

        return data;
    }
});
