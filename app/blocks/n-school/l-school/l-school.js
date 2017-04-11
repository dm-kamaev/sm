/**
 * @fileoverview School information layout control
 */
goog.provide('sm.lSchool.School');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bDataBlock.DataBlockFeatures');
goog.require('sm.bMap.Map');
goog.require('sm.bPopularSchools.PopularSchools');
goog.require('sm.bScore.Score');
goog.require('sm.bSearch.Search');
goog.require('sm.bSmFooter.SmFooter');
goog.require('sm.bSmHeader.SmHeader');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.gAuthSocial.AuthSocialStendhal');
goog.require('sm.gAuthSocialModal.AuthSocialModalStendhal');
goog.require('sm.gButton.ButtonSocialStendhal');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.gModal.ModalFeedback');
goog.require('sm.gModal.ModalSideMenu');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iAuthorization.Authorization');
goog.require('sm.iCarrotquest.Carrotquest');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iMetrika.Metrika');
goog.require('sm.lSchool.bComment.Comment');
goog.require('sm.lSchool.bComments.Comments');
goog.require('sm.lSchool.bDataBlock.DataBlockFoldList');
goog.require('sm.lSchool.bDataBlock.DataBlockRatings');
goog.require('sm.lSchool.bFeedbackModal.FeedbackModal');
goog.require('sm.lSchool.bResults.Results');



/**
 * School page
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.School = function() {
    goog.base(this);


    /**
     * params
     * @type {{
     *     id: number,
     *     schoolName: string,
     *     isCommented: boolean
     * }}
     * @private
     */
    this.params_ = {};


    /**
     * Authorization init params
     * @type {sm.iAuthorization.Authorization.InitParams}
     * @private
     */
    this.authParams_ = {};


    /**
     * modal window
     * @type {?sm.lSchool.bFeedbackModal.FeedbackModal}
     * @private
     */
    this.modal_ = null;


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


    /**
     * Header instance
     * @type {sm.bSmHeader.SmHeader}
     * @private
     */
    this.header_ = null;


    /**
     * Subheader instance
     * @type {sm.bSmSubheader.SmSubheader}
     * @private
     */
    this.subHeader_ = null;


    /**
     * Footer instance
     * @type {sm.bSmFooter.SmFooter}
     * @private
     */
    this.footer_ = null;

    /**
     * Side menu instance
     * @type {sm.gModal.ModalSideMenu}
     * @private
     */
    this.sideMenu_ = null;
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
        Authorization = sm.iAuthorization.Authorization,
        Utils = cl.iUtils.Utils;

    var Analytics = sm.iAnalytics.Analytics.getInstance(),
        Factory = sm.iCloblFactory.FactoryStendhal.getInstance();


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

        var element = goog.soy.renderAsElement(
            sm.lSchool.Template.base,
            {
                params: this.params_
            },
            {
                factoryIndex: Factory.getIndex()
            }
        );
        this.decorateInternal(element);
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    School.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initParams_()
            .initAuthorization_()
            .initElements_(element)
            .initChildren_();
    };


    /**
     * Sets up the Component.
     */
    School.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.listenCommentButtons_();

        this.listenFeedbackLinks_();

        this.incrementViews_();
        this.sendAnalyticsPageview_();

        this.listenMap_();

        this.listenSubheader_();
    };


    /**
     * Get data params from dom element and place it to corresponding params
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initParams_ = function() {
        var dataParams = JSON.parse(
            goog.dom.dataset.get(this.getElement(), 'params')
        );

        this.authParams_ = {
            isUserAuthorized: dataParams['isUserAuthorized'],
            authSocialLinks: {
                fb: dataParams['authSocialLinks']['fb'],
                vk: dataParams['authSocialLinks']['vk']
            }
        };

        this.params_ = {
            id: dataParams['id'],
            schoolName: dataParams['schoolName'],
            isCommented: dataParams['isCommented']
        };

        return this;
    };


    /**
     * buttons to listen leaving comments
     * @private
     */
    School.prototype.listenCommentButtons_ = function() {
        var handler = this.getHandler();

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
    };


    /**
     * listen feedback links
     * @private
     */
    School.prototype.listenFeedbackLinks_ = function() {
        var handler = this.getHandler();

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
    };


    /**
     * listens map
     * @private
     */
    School.prototype.listenMap_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.map_,
            Map.Event.READY,
            this.onMapReady_
        );

        handler.listen(
            this.map_,
            Map.Event.ITEM_NAME_CLICK,
            this.onMapItemNameClick_
        );
    };


    /**
     * Init side menu listeners
     * @private
     */
    School.prototype.listenSubheader_ = function() {
        this.getHandler().listen(
                this.subHeader_,
                sm.bSmSubheader.SmSubheader.Event.HAMBURGER_MENU_CLICK,
                this.onHamburgerMenuClick_
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
     * Load additional points to map
     * @private
     */
    School.prototype.onMapReady_ = function() {
        jQuery.ajax({
            url: '/api/school/searchMapPointsLegacy',
            dataType: 'json',
            type: 'GET'
        }).then(this.addMapPoints.bind(this));
    };


    /**
     * go to school by clicking on name on map
     * @param {Object} event
     * @private
     */
    School.prototype.onMapItemNameClick_ = function(event) {
        var name = event['data']['name'],
            id = event['data']['id'];

        this.setEcAnalyticsClickMap_(id, name);
        this.sendDataAnalytics_('school map', 'schools click', name);
    };


    /**
     * Subheader hamburger icon click handler
     * @private
     */
    School.prototype.onHamburgerMenuClick_ = function() {
        this.sideMenu_.show();
    };


    /**
     * Sets EC analytics on click
     * @param {number} id
     * @param {string} name
     * @private
     */
    School.prototype.setEcAnalyticsClickMap_ = function(id, name) {
        Analytics.clickProduct(this.getDataEc_(id, name), 'School Map');
    };



    /**
     * Sends pageview analytics
     * @private
     */
    School.prototype.sendAnalyticsPageview_ = function() {
        Analytics.addImpression(this.getDataEc_());
        Analytics.send('pageview');
    };

    /**
     * Increment school views
     * @private
     */
    School.prototype.incrementViews_ = function() {
        var url = '/api/school/' + this.params_.id + '/views',
            data = {};
        data['_csrf'] = window['ctx']['csrf'];

        jQuery.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
    };


    /**
     * send data for Analytics
     * @param {string} eventCategory
     * @param {string} eventAction
     * @param {string=} opt_eventLabel
     * @private
     */
    School.prototype.sendDataAnalytics_ = function(
        eventCategory, eventAction, opt_eventLabel) {
        var dataAnalytics = {
            'hitType': 'event',
            'eventCategory': eventCategory,
            'eventAction': eventAction,
            'eventLabel': opt_eventLabel || this.params_.schoolName
        };

        Analytics.send(dataAnalytics);
    };


    /**
     * get data for ecommerce
     * @param {number=} opt_id
     * @param {string=} opt_name
     * @return {Object}
     * @private
     */
    School.prototype.getDataEc_ = function(opt_id, opt_name) {
        return {
            'id': opt_id || this.params_.id,
            'name': opt_name || this.params_.schoolName,
            'list': 'School Details'
        };
    };



    /**
     * show Modal for comments
     * @private
     */
    School.prototype.showCommentModal_ = function() {
        var authorization = Authorization.getInstance();

        authorization.isUserAuthorized() ?
            this.modal_.show() :
            authorization.authorize();
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
     * Return whether already place comment to school
     * @return {boolean}
     * @private
     */
    School.prototype.isCommented_ = function() {
        return this.params_.isCommented;
    };


    /**
     * Init authorization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initAuthorization_ = function() {
        var authorization = sm.iAuthorization.Authorization.getInstance();
        authorization.init(this.authParams_);
        return this;
    };


    /**
     * Init children instances
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initChildren_ = function() {
        this.initModal_()
            .initScore_()
            .initModalInaccuracy_()
            .initMap_()
            .initBouton_()
            .initComments_()
            .initPopularSchools_()
            .initDataBlockFeatures_()
            .initHeader_()
            .initSubHeader_()
            .initSideMenu_()
            .initFooter_()
            .initComponents_(DataBlockFoldList, DataBlockFoldList.CssClass.ROOT)
            .initComponents_(DBlockRatings, DBlockRatings.CssClass.ROOT)
            .initComponents_(Search, Search.CssClass.ROOT)
            .initComponents_(Results, Results.CssClass.ROOT);

        return this;
    };

    /**
     * Button initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initBouton_ = function() {
        if (!this.isCommented_()) {
            this.bouton_ = Factory.decorate(
                sm.gButton.ButtonStendhal.NAME,
                this.elements_.bouton,
                null,
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
     * Modal inaccuracy initialization
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initModalInaccuracy_ = function() {
        this.modalInaccuracy_ = Factory.decorate(
            sm.gModal.ModalFeedback.NAME,
            this.getElementByClass(sm.gModal.ViewFeedback.CssClass.ROOT),
            null,
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
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initElements_ = function() {
        this.elements_ = {
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

        return this;
    };


    /**
     * Initialization popular schools
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initPopularSchools_ = function() {
        var bPopularSchools = this.getElementByClass(
            sm.bPopularSchools.View.CssClass.ROOT
        );

        this.popularSchools_ = Factory.decorate(
            sm.bPopularSchools.PopularSchools.NAME,
            bPopularSchools,
            null,
            this
        );

        return this;
    };


    /**
     * Initialization Data Block Features
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initDataBlockFeatures_ = function() {
        var bDataBlockFeatures = this.getElementByClass(
            sm.bDataBlock.DataBlockFeaturesView.CssClass.ROOT
        );
        this.dataBlockFeatures_ = Factory.decorate(
            sm.bDataBlock.DataBlockFeatures.NAME,
            bDataBlockFeatures,
            null,
            this
        );
        return this;
    };


    /**
     * Init header
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initHeader_ = function() {
        var header = goog.dom.getElementByClass(
           sm.bSmHeader.View.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.subHeader_ = Factory.decorate(
            sm.bSmHeader.SmHeader.NAME,
            header,
            null,
            this
        );

        return this;
    };


    /**
     * Init sub header
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initSubHeader_ = function() {
        var subHeader = goog.dom.getElementByClass(
            sm.bSmSubheader.SmSubheader.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.subHeader_ = Factory.decorate(
            sm.bSmSubheader.SmSubheader.NAME,
            subHeader,
            null,
            this
        );

        return this;
    };


    /**
     * Init side menu
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initSideMenu_ = function() {
        var sideMenu = goog.dom.getElementByClass(
            sm.gModal.ViewSideMenu.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.sideMenu_ = Factory.decorate(
            sm.gModal.ModalSideMenu.NAME,
            sideMenu,
            null,
            this
        );

        return this;
    };


    /**
     * Init footer
     * @return {sm.lSchool.School}
     * @private
     */
    School.prototype.initFooter_ = function() {
        var footer = goog.dom.getElementByClass(
            sm.bSmFooter.View.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.footer_ = Factory.decorate(
            sm.bSmFooter.SmFooter.NAME,
            footer,
            null,
            this
        );

        return this;
    };
});  // goog.scope
