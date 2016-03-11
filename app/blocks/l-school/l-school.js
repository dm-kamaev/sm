goog.provide('sm.lSchool.School');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bRating.Rating');
goog.require('sm.bScore.Score');
goog.require('sm.bSearch.Search');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iFactory.FactoryStendhal');
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
     * Auth modal window
     * @type {sm.gModal.ModalAuth}
     * @private
     */
    this.authSocial_ = null;

    /**
     * Score instance
     * @type {sm.bScore.Score}
     * @private
     */
    this.score_ = null;

    /**
     * TODO: repair
     * @type {Boolean}
     * @private
     */
    this.isRegistrated_ = false;
};
goog.inherits(sm.lSchool.School, goog.ui.Component);

goog.scope(function() {
    var School = sm.lSchool.School,
        FoldList = sm.lSchool.bDataBlockFoldList.FoldList,
        Results = sm.lSchool.bResults.Results,
        Score = sm.bScore.Score,
        Map = sm.lSchool.bMap.Map,
        Search = sm.bSearch.Search,
        Comments = sm.lSchool.bComments.Comments,
        FeedbackModal = sm.lSchool.bFeedbackModal.FeedbackModal,
        AuthSocialModalView = cl.gAuthSocialModal.View,
        factory = sm.iFactory.FactoryStendhal.getInstance();


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
        if (this.isRegistrated_) {
            this.modal_.show();
        } else {
            this.authSocial_.show();
            this.isRegistrated_ = true;
        }
    };

    /**
     * adds children
     * @private
     */
    School.prototype.initChildren_ = function() {
        this.initModal_()
            .initScore_()
            .initAuthSocial_()
            .initComponents_(FoldList)
            .initComponents_(Map)
            .initComponents_(Search)
            .initComponents_(Comments)
            .initComponents_(Results);
    };

    /**
     * Components initialization
     * @param  {Function} component
     * @param  {string=} opt_cssClass
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initComponents_ = function(component, opt_cssClass) {
        var cssClass = opt_cssClass || component.CssClass.ROOT,
            elements = this.getElementsByClass(cssClass);

        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                this.initComponent_(component, elements[i]);
            }
        }

        return this;
    };

    /**
     * Score initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initScore_ = function() {
        this.score_ = this.initComponent_(
            Score, this.getElementByClass(Score.CssClass.ROOT)
        );

        return this;
    };

    /**
     * Modal initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initModal_ = function() {
        this.modal_ = new FeedbackModal({
            data: {
                url: this.createCommentUrl_()
            }
        });
        this.addChild(this.modal_);
        this.modal_.render(this.getElement());

        return this;
    };

    /**
     * Modal auth initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initAuthSocial_ = function() {
        this.authSocial_ = factory.decorate(
            'auth-social-modal',
            this.getElementByClass(AuthSocialModalView.CssClass.ROOT),
            this
        );

        return this;
    };

    /**
     * Component initialization
     * @param {Function} component
     * @param {Element} element
     * @param {Object=} opt_params
     * @return {Object}
     * @private
     */
    School.prototype.initComponent_ = function(component, element, opt_params) {
        var instance = new component(opt_params);
        this.addChild(instance);
        instance.decorate(element);

        return instance;
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
