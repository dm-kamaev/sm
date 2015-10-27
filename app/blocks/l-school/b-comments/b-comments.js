goog.provide('sm.lSchool.bComments.Comments');

goog.require('sm.lSchool.bComments.Template');
goog.require('sm.lSchool.bComment.Comment');
goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * Comments component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bComments.Comments = function(opt_params){
    goog.base(this);

    /**
     * @private
     * @type{object}
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.lSchool.bComments.Comments, goog.ui.Component);


goog.scope(function(){
    var Comments = sm.lSchool.bComments.Comments;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Comments.CssClass={
        ROOT: "b-comments",
        LINE: "b-comments__line",
        COMMENT: "b-comment"
    };

    /**
     * Template-based dom element creation.
     * @return {!Node}
     * @public
     */
    Comments.prototype.createDom = function() {
        var el = goog.soy.renderAsElement(sm.lSchool.bComments.Template.base, {
            params: this.params_
        });
        this.decorateInternal(el);
    };

    /**
     * Internal decorates the DOM element
     * @param {Node} element
     * @inheritDoc
     */
    Comments.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.comments_ = goog.dom.getElementsByClass(
            Comments.CssClass.COMMENT, element
        );

        /** comments decoration */
        if(this.comments_.length > 0) {
            for (var i = 0, comment, commentInstance; i < this.comments_.length; i++) {
                comment = this.comments_[i];
                commentInstance = new sm.lSchool.bComment.Comment();
                this.addChild(commentInstance);
                commentInstance.decorate(comment);
            }
        }
    };

    /**
     * Sets up the Component.
     * @inheritDoc
     */
    Comments.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

    /**
     * Cleans up the Component.
     * @inheritDoc
     */
    Comments.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');
    };


    /**
     * Delete label component and dom elements
     */
    Comments.prototype.dispose = function() {
        goog.base(this, 'dispose');
        this.exitDocument.bind(this);
    };
});