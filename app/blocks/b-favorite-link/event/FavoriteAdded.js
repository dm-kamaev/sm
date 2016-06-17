goog.provide('sm.bFavoriteLink.Event.FavoriteAdded');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Add to favorites event
     * @param {sm.bSchoolListItem.SchoolListItem.Params} data
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.bFavoriteLink.Event.FavoriteAdded = function(data, opt_target) {
        goog.base(this, sm.bFavoriteLink.Event.FavoriteAdded.Type, opt_target);


        /**
         * Added item parameters
         * @type {sm.bSchoolListItem.SchoolListItem.Params}
         */
        this.data = data;
    };
    goog.inherits(sm.bFavoriteLink.Event.FavoriteAdded, goog.events.Event);
    var FavoriteAdded = sm.bFavoriteLink.Event.FavoriteAdded;


    /**
     * Type of event
     * @type {string}
     */
    FavoriteAdded.Type = 'favorite-added';
});  // goog.scope
