goog.provide('sm.lSchool.bComment.Comment');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bStars.Stars');
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
    var Comment = sm.lSchool.bComment.Comment;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Comment.CssClass = {
        ROOT: 'b-comment',
        TEXT: 'b-comment__text',
        HIDDENTEXT: 'b-comment__text_hidden',
        SPOILER: 'b-comment__spoiler',
        HIDDENSPOILER: 'b-comment__spoiler_hidden',
        STARS: 'b-stars'
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    Comment.prototype.createDom = function() {
        goog.base(this, 'createDom');
        var el = goog.soy.renderAsElement(sm.lSchool.bComment.Template.base, {
            params: this.params_
        });
        this.decorateInternal(el);
    };

    /**
     * Internal decorates the DOM element
     * @param {Node} element
     */
    Comment.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.spoiler_ = goog.dom.getElementByClass(
            Comment.CssClass.SPOILER, element
        );
        this.text_ = goog.dom.getElementByClass(
            Comment.CssClass.TEXT, element
        );
        this.hiddenText_ = goog.dom.getElementByClass(
            Comment.CssClass.HIDDENTEXT, element
        );
        this.stars_ = goog.dom.getElementsByClass(
            Comment.CssClass.STARS, element
        );

        /** stars decoration */
        for (var i = 0, stars; i < this.stars_.length; i++) {
            stars = new sm.bStars.Stars();
            this.addChild(stars, false);
            stars.decorate(this.stars_[i]);
        }
    };

    /**
     * Sets up the Component.
     */
    Comment.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        /** spoiler listeners */
        if (!(this.spoiler_ == null)) {
            var handler = this.getHandler();

            handler.listen(
                this.spoiler_,
                goog.events.EventType.CLICK,
                this.showText_
            );
        }
    };

    /**
     * spoiler handler
     * @private
     */
    Comment.prototype.showText_ = function() {
        goog.dom.classes.add(
            this.spoiler_,
            Comment.CssClass.HIDDENSPOILER
        );
        goog.dom.classes.add(
            this.text_,
            Comment.CssClass.HIDDENTEXT
        );
        goog.dom.classes.remove(
            this.hiddenText_,
            Comment.CssClass.HIDDENTEXT
        );
    };
});
