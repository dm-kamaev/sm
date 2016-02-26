goog.provide('sm.lSchool.School');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bRating.Rating');
goog.require('sm.bScore.Score');
goog.require('sm.bSearch.Search');
goog.require('sm.iEvercookie.Evercookie');
goog.require('sm.lSchool.bComment.Comment');
goog.require('sm.lSchool.bComments.Comments');
goog.require('sm.lSchool.bDataBlockFoldList.FoldList');
goog.require('sm.lSchool.bFeedbackModal.FeedbackModal');
goog.require('sm.lSchool.bMap.Map');
goog.require('sm.lSchool.bResults.Results');


/**
 * School page
 * @param {Object=} opt_params
 * @constructor
 */
sm.lSchool.School = function(opt_params) {
    goog.base(this);

    /**
     * params
     * @type {Object|{}}
     * @private
     */
    this.params_ = opt_params || {};

    /**
     * modal window
     * @type {?sm.lSchool.bFeedbackModal.FeedbackModal}
     * @private
     */
    this.modal_ = null;

    /**
     * Search instance
     * @type {?sm.bSearch.Search}
     * @private
     */
    this.search_ = null;

    /**
     * Score instance
     * @type {sm.bScore.Score}
     * @private
     */
    this.score_ = null;

    /**
     * @private
     * @type {object} Evercookie instance
     */
    this.evercookie_ = sm.iEvercookie.Evercookie.getInstance();
};
goog.inherits(sm.lSchool.School, goog.ui.Component);

goog.scope(function() {
    var School = sm.lSchool.School,
        FoldList = sm.lSchool.bDataBlockFoldList.FoldList,
        Results = sm.lSchool.bResults.Results,
        Score = sm.bScore.Score;


    /**
     * CSS-class enum
     * @enum {string}
     */
    School.CssClass = {
        'ROOT': 'l-school',
        'FEEDBACK_BUTTON': 'g-button_feedback-opener',
        'RATING': 'b-rating',
        'COMMENTS': 'b-comments',
        'FEEDBACK_LINK': 'l-school__comments-placeholder-link'
    };

    /**
     * URL enum
     * @enum {string}
     */
    School.Url = {
        'CREATE_COMMENT': '/api/school/:id/comment'
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    School.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(sm.lSchool.Template.base, {
            params: this.params_
        });
        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {element} element
     */
    School.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.evercookie_.getClientId();

        this.initElements_(element);

        this.initChildren_();
    };

    /**
     * Sets up the Component.
     */
    School.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var handler = this.getHandler();

        /** bouton listener */
        for (var i = 0; i < this.elements_.boutons.length; i++) {
            handler.listen(
                this.elements_.boutons[i],
                goog.events.EventType.CLICK,
                this.onClick_
            );
        }

        /** feedback link listener */
        if (this.elements_.feedbackLink) {
            handler.listen(
                this.elements_.feedbackLink,
                goog.events.EventType.CLICK,
                this.onClick_
            );
        }

        handler.listen(
            this.score_,
            Score.Event.PLACE_COMMENT_CLICK,
            this.onClick_
        );
    };


    /**
     * creates comment url
     * @return {string}
     * @private
     */
    School.prototype.createCommentUrl_ = function() {
        return sm.lSchool.School.Url.CREATE_COMMENT.replace(
            ':id',
            this.params_.id
        );
    };

    /**
     * onClick event
     * @private
     */
    School.prototype.onClick_ = function() {
        this.modal_.show();
    };

    /**
     * adds children
     * @private
     */
    School.prototype.initChildren_ = function() {
        /** comments */
        if (this.elements_.comments) {
            var comments = new sm.lSchool.bComments.Comments();
            this.addChild(comments);
            comments.decorate(this.elements_.comments);
        }

        /** map */
        var map = new sm.lSchool.bMap.Map();
        this.addChild(map);
        map.decorate(this.elements_.map);

        /** modal */
        this.modal_ = new sm.lSchool.bFeedbackModal.FeedbackModal({
            data: {
                url: this.createCommentUrl_()
            }
        });
        this.addChild(this.modal_);
        this.modal_.render(this.getElement());

        var l = this.elements_.foldLists.length;
        for (var i = 0, foldList; i < l; i++) {
            foldList = this.elements_.foldLists[i];
            var foldListInstance = new FoldList();
            this.addChild(foldListInstance);
            foldListInstance.decorate(foldList);
        }

        if (this.elements_.search) {
            this.search_ = new sm.bSearch.Search();
            this.addChild(this.search_);
            this.search_.decorate(this.elements_.search);
        }

        /**
         * results
         */
        var resultElement = this.getElementByClass(Results.CssClass.ROOT);

        if (resultElement) {
            var results = new Results();
            this.addChild(results);
            results.decorate(resultElement);
        }

        /**
         * score
         */
        this.score_ = new Score();
        this.addChild(this.score_);
        this.score_.decorate(this.getElementByClass(Score.CssClass.ROOT));
    };

    /**
     * gets DOM elements
     * @param {Element} root
     * @private
     */
    School.prototype.initElements_ = function(root) {
        this.elements_ = {
            root: root,
            boutons: this.getElementsByClass(
                sm.lSchool.School.CssClass.FEEDBACK_BUTTON
            ),
            feedbackLink: this.getElementByClass(
                sm.lSchool.School.CssClass.FEEDBACK_LINK
            ),
            rating: this.getElementByClass(
                sm.lSchool.School.CssClass.RATING
            ),
            comments: this.getElementByClass(
                sm.lSchool.School.CssClass.COMMENTS
            ),
            map: this.getElementByClass(
                sm.lSchool.bMap.Map.CssClass.ROOT
            ),
            foldLists: this.getElementsByClass(
                sm.lSchool.bDataBlockFoldList.FoldList.CssClass.ROOT
            ),
            search: this.getElementByClass(
                sm.bSearch.Search.CssClass.ROOT
            )
        };
    };
});

/**
 * creates sm.lSchool.School instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(sm.lSchool.School.CssClass.ROOT),
        params = jQuery(root).data('params');

    if (root) {
        var school = new sm.lSchool.School(params);
        school.decorate(root);
    }
});
