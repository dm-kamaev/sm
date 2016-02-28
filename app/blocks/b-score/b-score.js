goog.provide('sm.bScore.Score');

goog.require('goog.dom');



/**
 * Score component
 * @param {object} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bScore.Score = function(opt_params) {
    goog.base(this);

};
goog.inherits(sm.bScore.Score, goog.ui.Component);

goog.scope(function() {
    var Score = sm.bScore.Score;

    /**
     * Css class enum
     * @enum {String}
     */
    Score.CssClass = {
        ROOT: 'b-score',
        PLACE_COMMENT: 'b-score__inform_place-comment'
    };

    /**
     * Event enum
     * @enum {String}
     */
    Score.Event = {
        PLACE_COMMENT_CLICK: 'place-comment-click'
    };

    /**
     * Sets up the component
     */
    Score.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var element = goog.dom.getElementByClass(Score.CssClass.PLACE_COMMENT);

        if (element) {
            this.getHandler().listen(
                goog.dom.getElementByClass(Score.CssClass.PLACE_COMMENT),
                goog.events.EventType.CLICK,
                this.placeCommentHandler_
            );
        }
    };

    /**
     * Place comment click handler
     * @private
     */
    Score.prototype.placeCommentHandler_ = function() {
        this.dispatchEvent({
            'type': Score.Event.PLACE_COMMENT_CLICK
        });
    };

});
