goog.provide('sm.bSmInteractionForm.SmInteractionFormComment');

goog.require('sm.bSmInteractionForm.SmInteractionForm');
goog.require('sm.bSmInteractionForm.ViewComment');
goog.require('sm.bSmStars.SmStars');


goog.scope(function() {



    /**
     * Control
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {sm.bSmInteractionForm.SmInteractionForm}
     */
    sm.bSmInteractionForm.SmInteractionFormComment = function(view,
        opt_domHelper) {

        sm.bSmInteractionForm.SmInteractionFormComment.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Instance stars
         * @type {Array<sm.smStars.Stars>}
         * @private
         */
        this.stars_ = [];
    };
    goog.inherits(
        sm.bSmInteractionForm.SmInteractionFormComment,
        sm.bSmInteractionForm.SmInteractionForm
    );
    var InteractionForm = sm.bSmInteractionForm.SmInteractionFormComment,
        View = sm.bSmInteractionForm.ViewComment;


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    InteractionForm.prototype.decorateInternal = function(element) {
        InteractionForm.base(this, 'decorateInternal', element);

        this.initEvaluations_();
    };


    /**
     * @protected
     * @override
     */
    InteractionForm.prototype.enterDocument = function() {
        InteractionForm.base(this, 'enterDocument');
    };


    /**
     * Initializes instance to use for evaluations
     * @private
     */
    InteractionForm.prototype.initEvaluations_ = function() {
        this.stars_ = this.decorateChildren(
            'smStars',
            this.getView().getDom().stars
        );
    };
});  // goog.scope
