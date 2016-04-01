goog.provide('sm.lSchool.School');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bMap.Map');
goog.require('sm.bRating.Rating');
goog.require('sm.bScore.Score');
goog.require('sm.bSearch.Search');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.lSchool.bComment.Comment');
goog.require('sm.lSchool.bComments.Comments');
goog.require('sm.lSchool.bDataBlock.DataBlockFoldList');
goog.require('sm.lSchool.bDataBlock.DataBlockRatings');
goog.require('sm.lSchool.bFeedbackModal.FeedbackModal');
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
     * Modal inaccuracy instance
     * @type {sm.gModal.ModalFeedback}
     * @private
     */
    this.modalInaccuracy_ = null;

    /**
     * Feedback button instance
     * @type {sm.gButton.Button}
     * @private
     */
    this.bouton_ = null;

    /*
     * instance popular Schools
     * @type {sm.bPopularSchools.PopularSchools}
     * @private
     */
    this.popularSchools_ = null;
};
goog.inherits(sm.lSchool.School, goog.ui.Component);

goog.scope(function() {
    var School = sm.lSchool.School,
        FoldList = sm.lSchool.bDataBlock.DataBlockFoldList,
        DBlockRatings = sm.lSchool.bDataBlock.DataBlockRatings,
        Results = sm.lSchool.bResults.Results,
        Score = sm.bScore.Score,
        Map = sm.bMap.Map,
        Search = sm.bSearch.Search,
        Comments = sm.lSchool.bComments.Comments,
        FeedbackModal = sm.lSchool.bFeedbackModal.FeedbackModal,
        AuthSocialModalView = cl.gAuthSocialModal.View,
        factory = sm.iFactory.FactoryStendhal.getInstance(),
        PopularSchools = sm.bPopularSchools.PopularSchools;


    /**
     * CSS-class enum
     * @enum {string}
     */
    School.CssClass = {
        'ROOT': 'l-school',
        'FEEDBACK_BUTTON': 'g-button_feedback-opener',
        'RATING': 'b-rating',
        'COMMENTS': 'b-comments',
        'FEEDBACK_LINK': 'l-school__comments-placeholder-link',
        'INACCURACY_LINK': 'l-school__link_inaccuracy'
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

        this.initPopularSchools_(element);
    };

    /**
     * Sets up the Component.
     */
    School.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var handler = this.getHandler();

        /** bouton listener */
        if (!this.isCommented_()) {
            handler.listen(
                this.bouton_,
                cl.gButton.Button.Event.CLICK,
                this.onClick_
            );

            handler.listen(
                this.score_,
                Score.Event.PLACE_COMMENT_CLICK,
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
            this.elements_.inaccuracyLink,
            goog.events.EventType.CLICK,
            this.onClickInaccuracyLink_
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
        if (this.getUser_()) {
            this.modal_.show();
        } else {
            this.authSocial_.show();
        }
    };

    /**
     * onClick event
     * @private
     */
    School.prototype.onClickInaccuracyLink_ = function() {
        this.modalInaccuracy_.show();
    };

    /**
     * adds children
     * @private
     */
    School.prototype.initChildren_ = function() {
        this.initModal_()
            .initScore_()
            .initAuthSocial_()
            .initModalInaccuracy_()
            .initComponents_(FoldList)
            .initComponents_(DBlockRatings)
            .initComponents_(Map)
            .initComponents_(Search)
            .initComponents_(Comments)
            .initComponents_(Results)
            .initBouton_();
    };

    /**
     * Button initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initBouton_ = function() {
        if (!this.isCommented_()) {
            this.bouton_ = factory.decorate(
                'button',
                this.elements_.bouton,
                this
            );
        }
        return this;
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
                url: this.createCommentUrl_(),
                schoolName: this.params_.schoolName
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
     * Modal inaccuracy initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initModalInaccuracy_ = function() {
        this.modalInaccuracy_ = factory.decorate(
            'feedback-modal',
            this.getElementByClass(cl.gModal.View.CssClass.ROOT),
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
            bouton: this.getElementByClass(
                sm.lSchool.School.CssClass.FEEDBACK_BUTTON
            ),
            feedbackLink: this.getElementByClass(
                sm.lSchool.School.CssClass.FEEDBACK_LINK
            ),
            rating: this.getElementByClass(
                sm.lSchool.School.CssClass.RATING
            ),
            inaccuracyLink: this.getElementByClass(
                sm.lSchool.School.CssClass.INACCURACY_LINK
            )
        };
    };

    /**
     * @private
     * @return {bool}
     */
    School.prototype.isCommented_ = function() {
        return JSON.parse(
                goog.dom.dataset.get(this.getElement(), 'params')
            ).isCommented;
    };

    /**
     * @private
     * @return {object}
     */
    School.prototype.getUser_ = function() {
        return !!JSON.parse(
                goog.dom.dataset.get(this.getElement(), 'params')
            ).user;
    };

    /**
     * Initialization popular schools
     * @param {Element} element
     * @private
     */
    School.prototype.initPopularSchools_ = function(element) {

        var bPopularSchools = goog.dom.getElementByClass(
            sm.bPopularSchools.View.CssClass.ROOT,
            element
        );

        this.popularSchools_ = factory.decorate(
            'popular-schools',
            bPopularSchools,
            this
        );
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
