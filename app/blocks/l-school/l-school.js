goog.provide('sm.lSchool.School');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bRating.Rating');
goog.require('sm.bSearch.Search');
goog.require('sm.lSchool.bComment.Comment');
goog.require('sm.lSchool.bComments.Comments');
goog.require('sm.lSchool.bDataBlockFoldList.FoldList');
goog.require('sm.lSchool.bFeedbackModal.FeedbackModal');
goog.require('sm.lSchool.bMap.Map');

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
};
goog.inherits(sm.lSchool.School, goog.ui.Component);

goog.scope(function() {
    var School = sm.lSchool.School,
        FoldList = sm.lSchool.bDataBlockFoldList.FoldList;


    /**
     * CSS-class enum
     * @enum {string}
     */
    School.CssClass = {
        'ROOT': 'l-school',
        'FEEDBACK_BUTTON': 'b-bouton_feedback-opener',
        'RATING': 'b-rating',
        'COMMENTS': 'b-comments'
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

        this.initElements_(element);

        this.initChildren_();
    };

    /**
     * Sets up the Component.
     */
    School.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        /** bouton listener */
        for (var i = 0; i < this.elements_.boutons.length; i++) {
            goog.events.listen(
                this.elements_.boutons[i],
                goog.events.EventType.CLICK,
                this.onClick_,
                false,
                this
            );
        }

        /** search submit listener */
        this.getHandler().listen(
            this.search_,
            sm.bSearch.Search.Event.SUBMIT,
            this.onSubmit_
        );

        /** Area/Metro selectcion */
        this.getHandler().listen(
            this.search_,
            sm.bSearch.Search.Event.ITEM_SELECT,
            this.onNotSchoolSelect_
        );
    };

    /**
     * Cleans up the Component.
     */
    School.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        /** bouton listener */
        for (var i = 0; i < this.elements_.boutons.length; i++) {
            goog.events.unlisten(
                this.elements_.boutons[i],
                goog.events.EventType.CLICK,
                this.onClick_,
                false,
                this
            );
        }
    };

    /**
     * Input submit handler
     * @param {Object} event
     * @private
     */
    School.prototype.onSubmit_ = function(event) {
        this.searchRequest_(event.text);
    };

    /**
     * Area/metro redirect handler
     * @param {Object} event
     * @private
     */
    School.prototype.onNotSchoolSelect_ = function(event) {
        var url = '/school' +
            '?id=' + event.data.id + '&type=' + event.data.type +
                '&name=' + this.search_.getValue();
        document.location.href = url;
    };

    /**
     * Search redirect
     * @param {string} searchString
     * @private
     */
    School.prototype.searchRequest_ = function(searchString) {
        var url = '/school';
        if (searchString) {
            url += '?name=' + encodeURIComponent(searchString);
        }
        document.location.href = url;
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
        var comments = new sm.lSchool.bComments.Comments();
        this.addChild(comments);
        comments.decorate(this.elements_.comments);

        /** rating */
        // var rating = new sm.bRating.Rating();
        // this.addChild(rating);
        // rating.decorate(this.elements_.rating);

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
        this.modal_.render();

        var l = this.elements_.foldLists.length;
        for (var i = 0, foldList; i < l; i++) {
            foldList = this.elements_.foldLists[i];
            var foldListInstance = new FoldList();
            this.addChild(foldListInstance);
            foldListInstance.decorate(foldList);
        }

        this.search_ = new sm.bSearch.Search();
        this.addChild(this.search_);
        this.search_.decorate(this.elements_.search);
    };

    /**
     * gets DOM elements
     * @param {Element} root
     * @private
     */
    School.prototype.initElements_ = function(root) {
        this.elements_ = {
            root: root,
            boutons: goog.dom.getElementsByClass(
                sm.lSchool.School.CssClass.FEEDBACK_BUTTON,
                root
            ),
            rating: goog.dom.getElementByClass(
                sm.lSchool.School.CssClass.RATING,
                root
            ),
            comments: goog.dom.getElementByClass(
                sm.lSchool.School.CssClass.COMMENTS,
                root
            ),
            map: goog.dom.getElementByClass(
                sm.lSchool.bMap.Map.CssClass.ROOT,
                root
            ),
            foldLists: goog.dom.getElementsByClass(
                sm.lSchool.bDataBlockFoldList.FoldList.CssClass.ROOT,
                root
            ),
            search: goog.dom.getElementByClass(
                sm.bSearch.Search.CssClass.ROOT,
                root
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
