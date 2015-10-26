goog.provide('sm.lSchool.bComment.Comment');

goog.require('sm.lSchool.bComment.Template');
goog.require('sm.bStars.Stars');
goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * Comment component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bComment.Comment = function(opt_params){
    goog.base(this);

    /**
     * @private
     * @type{object}
     */
    this.params_ = opt_params || {};
};

goog.inherits(sm.lSchool.bComment.Comment, goog.ui.Component);

goog.scope(function(){
    var Comment = sm.lSchool.bComment.Comment;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Comment.CssClass={
        ROOT: 'b-comment',
        TEXT: 'b-comment__text',
        HIDDENTEXT: 'b-comment__text_hidden',
        SPOILER: 'b-comment__spoiler',
        HIDDENSPOILER: 'b-comment__spoiler_hidden',
        STARS: 'b-stars'
    };

    /**
     * Template-based dom element creation.
     * @return {!Node}
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
        this.stars_ = goog.dom.getElementByClass(
            Comment.CssClass.STARS, element
        );

        /** stars decoration */
        var stars = new sm.bStars.Stars();
        this.addChild(stars,false);
        stars.decorate(this.stars_);
    };

    /**
     * Sets up the Component.
     */
    Comment.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        /** spoiler listeners */
        if(!(this.spoiler_ == null)){
            goog.events.listen(
                this.spoiler_,
                goog.events.EventType.CLICK,
                this.showText_.bind(this)
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

    /**
     * Cleans up the Component.
     * @inheritDoc
     */
    Comment.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        /** spoiler listeners */
        if(!(this.spoiler_ == null)){
            goog.events.unlisten(
                this.spoiler_,
                goog.events.EventType.CLICK,
                this.showText_.bind(this)
            );
        }
    };

    /**
     * Delete label component and dom elements
     */
    Comment.prototype.dispose = function() {
        goog.base(this, 'dispose');
        this.exitDocument.bind(this);
    };
});
