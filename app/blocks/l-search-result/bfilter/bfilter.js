goog.provide('sm.lSearchResult.iFilter.Filter');

goog.require('goog.ui.Component');
goog.require('goog.events');
goog.require('goog.soy');

sm.lSearchResult.iFilter.Filter = function() {
    goog.base(this);
};
goog.inherits(sm.lSearchResult.iFilter.Filter, goog.ui.Component);

goog.scope(function() {
    var Filter = sm.lSearchResult.iFilter.Filter;

    Filter.Event = {
        ADD_FILTER: 'addFilter'
    };

    /**
     * Add filter
     * @param {Object} data
     * @public
     */
    Filter.prototype.addFilter = function(data) {
        this.dispatchEvent({
            type: Filter.Event.ADD_FILTER,
            data: data
        })
    };
});
