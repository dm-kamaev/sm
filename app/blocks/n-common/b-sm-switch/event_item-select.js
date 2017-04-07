goog.provide('sm.bSmSwitch.Event.ItemSelect');

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
    sm.bSmSwitch.Event.ItemSelect = function(params, opt_target) {
        goog.base(this, ItemSelect.Type, opt_target);


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
    goog.inherits(sm.bSmSwitch.Event.ItemSelect, goog.events.Event);
    var ItemSelect = sm.bSmSwitch.Event.ItemSelect;


    /**
     * Type of event
     * @type {string}
     */
    ItemSelect.Type = goog.events.getUniqueId('item-select');
});  // goog.scope
