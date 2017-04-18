goog.provide('sm.bSearch.Search');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('gorod.gSuggest.Suggest');
goog.require('sm.bSearch.Template');
goog.require('sm.bSmStars.SmStars');
goog.require('sm.gIcon.IconSvg');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iAnimate.Animate');



/**
 * Input suggest component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bSearch.Search = function(opt_params) {
    goog.base(this);


    /**
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};


    /**
     * @private
     * @type {Object}
     */
    this.elements_ = {};


    /**
     * @private
     * @type {Object}
     */
    this.suggest_ = null;


    /**
     * @private
     * @type {{
     *     redirect: boolean,
     *     pageAlias: string
     * }}
     */
    this.dataParams_ = {};


    /**
     * @type {?number}
     * @private
     */
    this.areaId_ = null;


    /**
     * @type {?number}
     * @private
     */
    this.metroId_ = null;


    /**
     * @type {?number}
     * @private
     */
    this.districtId_ = null;


    /**
     * @type {?Array.<number>}
     * @private
     */
    this.coords_ = [];


    /**
     * @type {?string}
     * @private
     */
    this.text_ = null;


    /**
     * Current type
     * @type {?string}
     * @private
     */
    this.type_ = null;


    /**
     * Current mode
     * @type {Search.Mode|string}
     * @private
     */
    this.mode_ = sm.bSearch.Search.Mode.DEFAULT;
};
goog.inherits(sm.bSearch.Search, goog.ui.Component);


goog.scope(function() {
    var Search = sm.bSearch.Search,
        Suggest = gorod.gSuggest.Suggest,
        Utils = cl.iUtils.Utils,
        Analytics = sm.iAnalytics.Analytics.getInstance();


    /**
     * CSS-class enum
     * @enum {string}
     */
    Search.CssClass = {
        ROOT: 'b-search',
        LIST: 'b-search__list',
        CONTROL_SEARCH: 'b-search__control_search',
        CONTROL_CLEAR: 'b-search__control_clear',
        FADER: 'b-search__fader',
        SUGGEST_HOLDER: 'b-search__suggest-holder',
        SEARCH_MODE: 'b-search_mode_search',
        DEFAULT_MODE: 'b-search_mode_default',
        ANIMATION_ON: 'b-search_animation_on',
        ANIMATION_OFF: 'b-search_animation_off',
        FOLDABLE_TYPE: 'b-search_theme_foldable'
    };


    /**
     * Event enum
     * @enum {string}
     */
    Search.Event = {
        SUBMIT: 'submit',
        ITEM_SELECT: 'itemSelect',
        TEXT_CHANGE: 'textChange',
        DEFAULT_MODE_INITED: 'defaultModeInited',
        SEARCH_MODE_INITED: 'searchModeInited'
    };


    /**
     * Search modes
     * @enum {string}
     */
    Search.Mode = {
        DEFAULT: 'default',
        SEARCH: 'search'
    };


    /**
     * View types
     * @enum {string}
     */
    Search.Type = {
        FOLDABLE: 'foldable',
        DEFAULT: 'default'
    };


    /**
     * Search types
     * @enum {string}
     */
    Search.SearchType = {
        SCHOOLS: 'schools',
        COURSES: 'courses',
        PROGRAMS: 'programs',
        UNIVERSITIES: 'universities',
        AREAS: 'areas',
        METRO: 'metro',
        DISTRICTS: 'districts'
    };


    /**
     * @typedef {{
     *     areaId: ?number,
     *     metroId: ?number,
     *     districtId: ?number,
     *     text: ?string
     * }}
     */
    Search.Data;


    /**
     * @return {sm.bSearch.Search.Data}
     * @public
     */
    Search.prototype.getData = function() {
        return {
            'metroId': this.getMetroId(),
            'areaId': this.getAreaId(),
            'districtId': this.getDistrictId(),
            'text': this.getText()
        };
    };


    /**
     * @param {{
     *     areaId: ?number,
     *     metroId: ?number,
     *     districtId: ?number,
     *     coords: Array.<number>,
     *     text: ?string
     * }} data
     * @public
     */
    Search.prototype.setData = function(data) {

        if (data.hasOwnProperty('areaId')) {
            this.setAreaId(data['areaId']);
        }

        if (data.hasOwnProperty('metroId')) {
            this.setMetroId(data['metroId']);
        }

        if (data.hasOwnProperty('districtId')) {
            this.setDistrictId(data['districtId']);
        }

        if (data.hasOwnProperty('text')) {
            this.setText(data['text']);
        }

        this.setCoords(data['coords']);
    };


    /**
     * Resets data and suggest value
     * @public
     */
    Search.prototype.reset = function() {
        this.setData({
            'text': '',
            'metroId': null,
            'areaId': null,
            'districtId': null,
            'coords': null
        });
    };


    /**
     * @return {?number}
     * @public
     */
    Search.prototype.getMetroId = function() {
        return this.metroId_;
    };


    /**
     * @param {?number} metroId
     * @public
     */
    Search.prototype.setMetroId = function(metroId) {
        this.metroId_ = metroId;
    };


    /**
     * @return {?number}
     * @public
     */
    Search.prototype.getAreaId = function() {
        return this.areaId_;
    };


    /**
     * @param {?number} areaId
     * @public
     */
    Search.prototype.setAreaId = function(areaId) {
        this.areaId_ = areaId;
    };


    /**
     * @return {?number}
     * @public
     */
    Search.prototype.getDistrictId = function() {
        return this.districtId_;
    };


    /**
     * @param {?number} districtId
     * @public
     */
    Search.prototype.setDistrictId = function(districtId) {
        this.districtId_ = districtId;
    };


    /**
     * @return {Array.<number>}
     * @public
     */
    Search.prototype.getCoords = function() {
        return this.coords_;
    };


    /**
     * set coordinates metro or area
     * @param {Array.<number>} coords
     * @public
     */
    Search.prototype.setCoords = function(coords) {
        this.coords_ = coords;
    };


    /**
     * @return {?string}
     * @public
     */
    Search.prototype.getText = function() {
        return this.suggest_.getText();
    };


    /**
     * Sets input value
     * @param {string} value
     * @public
     */
    Search.prototype.setText = function(value) {
        this.suggest_.setText(value);
        this.suggest_.setValue(value);
    };


    /**
     * Make search
     * @public
     */
    Search.prototype.search = function() {
        if (this.dataParams_['redirect']) {
            this.searchRequest_(this.getText());
        } else {
            this.dispatchEvent({
                'type': Search.Event.SUBMIT,
                'data': this.getData()
            });
        }
    };


    /**
     * Switch to search mode
     * @public
     */
    Search.prototype.switchToSearchMode = function() {
        goog.dom.classlist.add(
            this.getElement(),
            Search.CssClass.SEARCH_MODE
        );
        goog.dom.classlist.remove(
            this.getElement(),
            Search.CssClass.DEFAULT_MODE
        );

        this.suggest_.focus();
        this.disableScroll_();
    };


    /**
     * Switch to default mode
     * @public
     */
    Search.prototype.switchToDefaultMode = function() {
        goog.dom.classlist.remove(
            this.getElement(),
            Search.CssClass.SEARCH_MODE
        );
        goog.dom.classlist.add(
            this.getElement(),
            Search.CssClass.DEFAULT_MODE
        );

        this.enableScroll_();
    };


    /**
     * Disables scroll
     * @private
     */
    Search.prototype.disableScroll_ = function() {
        document.ontouchmove = function(event) {
            event.preventDefault();
        };

        goog.dom.classlist.add(
            document.documentElement,
            Utils.CssClass.OVERFLOW_HIDDEN
        );
    };


    /**
     * Enables scroll
     * @private
     */
    Search.prototype.enableScroll_ = function() {
        document.ontouchmove = function() {
            return true;
        };

        goog.dom.classlist.remove(
            document.documentElement,
            Utils.CssClass.OVERFLOW_HIDDEN
        );
    };


    /**
     * Set header mode
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     */
    Search.prototype.setMode = function(mode) {
        var res = (this.isCorrectMode_(mode) && !this.isCurrentMode_(mode));

        if (res) {
            this.mode_ = mode;
            this.switchMode_(mode);
        }

        return res;
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    Search.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.detectType_();
        this.detectAnimationSupportion_();
        this.initElements_(element);
    };


    /**
     * Set up the Component.
     */
    Search.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initParams_();
        this.initSuggest_();

        this.initSuggestListeners_();
        this.initElementsListeners_();

        var that = this;

        this.suggest_.setCallbacks({
            getData: function(data) {
                var res = [],
                    items;

                var types = goog.object.getValues(Search.SearchType);

                for (var i = 0, type; type = types[i]; i++) {
                    items = data[type] || [];

                    for (var j = 0, item; item = items[j]; j++) {
                        item['type'] = type;
                    }

                    if (that.isEntityType_(type)) {

                        items = items.sort(function(entity1, entity2) {
                            var res = 0,
                                matches1 = entity1.name.match(/№(\d+)/),
                                matches2 = entity2.name.match(/№(\d+)/),
                                num1 = matches1 && matches1[1] || 1000000,
                                num2 = matches2 && matches2[1] || 1000000;

                            if (num1 || num2) {
                                res = num1 - num2;
                            }
                            else {
                                res = (entity1.name > entity2.name) ? 1 : -1;
                            }

                            return res;
                        });
                    }
                    res = res.concat(items);
                }

                res = res.slice(0, 10);

                that.sendItemImpressions_(res);
                return res;
            },

            search: function(elem) {
                var name = elem.name +
                    (elem.fullName ? ' ' + elem.fullName : '') +
                    (elem.abbreviation ? ' ' + elem.abbreviation : '');

                return name;
            },

            renderItem: this.renderItem_.bind(this),

            select: function(item) {
                return {
                    text: item['name'],
                    value: item['id'],
                    coords: item['coords']
                };
            }
        });
    };


    /**
     * Clean up the Component.
     */
    Search.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        this.suggest_.removeEventListener(
            gorod.gSuggest.Suggest.Events.SELECT,
            this.itemClickHandler_.bind(this)
        );

        this.suggest_.removeEventListener(
            gorod.gSuggest.Suggest.Events.SUBMIT,
            this.onSubmit_.bind(this)
        );

        this.suggest_.removeEventListener(
            gorod.gSuggest.Suggest.Events.TEXT_CHANGE,
            this.onTextChange_.bind(this)
        );
    };


    /**
     * Init suggest listeners
     * @private
     */
    Search.prototype.initSuggestListeners_ = function() {
        this.suggest_.addEventListener(
            gorod.gSuggest.Suggest.Events.SELECT,
            this.itemClickHandler_.bind(this)
        );

        this.suggest_.addEventListener(
            gorod.gSuggest.Suggest.Events.SUBMIT,
            this.onSubmit_.bind(this)
        );

        this.suggest_.addEventListener(
            gorod.gSuggest.Suggest.Events.TEXT_CHANGE,
            this.onTextChange_.bind(this)
        );

        if (this.type_ === Search.Type.FOLDABLE) {
            this.suggest_.addEventListener(
                gorod.gSuggest.Suggest.Events.LIST_SHOW,
                this.onListShow_.bind(this)
            );

            this.suggest_.addEventListener(
                gorod.gSuggest.Suggest.Events.LIST_HIDE,
                this.onListHide_.bind(this)
            );
        }
    };


    /**
     * Init elements listeners
     * @private
     */
    Search.prototype.initElementsListeners_ = function() {
        var handler = this.getHandler();

        if (this.type_ === Search.Type.FOLDABLE) {
            handler.listen(
                this.elements_.searchButton,
                goog.events.EventType.CLICK,
                this.onSearchClick_
            ).listen(
                this.elements_.clearButton,
                goog.events.EventType.CLICK,
                this.onClearClick_
            ).listen(
                this.elements_.fader,
                goog.events.EventType.CLICK,
                this.onClearClick_
            ).listen(
                this.elements_.suggestHolder,
                goog.events.EventType.ANIMATIONEND,
                this.onSwitchModeAnimationEnd_
            );
        } else if (this.elements_.searchButton) {
            handler.listen(
                this.elements_.searchButton,
                goog.events.EventType.CLICK,
                this.onSubmit_
            );
        }
    };


    /**
     * Send impressions of got items
     * @param {Array.<Object>} items
     * @private
     */
    Search.prototype.sendItemImpressions_ = function(items) {
        items.forEach(function(item, i) {
            Analytics.addImpression({
                'id': item['id'],
                'name': item['name'],
                'position': i + 1,
                'list': 'Suggest'
            });
        });
        Analytics.setView();
        Analytics.sendEvent('Suggest', 'search', 0);
    };


    /**
     * Render suggest item
     * @param {Object} item - Entity or metro or area or district item
     * @param {string} str - Search str
     * @return {string}
     * @private
     */
    Search.prototype.renderItem_ = function(item, str) {
        var res = '';
        str = str || '';

        var name = this.renderItemName_(item, str);
        if (name) {
            res = sm.bSearch.Template.item({
                params: {
                    type: item['type'],
                    name: name,
                    areas: this.renderItemAreas_(item),
                    totalScore: item['totalScore']
                }
            });
        }

        return res;
    };


    /**
     * Render suggest item name
     * @param {Object} item - Entity or metro or area or district item
     * @param {string} str - Search string
     * @return {string}
     * @private
     */
    Search.prototype.renderItemName_ = function(item, str) {
        var res = '',
            searchString = str.replace(/ё/g, 'е'),
            name = item['name'].replace(/ё/g, 'е'),
            fullName = item['fullName'] && item['fullName'].replace(/ё/g, 'е'),
            abbreviation = item['abbreviation'] &&
                item['abbreviation'].replace(/ё/g, 'е');

        if (Suggest.findEntry(name, searchString)) {
            res = item['name'];
        } else if (Suggest.findEntry(fullName, searchString)) {
            res = item['fullName'];
        } else if (Suggest.findEntry(abbreviation, searchString)) {
            res = item['abbreviation'];
        }

        return res;
    };


    /**
     * Render suggest item areas
     * @param {Object} item - Entity or metro or area item
     * @return {string}
     * @private
     */
    Search.prototype.renderItemAreas_ = function(item) {
        var addresses = item['addresses'] || [],
            areas = addresses
                .map(function(address) {
                    return address['area']['name'];
                })
                .filter(function(area, index, areas) {
                    return areas.indexOf(area) == index;
                });

        return areas.join(', ');
    };


    /**
     * gets DOM elements
     * @param {Element} root
     * @private
     */
    Search.prototype.initElements_ = function(root) {
        this.elements_ = {
            root: goog.dom.getElementByClass(
                Search.CssClass.ROOT,
                root
            ),
            suggest: goog.dom.getElementByClass(
                gorod.gSuggest.Suggest.Css.ROOT,
                root
            ),
            searchButton: goog.dom.getElementByClass(
                Search.CssClass.CONTROL_SEARCH,
                root
            ),
            clearButton: goog.dom.getElementByClass(
                Search.CssClass.CONTROL_CLEAR,
                root
            ),
            fader: goog.dom.getElementByClass(
                Search.CssClass.FADER,
                root
            ),
            suggestHolder: goog.dom.getElementByClass(
                Search.CssClass.SUGGEST_HOLDER,
                root
            )
        };
    };


    /**
     * On list show
     * @private
     */
    Search.prototype.onListShow_ = function() {
        this.enableScroll_();
    };


    /**
     * On list hide
     * @private
     */
    Search.prototype.onListHide_ = function() {
        goog.dom.getWindow().scrollTo(0, 0);

        this.disableScroll_();
    };


    /**
     * Search button click handler
     * @private
     */
    Search.prototype.onSearchClick_ = function() {
        this.dispatchEvent({
            'type': Search.Event.SEARCH_MODE_INITED
        });
        this.setMode(Search.Mode.SEARCH);
    };


    /**
     * Search button click handler
     * @private
     */
    Search.prototype.onClearClick_ = function() {
        this.dispatchEvent({
            'type': Search.Event.DEFAULT_MODE_INITED
        });
        this.reset();
        this.setMode(Search.Mode.DEFAULT);
    };


    /**
     * Switch mode animation end handler
     * @private
     */
    Search.prototype.onSwitchModeAnimationEnd_ = function() {
        if (this.mode_ == Search.Mode.SEARCH) {
            this.suggest_.focus();
        }
    };


    /**
     * Type is entity type
     * @param {string} type
     * @return {boolean}
     */
    Search.prototype.isEntityType_ = function(type) {
        return type == Search.SearchType.SCHOOLS ||
            type == Search.SearchType.COURSES ||
            type == Search.SearchType.PROGRAMS ||
            type == Search.SearchType.UNIVERSITIES;
    };


    /**
     * Switch mode of view
     * @param {sm.bHeader.Header.Mode} mode
     * @private
     */
    Search.prototype.switchMode_ = function(mode) {
        switch (mode) {
        case Search.Mode.DEFAULT:
            this.switchToDefaultMode();
            break;

        case Search.Mode.SEARCH:
            this.switchToSearchMode();
            break;
        }
    };


    /**
     * Is mode correct
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     * @private
     */
    Search.prototype.isCorrectMode_ = function(mode) {
        return mode == Search.Mode.DEFAULT ||
            mode == Search.Mode.SEARCH;
    };


    /**
     * Is mode already selected
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     * @private
     */
    Search.prototype.isCurrentMode_ = function(mode) {
        return this.mode_ == mode;
    };


    /**
     * Redirect handler
     * @private
     * @param {Object} event
     * @param {Object} data
     */
    Search.prototype.itemClickHandler_ = function(event, data) {
        if (data['item']['type'] === Search.SearchType.SCHOOLS) {
            this.sendEcAnalytics_(data);
        }
        this.sendAnalyticsSchoolData_(data);

        this.redirect_(event, data);
    };


    /**
     * Redirect
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    Search.prototype.redirect_ = function(event, data) {
        this.setText(data['item']['name']);
        this.suggest_.blur();

        var itemType = data['item']['type'];

        if (this.isEntityType_(itemType)) {

            var pageUrl = (itemType == Search.SearchType.SCHOOLS) ?
                '/' + this.dataParams_['pageAlias'] : '';

            document.location.href = pageUrl + '/' + data['item']['alias'];

        } else if (this.dataParams_.redirect) {
            this.onNotEntitySelect_(event, data);
        } else {
            this.processItem_(data['item']);
            this.dispatchEvent({
                'type': Search.Event.ITEM_SELECT,
                'data': this.getData()
            });
        }
    };


    /**
     * Take values from selected item and put it to value
     * @param {Object} item - school or metro or area or district item
     * @private
     */
    Search.prototype.processItem_ = function(item) {
        var type = item['type'];

        var data = {
            'metroId': null,
            'areaId': null,
            'districtId': null,
            'coords': item['coords'],
            'text': item['name']
        };

        if (type == 'metro') {
            data['metroId'] = item['id'];
        }
        else if (type == 'areas') {
            data['areaId'] = item['id'];
        }
        else if (type == 'districts') {
            data['districtId'] = item['id'];
        }
        this.setData(data);
    };


    /**
     * Send the name of the selected schools Analytics
     * @param {Object} data
     * @private
     */
    Search.prototype.sendAnalyticsSchoolData_ = function(data) {
        var dataAnalytics = {
            'hitType': 'event',
            'eventCategory': 'suggest',
            'eventAction': 'suggest click',
            'eventLabel': data['item']['name']
        };

        Analytics.send(dataAnalytics);
    };


    /**
     * Send the name of the selected schools Analytics
     * @param {Object} data
     * @private
     */
    Search.prototype.sendEcAnalytics_ = function(data) {
        var ecData = {
            'id': data['key'],
            'name': data['text'],
            'position': data['index'] + 1
        };

        Analytics.clickProduct(ecData, 'Suggest');
    };


    /**
     * Redirect handler
     * @private
     * @param {Object} event
     */
    Search.prototype.onSubmit_ = function(event) {
        this.search();
    };


    /**
     * Search redirect
     * @param {string} searchString
     * @private
     */
    Search.prototype.searchRequest_ = function(searchString) {
        var url = '/' + this.dataParams_['pageAlias'];
        if (searchString) {
            url += '?name=' + encodeURIComponent(searchString);
        }
        document.location.href = url;
    };


    /**
     * Handler for input data
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    Search.prototype.onTextChange_ = function(event, data) {
        this.setData({
            'metroId': null,
            'areaId': null,
            'districtId': null
        });
        this.dispatchEvent(Search.Event.TEXT_CHANGE);
    };


    /**
     * Area/metro redirect handler
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    Search.prototype.onNotEntitySelect_ = function(event, data) {
        var url = '/' + this.dataParams_['pageAlias'] +
            '?name=' + encodeURIComponent(data['text']);

        if (data['item']['type'] === 'metro') {
            url += '&metroId=' + data['item']['id'];
        } else if (data['item']['type'] === 'areas') {
            url += '&areaId=' + data['item']['id'];
        } else if (data['item']['type'] === 'districts') {
            url += '&districtId=' + data['item']['id'];
        }
        document.location.href = url;
    };


    /**
     * Turn on animation if it is supported
     * @private
     */
    Search.prototype.detectAnimationSupportion_ = function() {
        var animationSupportClass = sm.iAnimate.Animate.isSupported() ?
            Search.CssClass.ANIMATION_ON :
            Search.CssClass.ANIMATION_OFF;

        goog.dom.classlist.add(
            this.getElement(),
            animationSupportClass
        );
    };


    /**
     * Detect current type
     * @private
     */
    Search.prototype.detectType_ = function() {
        var isFodableType = goog.dom.classlist.contains(
            this.getElement(),
            Search.CssClass.FOLDABLE_TYPE
        );

        if (isFodableType) {
            this.type_ = Search.Type.FOLDABLE;
        } else {
            this.type_ = Search.Type.DEFAULT;
        }
    };


    /**
     * Init params
     * @private
     */
    Search.prototype.initParams_ = function() {
        this.dataParams_ = JSON.parse(
            this.getElement().getAttribute('data-params')
        );
    };


    /**
     * Init suggest
     * @private
     */
    Search.prototype.initSuggest_ = function() {
        var ui = gorod.iUIInstanceStorage.UIInstanceStorage.getInstance();
        this.suggest_ = ui.getInstanceByElement(this.elements_.suggest);
    };
});  // goog.scope
