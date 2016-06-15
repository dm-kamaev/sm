goog.provide('sm.bSchoolListItem.SchoolListItem');

goog.require('cl.iFactory.FactoryManager');
goog.require('goog.dom.dataset');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('sm.bBadge.Badge');
goog.require('sm.bFavoriteLink.FavoriteLink');
goog.require('sm.bRating.Rating');
goog.require('sm.bSchoolListItem.Event.FavoriteRemoved');
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
     * @type {sm.bSchoolListItem.SchoolListItem.Params}
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
    this.alias_ = this.params_.alias;


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
        FavoriteLink = sm.bFavoriteLink.FavoriteLink;

    var Event = sm.bSchoolListItem.Event;

    var analytics = sm.iAnalytics.Analytics.getInstance();


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
     * Event enum
     * @enum {string}
     */
    ListItem.Event = {
        FAVORITE_ADDED: FavoriteLink.Event.FAVORITE_ADDED,
        FAVORITE_REMOVED: Event.FavoriteRemoved.Type
    };


    /**
     * @typedef {{
     *     id: number,
     *     name: {
     *         light: ?string,
     *         bold: ?string
     *     },
     *     alias: string,
     *     description: ?string,
     *     score: {
     *         data: {
     *             visibleMark: {
     *                 name: string,
     *                 value: number
     *             },
     *             hiddenMarks: Array<{
     *                 name: string,
     *                 value: number
     *             }>
     *         }
     *     },
     *     metroStations: Array<{
     *         id: number,
     *         name: string
     *     }>,
     *     area: {
     *         id: number,
     *         name: string
     *     },
     *     ratings: ?Array<string>,
     *     position: ?number,
     *     theme: ?string,
     *     isNotClickable: ?boolean,
     *     isFavorite: ?boolean
     * }}
     */
    sm.bSchoolListItem.SchoolListItem.Params;


    /**
     * Transform given non-compressed params to compressed
     * @param {Object} params
     * @return {sm.bSchoolListItem.SchoolListItem.Params}
     */
    ListItem.transformParams = function(params) {
        var score = params['score'];
        return {
            id: params['id'],
            name: {
                light: params['name']['light'] || null,
                bold: params['name']['bold'] || null
            },
            alias: params['alias'],
            description: params['description'] || null,
            score: {
                data: {
                    visibleMark: {
                        name: score['data']['visibleMark']['name'] || null,
                        value: score['data']['visibleMark']['value'] || null
                    },
                    hiddenMarks:
                        score['data']['hiddenMarks'].map(
                            function(hiddenMark) {
                                return {
                                    name: hiddenMark['name'],
                                    value: hiddenMark['value']
                                };
                            }
                        )
                }
            },
            metroStations: params['metroStations'].map(
                function(metroStation) {
                    return {
                        id: metroStation['id'],
                        name: metroStation['name']
                    };
                }
            ),
            area: {
                id: params['area']['id'] || null,
                name: params['area']['name'] || null
            },
            ratings: params['ratings'] || null,
            position: params['position'] || null,
            theme: params['theme'] || null,
            isNotClickable: params['isNotClickable'] || null,
            isFavorite: params['isFavorite'] || null
        };
    };


    /**
     * Returns item id
     * @return {number}
     */
    ListItem.prototype.getSchoolId = function() {
        return this.schoolId_;
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
     * Return current render params
     * @return {Object}
     */
    ListItem.prototype.getParams = function() {
        return this.params_;
    };


    /**
     * @override
     */
    ListItem.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.bSchoolListItem.Template.base,
            {
                params: {
                    id: this.params_.id,
                    name: {
                        light: this.params_.name.light,
                        bold: this.params_.name.bold
                    },
                    alias: this.params_.alias,
                    description: this.params_.description,
                    score: {
                        data: {
                            visibleMark: {
                                name: this.params_.score.data.visibleMark.name,
                                value: this.params_.score.data.visibleMark.value
                            },
                            hiddenMarks:
                                this.params_.score.data.hiddenMarks.map(
                                    function(hiddenMark) {
                                        return {
                                            name: hiddenMark.name,
                                            value: hiddenMark.value
                                        };
                                    }
                                )
                        }
                    },
                    metroStations: this.params_.metroStations.map(
                        function(metroStation) {
                            return {
                                id: metroStation.id,
                                name: metroStation.name
                            };
                        }
                    ),
                    area: {
                        id: this.params_.area.id,
                        name: this.params_.area.name
                    },
                    ratings: this.params_.ratings,
                    position: this.params_.position,
                    theme: this.params_.theme,
                    isNotClickable: this.params_.isNotClickable,
                    isFavorite: this.params_.isFavorite
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
                sm.bFavoriteLink.FavoriteLink.Event.SET_FAVORITE_STATE,
                this.onAddFavoriteClick_
            ).listen(
                this.favoriteLink_,
                sm.bFavoriteLink.FavoriteLink.Event.SET_NOT_FAVORITE_STATE,
                this.onRemoveFavoriteClick_
            );
        }
    };


    /**
     * Remove Favorite Click
     * @private
     */
    ListItem.prototype.onRemoveFavoriteClick_ = function() {
        var event = new Event.FavoriteRemoved(this.schoolId_, this);
        this.dispatchEvent(event);

        this.setEcAnalyticsRemove_();
        this.sendDataAnalytics_('favourite', 'delete');
        this.sendRemoveFromFavorites_();
    };


    /**
     * Add Favorite Click
     * @private
     */
    ListItem.prototype.onAddFavoriteClick_ = function() {
        this.setEcAnalyticsAdd_();
        this.sendDataAnalytics_('favourite', 'add');
        this.sendAddToFavorites_();
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
     * get params from Dom and add params in field if params field not filled
     * @private
     */
    ListItem.prototype.initParams_ = function() {

        if (goog.object.isEmpty(this.params_)) {
            var dataParams = JSON.parse(
                this.getElement().getAttribute('data-params')
            );
            this.params_ = ListItem.transformParams(dataParams);

            this.schoolId_ = this.params_.id;
            this.alias_ = this.params_.alias;
            this.name_ = this.params_.name.light + this.params_.name.bold;
        }
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
        analytics.clickProduct(this.getDataEc_(), 'Search Results');
    };


    /**
     * Sets EC analytics to add school from favorites
     * @private
     */
    ListItem.prototype.setEcAnalyticsAdd_ = function() {
        analytics.addProduct(this.getDataEc_(), 'Search Results');
    };


    /**
     * Sets EC analytics to remove school from favorites
     * @private
     */
    ListItem.prototype.setEcAnalyticsRemove_ = function() {
        analytics.removeProduct(this.getDataEc_(), 'Search Results');
    };

    /**
     * Send data about adding to favorites
     * @private
     */
    ListItem.prototype.sendAddToFavorites_ = function() {
        this.favoriteLink_.sendData(this.getSchoolId(), 'add');
    };


    /**
     * Send data about removing from favorites
     * @private
     */
    ListItem.prototype.sendRemoveFromFavorites_ = function() {
        this.favoriteLink_.sendData(this.getSchoolId(), 'remove');
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

        var analytics = sm.iAnalytics.Analytics.getInstance();
        analytics.send(dataAnalytics);
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
