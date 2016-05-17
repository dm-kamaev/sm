goog.provide('sm.lSchool.School');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bDataBlock.DataBlockFeatures');
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
 * @extends {goog.ui.Component}
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


    /**
     * instance popular Schools
     * @type {sm.bPopularSchools.PopularSchools}
     * @private
     */
    this.popularSchools_ = null;


    /**
     * instance data Block Features
     * @type {sm.bDataBlock.DataBlockFeatures}
     * @private
     */
    this.dataBlockFeatures_ = null;


    /**
     * Map inctance
     * @type {sm.bMap.Map}
     * @private
     */
    this.map_ = null;


    /**
     * Comments instance
     * @type {sm.lSchool.bComments.Comments}
     * @private
     */
    this.comments_ = null;
};
goog.inherits(sm.lSchool.School, goog.ui.Component);

goog.scope(function() {
    var School = sm.lSchool.School,
        DataBlockFoldList = sm.lSchool.bDataBlock.DataBlockFoldList,
        DBlockRatings = sm.lSchool.bDataBlock.DataBlockRatings,
        Results = sm.lSchool.bResults.Results,
        Score = sm.bScore.Score,
        Map = sm.bMap.Map,
        Search = sm.bSearch.Search,
        Comments = sm.lSchool.bComments.Comments,
        DataBlockFeatures = sm.bDataBlock.DataBlockFeatures,
        FeedbackModal = sm.lSchool.bFeedbackModal.FeedbackModal,
        AuthSocialModalView = cl.gAuthSocialModal.View,
        factory = sm.iFactory.FactoryStendhal.getInstance(),
        PopularSchools = sm.bPopularSchools.PopularSchools,
        Analytics = sm.iAnalytics.Analytics.getInstance();


    /**
     * CSS-class enum
     * @enum {string}
     */
    School.CssClass = {
        'ROOT': 'l-school',
        'FEEDBACK_BUTTON': 'g-button_feedback-opener',
        'RATING': 'b-rating',
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
     * @param {Element} element
     */
    School.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_(element);

        this.initChildren_();

        this.initPopularSchools_(element);

        this.initDataBlockFeatures_(element);
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
                this.onLeaveComment_
            );

            handler.listen(
                this.score_,
                Score.Event.PLACE_COMMENT_CLICK,
                this.onLeaveComment_
            );

            handler.listen(
                this.comments_,
                Comments.Event.LEAVE_COMMENT,
                this.onLeaveComment_
            );
        }

        /** feedback link listener */
        handler.listen(
            this.elements_.inaccuracyLink,
            goog.events.EventType.CLICK,
            this.onInaccuracyLinkClick_
        );

        handler.listen(
            this.dataBlockFeatures_,
            DataBlockFeatures.Event.LINK_INACCURACY_CLICK,
            this.onInaccuracyLinkClick_
        );

        handler.listen(
            this.dataBlockFeatures_,
            DataBlockFeatures.Event.LINK_FEEDBACK_CLICK,
            this.onFeedbackLinkClick_
        );

        this.setEcAnalytics_();
        this.sendAnalyticsPageview_();

        handler.listen(this.map_, Map.Event.READY, this.onMapReady_);
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
     * onLeaveComment event
     * @private
     */
    School.prototype.onLeaveComment_ = function() {
        this.showCommentModal_();
    };


    /**
     * onClick event
     * @private
     */
    School.prototype.onInaccuracyLinkClick_ = function() {
        this.modalInaccuracy_.show();
    };


    /**
     * onClick event
     * @private
     */
    School.prototype.onFeedbackLinkClick_ = function() {
        this.showCommentModal_();
    };


    /**
     * Sets EC analytics
     * @private
     */
    School.prototype.setEcAnalytics_ = function() {
        Analytics.viewProduct({
            'id': this.params_['id'],
            'name': this.params_['schoolName']
        });

        Analytics.setView();
    };


    /**
     * Sends pageview analytics
     * @private
     */
    School.prototype.sendAnalyticsPageview_ = function() {
        Analytics.send('pageview');
    };


    /**
     * show Modal for comments
     * @private
     */
    School.prototype.showCommentModal_ = function() {
        if (this.getUser_()) {
            this.modal_.show();
        } else {
            this.authSocial_.show();
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
            .initModalInaccuracy_()
            .initMap_()
            .initBouton_()
            .initComments_()
            .initComponents_(DataBlockFoldList, DataBlockFoldList.CssClass.ROOT)
            .initComponents_(DBlockRatings, DBlockRatings.CssClass.ROOT)
            .initComponents_(Search, Search.CssClass.ROOT)
            .initComponents_(Results, Results.CssClass.ROOT);
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
     * Map initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initMap_ = function() {
        var mapElement = this.getElementByClass(Map.CssClass.ROOT);
        this.map_ = new Map();
        this.addChild(this.map_);
        this.map_.decorate(mapElement);

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
     * Comments initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initComments_ = function() {
        this.comments_ = this.initComponent_(
            Comments, this.getElementByClass(Comments.CssClass.ROOT)
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
        this.addChild(this.modal_, true);

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
            rating: this.getElementByClass(
                sm.lSchool.School.CssClass.RATING
            ),
            inaccuracyLink: this.getElementByClass(
                sm.lSchool.School.CssClass.INACCURACY_LINK
            )
        };
    };


    /**
     * Load additional points to map
     * @private
     */
    School.prototype.onMapReady_ = function() {
        jQuery.ajax({
            url: '/api/school/searchMapPoints',
            dataType: 'json',
            type: 'GET'
        }).then(this.addMapPoints.bind(this));
    };


    /**
     * Add Points to map
     * @param {{
     *     schools: Array.<Object>
     * }} data
     */
    School.prototype.addMapPoints = function(data) {
        this.map_.addItems(data['schools']);
    };


    /**
     * @private
     * @return {boolean}
     */
    School.prototype.isCommented_ = function() {
        return JSON.parse(
                goog.dom.dataset.get(this.getElement(), 'params')
            ).isCommented;
    };


    /**
     * @private
     * @return {Object}
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


    /**
     * Initialization Data Block Features
     * @param {Element} element
     * @private
     */
    School.prototype.initDataBlockFeatures_ = function(element) {

        var bDataBlockFeatures = goog.dom.getElementByClass(
            sm.bDataBlock.DataBlockFeaturesView.CssClass.ROOT,
            element
        );
        this.dataBlockFeatures_ = factory.decorate(
            'data-block-features',
            bDataBlockFeatures,
            this
        );
    };
});  // goog.scope


/**
 * creates sm.lSchool.School instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(sm.lSchool.School.CssClass.ROOT),
        params = jQuery(root).data('params');

    if (root) {
        school = new sm.lSchool.School(params);
        school.decorate(root);
    }
});
