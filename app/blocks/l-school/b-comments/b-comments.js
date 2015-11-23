goog.provide('sm.lSchool.bComments.Comments');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.lSchool.bComment.Comment');
goog.require('sm.lSchool.bComments.Template');

/**
 * Comments component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bComments.Comments = function(opt_params) {
    goog.base(this);

    /**
     * @private
     * @type {object}
     */
    this.params_ = opt_params || {};

    /**
     * @private
     * @type{NodeList}
     */
    this.comments_ = [];
};
goog.inherits(sm.lSchool.bComments.Comments, goog.ui.Component);


goog.scope(function() {
    var Comments = sm.lSchool.bComments.Comments;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Comments.CssClass = {
        ROOT: 'b-comments',
        LINE: 'b-comments__line',
        COMMENT: 'b-comment'
    };

    /**
     * Template-based dom element creation.
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
     * @param {node} element
     */
    Comments.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var comments = goog.dom.getElementsByClass(
            Comments.CssClass.COMMENT, this.element_
        );

        this.comments_ = comments;

        /** comments decoration */
        var comment,
            commentInstance;
        if (comments.length > 0) {
            for (var i = 0; i < comments.length; i++) {
                comment = comments[i];
                commentInstance = new sm.lSchool.bComment.Comment();

                this.addChild(commentInstance);
                commentInstance.decorate(comment);
            }
        }
    };

    /**
     * Sets up the Component.
     */
    Comments.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

    /**
     * creates and returns comment
     * @param {object} params
     * @return {Element}
     * @public
     */
    Comments.prototype.addComment = function(params) {
        var comment = goog.soy.renderAsElement(
                sm.lSchool.bComment.Template.base, {
                    params: params
                }
            ),
            commentInstance = new sm.lSchool.bComment.Comment(params);

        this.addChild(commentInstance, true);
        this.comments_.push(commentInstance.getElement());

        return comment;
    };

    /**
     * Cleans up the Component.
     */
    Comments.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');
    };
});
