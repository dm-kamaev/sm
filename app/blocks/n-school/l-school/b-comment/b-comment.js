goog.provide('sm.lSchool.bComment.Comment');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bScore.ScoreMinimized');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSchool.bComment.Template');



/**
 * Comment component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bComment.Comment = function(opt_params) {
    goog.base(this);

    /**
     * @private
     * @type {object}
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.lSchool.bComment.Comment, goog.ui.Component);


goog.scope(function() {
    var Comment = sm.lSchool.bComment.Comment,
        ScoreMinimized = sm.bScore.ScoreMinimized,
        Utils = cl.iUtils.Utils;


    /**
     * CSS-class enum
     * @enum {string}
     */
    Comment.CssClass = {
        ROOT: 'b-comment',
        FULL_TEXT: 'b-comment__text_full',
        CROPPED_TEXT: 'b-comment__text_cropped',
        SHOW_MORE: 'b-comment__show-more'
    };


    /**
     * Template-based dom element creation.
     * @public
     */
    Comment.prototype.createDom = function() {
        goog.base(this, 'createDom');
        var el = goog.soy.renderAsElement(
            sm.lSchool.bComment.Template.base,
            {
                params: this.params_
            },
            {
                factoryIndex:
                    sm.iCloblFactory.FactoryStendhal.getInstance().getIndex()
            }
        );
        this.decorateInternal(el);
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    Comment.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_();
        this.initScore_();
    };


    /**
     * Sets up the Component.
     */
    Comment.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        /** spoiler listeners */
        if (!(this.showMore_ == null)) {
            var handler = this.getHandler();

            handler.listen(
                this.showMore_,
                goog.events.EventType.CLICK,
                this.onShowMoreClick_
            );
        }
    };


    /**
     * Init dom elements
     * @private
     */
    Comment.prototype.initElements_ = function() {
        this.showMore_ = this.getElementByClass(
            Comment.CssClass.SHOW_MORE
        );
        this.croppedText_ = this.getElementByClass(
            Comment.CssClass.CROPPED_TEXT
        );
        this.fullText_ = this.getElementByClass(
            Comment.CssClass.FULL_TEXT
        );
    };


    /**
     * Spoiler click handler
     * @private
     */
    Comment.prototype.onShowMoreClick_ = function() {
        this.setFullTextVisibility_(true);
        this.setShowMoreVisibility_(false);
    };


    /**
     * set visibility of hidden text
     * @param {boolean} visibility
     * @private
     */
    Comment.prototype.setFullTextVisibility_ = function(visibility) {
        if (visibility) {
            goog.dom.classes.add(
                this.croppedText_,
                Utils.CssClass.HIDDEN
            );
            goog.dom.classes.remove(
                this.fullText_,
                Utils.CssClass.HIDDEN
            );
        } else {
            goog.dom.classes.add(
                this.croppedText_,
                Utils.CssClass.HIDDEN
            );
            goog.dom.classes.remove(
                this.fullText_,
                Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * set visibility of show more button
     * @param {boolean} visibility
     * @private
     */
    Comment.prototype.setShowMoreVisibility_ = function(visibility) {
        visibility ? goog.dom.classes.remove(
            this.showMore_,
            Utils.CssClass.HIDDEN
        ) :
        goog.dom.classes.add(
            this.showMore_,
            Utils.CssClass.HIDDEN
        );
    };


    /**
     * Init score instance
     * @private
     */
    Comment.prototype.initScore_ = function() {
        var scoreElement = this.getElementByClass(ScoreMinimized.CssClass.ROOT);
        var score = new ScoreMinimized();
        this.addChild(score);
        score.decorate(scoreElement);
    };
});  // goog.scope
