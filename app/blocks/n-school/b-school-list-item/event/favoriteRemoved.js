goog.provide('sm.bSchoolListItem.Event.FavoriteRemoved');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Add to favorites event
     * @param {number} itemId
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.bSchoolListItem.Event.FavoriteRemoved = function(itemId, opt_target) {
        goog.base(
            this, sm.bSchoolListItem.Event.FavoriteRemoved.Type, opt_target
        );


        /**
         * Added item parameters
         * @type {{
         *     itemId: number
         * }}
         */
        this.data = {
            itemId: itemId
        };
    };
    goog.inherits(sm.bSchoolListItem.Event.FavoriteRemoved, goog.events.Event);
    var FavoriteRemoved = sm.bSchoolListItem.Event.FavoriteRemoved;


    /**
     * Type of event
     * @type {string}
     */
    FavoriteRemoved.Type = 'favorite-removed';
});  // goog.scope
