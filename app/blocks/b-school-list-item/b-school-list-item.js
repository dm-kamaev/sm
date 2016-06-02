goog.provide('sm.bSchoolListItem.SchoolListItem');

goog.require('cl.iFactory.FactoryManager');
goog.require('goog.dom.dataset');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('sm.bBadge.Badge');
goog.require('sm.bFavoriteLink.FavoriteLink');
goog.require('sm.bRating.Rating');
goog.require('sm.bScore.ScoreMinimized');



/**
 * School list item component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bSchoolListItem.SchoolListItem = function(opt_params) {
    goog.base(this);


    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};


    /**
     *  @private
     *  @type {number}
     */
    this.schoolId_ = this.params_.id;


    /**
     * @private
     * @type {string}
     */
    this.url_ = this.params_.url;


    /**
     * @private
     * @type {string}
     */
    this.name_ = this.params_.name;


    /**
     * scoreInstance
     * @private
     * @type {sm.bScore.ScoreMinimized}
     */
    this.scoreInstance_ = null;


    /**
     * DOM elements
     * @type {Object}
     * @private
     */
    this.elements_ = {};


    /**
     * Defines clickable school item or not
     * @type {boolean}
     * @private
     */
    this.isActive_ = false;


    /**
     * Favorite Link Instance
     * @type {sm.bFavoriteLink.FavoriteLink}
     * @private
     */
    this.favoriteLink_ = null;
};
goog.inherits(sm.bSchoolListItem.SchoolListItem,
    goog.ui.Component);


goog.scope(function() {
    var ListItem = sm.bSchoolListItem.SchoolListItem,
        ScoreMinimized = sm.bScore.ScoreMinimized,
        Badge = sm.bBadge.Badge,
        FactoryManager = cl.iFactory.FactoryManager,
        Analytics = sm.iAnalytics.Analytics.getInstance();


    /**
     *  Css class enum
     *  @enum {string}
     */
    ListItem.CssClass = {
        ROOT: 'b-school-list-item',
        LINK_NAME: 'b-school-list-item__name_bold',
        SECTION_BADGES: 'b-school-list-item__section_badges',
        ACTIVE_STATE: 'b-school-list-item_active'
    };


    /**
     * Returns item id
     * @return {number}
     */
    ListItem.prototype.getSchoolId = function() {
        return this.schoolId_;
    };


    /**
     * Compare by id ascending
     * @param {sm.bSchoolListItem.SchoolListItem} item
     * @return {number}
     */
    ListItem.prototype.compareById = function(item) {
        return this.getSchoolId() - item.getSchoolId();
    };


    /**
     * @return {Object}
     */
    ListItem.prototype.getImpressionData = function() {
        return {
            id: this.schoolId_,
            name: this.name_,
            position: this.params_.position,
            list: 'Search Results'
        };
    };


    /**
     * @override
     */
    ListItem.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var params = this.params_,
            score = params['score'];

        var element = goog.soy.renderAsElement(
            sm.bSchoolListItem.Template.base,
            {
                params: {
                    id: params['id'],
                    fullName: params['fullName'],
                    description: params['description'],
                    url: params['url'],
                    name: {
                        bold: params['name']['bold'],
                        light: params['name']['light']
                    },
                    score: {
                        data: {
                            visibleMark: {
                                name: score['data']['visibleMark']['name'],
                                value: score['data']['visibleMark']['value']
                            },
                            hiddenMarks: score['data']['hiddenMarks'].map(
                                function(hiddenMark) {
                                    return {
                                        name: hiddenMark['name'],
                                        value: hiddenMark['value']
                                    };
                                }
                            )
                        },
                        config: {
                            isActive: score['config']['isActive']
                        }
                    },
                    totalScore: params['totalScore'],
                    ratings: params['ratings'],
                    metroStations: params['metroStations'].map(
                        function(metro) {
                            return {
                                'id': metro['id'],
                                'name': metro['name']
                            };
                        }
                    ),
                    addresses: params['addresses'].map(function(address) {
                        return {
                            area: {
                                id: address['area']['id'],
                                name: address['area']['name']
                            },
                            coords: address['coords'],
                            departments: address['departments'].map(
                                function(department) {
                                    return {
                                        score: department['score']
                                    };
                                }
                            ),
                            id: address['id'],
                            metroStations: address['metroStations'].map(
                                function(metro) {
                                    return {
                                        id: metro['id'],
                                        name: metro['name']
                                    };
                                }
                            ),
                            name: address['name']
                        };
                    }),
                    area: {
                        id: params['area']['id'],
                        name: params['area']['name']
                    }
                }
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    ListItem.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initParams_();
        this.initState_();

        var scoreElement = this.getElementByClass(
            ScoreMinimized.CssClass.ROOT
        );
        this.scoreInstance_ = new ScoreMinimized();
        this.addChild(this.scoreInstance_);
        this.scoreInstance_.decorate(scoreElement);

        this.elements_.sectionBadges = this.getElementByClass(
            ListItem.CssClass.SECTION_BADGES
        );

        var badgeElements = this.getElementsByClass(
            Badge.CssClass.ROOT
        );

        if (badgeElements) {
            for (var i = 0, instance; i < badgeElements.length; i++) {
                instance = new Badge();
                this.addChild(instance);
                instance.decorate(badgeElements[i]);
            }
        }

        this.initFavoriteLink_(element);
    };

    /**
     * Set up the Component.
     * @public
     */
    ListItem.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var handler = this.getHandler();

        if (this.isActive_) {
            if (this.elements_.sectionBadges) {
                handler.listen(
                    this.elements_.sectionBadges,
                    goog.events.EventType.CLICK,
                    this.onSectionBadgesClick_
                );
            }

            handler.listen(
                this.getElement(),
                goog.events.EventType.CLICK,
                this.onClickListItem_
            );

            handler.listen(
                this.favoriteLink_,
                sm.bFavoriteLink.FavoriteLink.Event.FAVORITE_ADDED,
                this.onAddFavoriteClick_
            );

            handler.listen(
                this.favoriteLink_,
                sm.bFavoriteLink.FavoriteLink.Event.FAVORITE_REMOVED,
                this.onRemoveFavoriteClick_
            );
        }
    };


    /**
     * Remove Favorite Click
     * @private
     */
    ListItem.prototype.onRemoveFavoriteClick_ = function() {
        this.setEcAnalyticsRemove_();
        this.sendDataAnalytics_('favourite', 'delete');
    };


    /**
     * Add Favorite Click
     * @private
     */
    ListItem.prototype.onAddFavoriteClick_ = function() {
        this.setEcAnalyticsAdd_();
        this.sendDataAnalytics_('favourite', 'add');
    };


    /**
     * @param {Object} event
     * @private
     */
    ListItem.prototype.onClickListItem_ = function(event) {
        if (!event.defaultPrevented) {
            this.setEcAnalyticsClick_();
            this.sendDataAnalytics_('search', 'results click');
        }
    };


    /**
     * On section badges click
     * @param {Object} event
     * @private
     */
    ListItem.prototype.onSectionBadgesClick_ = function(event) {
        event.preventDefault();
    };


    /**
     * get params from Dom and add params in field
     * @private
     */
    ListItem.prototype.initParams_ = function() {
        this.params_ = JSON.parse(
            this.getElement().getAttribute('data-params')
        );

        this.schoolId_ = this.params_.id;
        this.url_ = this.params_.url;
        this.name_ = this.params_.name['light'] + this.params_.name['bold'];
    };


    /**
     * Detect whether control active
     * @private
     */
    ListItem.prototype.initState_ = function() {
        this.isActive_ = goog.dom.classlist.contains(
            this.getElement(),
            ListItem.CssClass.ACTIVE_STATE
        );
    };


    /**
     * Initialization Favorite Link
     * @param {Element} element
     * @private
     */
    ListItem.prototype.initFavoriteLink_ = function(element) {
        var favoriteLink = goog.dom.getElementByClass(
            sm.bFavoriteLink.View.CssClass.ROOT,
            element
        );

        this.favoriteLink_ = FactoryManager.getInstance().decorate(
            'stendhal',
            'favorite-link',
            favoriteLink,
            this
        );
    };


    /**
     * Sets EC analytics to click on the school
     * @private
     */
    ListItem.prototype.setEcAnalyticsClick_ = function() {
        Analytics.clickProduct(this.getDataEc_(), 'Search Results');
    };


    /**
     * Sets EC analytics to add school from favorites
     * @private
     */
    ListItem.prototype.setEcAnalyticsAdd_ = function() {
        Analytics.addProduct(this.getDataEc_(), 'Search Results');
    };


    /**
     * Sets EC analytics to remove school from favorites
     * @private
     */
    ListItem.prototype.setEcAnalyticsRemove_ = function() {
        Analytics.removeProduct(this.getDataEc_(), 'Search Results');
    };


    /**
     * send data for Analytics
     * @param {string} eventCategory
     * @param {string} eventAction
     * @private
     */
    ListItem.prototype.sendDataAnalytics_ = function(
        eventCategory, eventAction) {

        var dataAnalytics = {
            'hitType': 'event',
            'eventCategory': eventCategory,
            'eventAction': eventAction,
            'eventLabel': this.name_
        };

        Analytics.send(dataAnalytics);
    };


    /**
     * get data for ecommerce
     * @return {Object}
     * @private
     */
    ListItem.prototype.getDataEc_ = function() {
        return {
            'id': this.params_['id'],
            'name': this.name_,
            'position': this.params_['position']
        };
    };
});  // goog.scope
