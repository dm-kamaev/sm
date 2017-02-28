goog.provide('sm.bSmInteractionForm.ViewComment');

goog.require('sm.bSmInteractionForm.View');


goog.scope(function() {



    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {sm.bSmInteractionForm.View}
     */
    sm.bSmInteractionForm.ViewComment = function(opt_params, opt_type,
        opt_modifier) {

        sm.bSmInteractionForm.ViewComment.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(
        sm.bSmInteractionForm.ViewComment,
        sm.bSmInteractionForm.View
    );
    var ViewComment = sm.bSmInteractionForm.ViewComment;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    ViewComment.CssClass = {
        ROOT: 'b-sm-interaction-form_comment'
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    ViewComment.prototype.decorateInternal = function(element) {
        ViewComment.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Init dom elements
     * @private
     */
    ViewComment.prototype.initDom_ = function() {
        this.dom.stars = this.getElementsByClass(
            sm.bSmStars.View.CssClass.ROOT
        );
    };
});  // goog.scope
