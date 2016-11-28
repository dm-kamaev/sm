goog.provide('sm.bSmMap.Event.PinClick');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Pin Click
     * @param {Object} params
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.bSmMap.Event.PinClick = function(params, opt_target) {
        goog.base(
            this, sm.bSmMap.Event.PinClick.Type, opt_target
        );


        /**
         * Added item parameters
         * @type {Array<{
         *      id: number,
         *      name: string,
         *      address: string,
         *      list: string,
         *      category: string,
         *      position: number
         * }>}
         */
        this.data = this.getPinData(params);
    };
    goog.inherits(sm.bSmMap.Event.PinClick, goog.events.Event);
    var PinClick = sm.bSmMap.Event.PinClick;


    /**
     * Type of event
     * @type {string}
     */
    PinClick.Type = 'pin-click';


    /**
     * Get pin data
     * @param {Object} params
     * @return {sm.bSmMap.Event.PinClick.Data}
     */
    PinClick.prototype.getPinData = function(params) {
        var res = [];
        if (params.items.length == 0) {
            res.push({
                id: params['id'],
                name: params['name'],
                list: 'map baloon',
                category: params['category'],
                address: params['description'],
                position: 1
            });
        } else {
            params.items.map(function(item, index) {
                res.push({
                    id: item['id'],
                    name: item['name']['light'],
                    list: 'map baloon',
                    category: item['category'],
                    address: params['addressName'],
                    position: index + 1
                });
            });
        }
        return res;
    };
});  // goog.scope
