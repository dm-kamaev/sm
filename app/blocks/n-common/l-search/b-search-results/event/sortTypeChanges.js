goog.provide('sm.lSearch.bSearchResults.Event.SortTypeChanges');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Item select event
     * @param {{
     *     value: (string|number|undefined),
     *     label: string
     * }} params
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.lSearch.bSearchResults.Event.SortTypeChanges =
        function(params, opt_target) {
            goog.base(
                this,
                sm.lSearch.bSearchResults.Event.SortTypeChanges.Type,
                opt_target
            );


        /**
         * Event parameters
         * @type {{
         *     value: (string|number|undefined),
         *     label: string
         * }}
         */
        this.data = {
            value: params.value,
            label: params.label
        };
    };
    goog.inherits(
        sm.lSearch.bSearchResults.Event.SortTypeChanges,
        goog.events.Event
    );
    var SortTypeChanges = sm.lSearch.bSearchResults.Event.SortTypeChanges;


    /**
     * Type of event
     * @type {string}
     */
    SortTypeChanges.Type = goog.events.getUniqueId('sort-type-changes');
});  // goog.scope
