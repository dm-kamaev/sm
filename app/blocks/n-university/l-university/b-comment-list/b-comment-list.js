goog.provide('sm.lUniversity.bCommentList.CommentList');

goog.require('cl.iControl.Control');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lUniversity.bCommentList.CommentList = function(view, opt_domHelper) {
    sm.lUniversity.bCommentList.CommentList.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(
    sm.lUniversity.bCommentList.CommentList, cl.iControl.Control
);


goog.scope(function() {
    var CommentList = sm.lUniversity.bCommentList.CommentList;


    /**
     * @protected
     * @override
     */
    CommentList.prototype.decorateInternal = function(element) {
        CommentList.base(this, 'decorateInternal', element);

        this.initControlPanel_();
    };


    /**
     * @override
     * @protected
     */
    CommentList.prototype.enterDocument = function() {
        CommentList.base(this, 'enterDocument');
    };


    /**
     * Init control panel
     * @private
     */
    CommentList.prototype.initControlPanel_ = function() {
        this.decorateChild(
            'button',
            this.getView().getDom().showCommentsButton
        );

        this.decorateChild(
            'button',
            this.getView().getDom().leaveCommentButton
        );
    };
});  // goog.scope
