goog.provide('sm.bSearch.Search');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('gorod.gSuggest.Suggest');
goog.require('sm.bSearch.Template');
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
     * @type {object}
     */
    this.params_ = opt_params || {};

    /**
     * @private
     * @type {object}
     */
    this.elements_ = {};

    /**
     * @private
     * @type {object}
     */
    this.suggest_ = null;

    /**
     * @private
     * @type {?object}
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
     * @return {{
     *     areaId: ?number,
     *     metroId: ?number,
     *     text: ?string
     * }}
     * @public
     */
    Search.prototype.getData = function() {
        return {
            metroId: this.getMetroId(),
            areaId: this.getAreaId(),
            text: this.getText()
        };
    };

    /**
     * @param {{
     *     areaId: ?number,
     *     metroId: ?number,
     *     coords: Array.<number>,
     *     text: ?string
     * }} data
     * @public
     */
    Search.prototype.setData = function(data) {

        if (data.hasOwnProperty('areaId')) {
            this.setAreaId(data.areaId);
        }

        if (data.hasOwnProperty('metroId')) {
            this.setMetroId(data.metroId);
        }

        if (data.hasOwnProperty('text')) {
            this.setText(data.text);
        }

        this.setCoords(data.coords);
    };

    /**
     * Resets data and suggest value
     * @public
     */
    Search.prototype.reset = function() {
        this.setData({
            text: '',
            metroId: null,
            areaId: null,
            coords: null
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
     * Switch to search mode
     * @public
     */
    Search.prototype.switchToSearchMode = function() {
        goog.dom.classes.add(
            this.getElement(),
            Search.CssClass.SEARCH_MODE
        );
        goog.dom.classes.remove(
            this.getElement(),
            Search.CssClass.DEFAULT_MODE
        );
        goog.dom.classes.add(
            document.documentElement,
            Utils.CssClass.OVERFLOW_HIDDEN
        );
        this.disableScroll_();
    };

    /**
     * Switch to default mode
     * @public
     */
    Search.prototype.switchToDefaultMode = function() {
        goog.dom.classes.remove(
            this.getElement(),
            Search.CssClass.SEARCH_MODE
        );
        goog.dom.classes.add(
            this.getElement(),
            Search.CssClass.DEFAULT_MODE
        );
        goog.dom.classes.remove(
            document.documentElement,
            Utils.CssClass.OVERFLOW_HIDDEN
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
    };

    /**
     * Enables scroll
     * @private
     */
    Search.prototype.enableScroll_ = function() {
        document.ontouchmove = function() {
            return true;
        };
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
     * @param {element} element
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

        var handler = this.getHandler();

        this.dataParams_ = JSON.parse(
            this.getElement().getAttribute('data-params')
        );

        var ui = gorod.iUIInstanceStorage.UIInstanceStorage.getInstance();

        this.suggest_ = ui.getInstanceByElement(this.elements_.suggest);

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
            );
        } else if (this.elements_.searchButton) {
            handler.listen(
                this.elements_.searchButton,
                goog.events.EventType.CLICK,
                this.onSubmit_
            );
        }

        this.suggest_.setCallbacks({
            getData: function(elem) {
                var data = JSON.parse(elem);
                var res = [];
                var types = ['schools', 'areas', 'metro'],
                    items;

                for (var i = 0, type; type = types[i]; i++) {
                    items = data[type];
                    for (var j = 0, item; item = items[j]; j++) {
                        item.type = type;
                    }
                    if (type == 'schools') {
                        items = items.sort(function(school1, school2) {
                            var res = 0,
                                matches1 = school1.name.match(/№(\d+)/),
                                matches2 = school2.name.match(/№(\d+)/),
                                num1 = matches1 && matches1[1] || 1000000,
                                num2 = matches2 && matches2[1] || 1000000;

                            if (num1 || num2) {
                                res = num1 - num2;
                            }
                            else {
                                res = (school1.name > school2.name) ? 1 : -1;
                            }

                            return res;
                        });
                    }
                    res = res.concat(items);
                }
                return res.slice(0, 10);
            },

            search: function(elem) {
                return elem.name + ' ' +
                    elem.fullName + ' ' +
                    elem.abbreviation;
            },

            renderItem: this.renderItem_.bind(this),

            select: function(item) {
                return {
                    text: item.name,
                    value: item.id,
                    coords: item.coords
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
     * Render suggest item
     * @param {object} item - School or metro or area item
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
                    type: item.type,
                    name: name,
                    areas: this.renderItemAreas_(item),
                    totalScore: item.totalScore
                }
            });
        }

        return res;
    };

    /**
     * Render suggest item name
     * @param {object} item - School or metro or area item
     * @param {string} str - Search str
     * @return {string}
     * @private
     */
    Search.prototype.renderItemName_ = function(item, str) {
        var res = '',
            str = str.replace(/ё/g, 'е'),
            name = item.name.replace(/ё/g, 'е'),
            fullName = item.fullName && item.fullName.replace(/ё/g, 'е'),
            abbreviation = item.abbreviation &&
                item.abbreviation.replace(/ё/g, 'е');

        if (Suggest.findEntry(name, str)) {
            res = item.name;
        } else if (Suggest.findEntry(fullName, str)) {
            res = item.fullName;
        } else if (Suggest.findEntry(abbreviation, str)) {
            res = item.abbreviation;
        }

        return res;
    };



    /**
     * Render suggest item areas
     * @param {object} item - School or metro or area item
     * @return {string}
     * @private
     */
    Search.prototype.renderItemAreas_ = function(item) {
        var addresses = item.addresses || [],
            areas = addresses
                .map(function(address) {
                    return address.area.name;
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
            )
        };
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
        if (data.item.type === 'schools') {
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
        this.setText(data.item.name);
        this.suggest_.blur();

        if (data.item.type === 'schools') {
            document.location.href = '/school/' + data.item.url;
        } else if (this.dataParams_.redirect) {
            this.onNotSchoolSelect_(event, data);
        } else {
            this.processItem_(data.item);
            this.dispatchEvent({
                type: Search.Event.ITEM_SELECT,
                data: this.getData()
            });
        }
    };

    /**
     * Take values from selected item and put it to value
     * @param {Object} item - school or metro or area item
     * @private
     */
    Search.prototype.processItem_ = function(item) {
        if (item.type == 'metro') {
            this.setData({
                metroId: item.id,
                areaId: null,
                coords: item.coords,
                text: item.name
            });
        } else if (item.type == 'areas') {
            this.setData({
                metroId: null,
                areaId: item.id,
                coords: item.coords,
                text: item.name
            });
        } else {
            this.setData({
                metroId: null,
                areaId: null,
                coords: null,
                text: item.name
            });
        }
    };

    /**
     * Send the name of the selected schools Analytics
     * @param {Object} data
     * @private
     */
    Search.prototype.sendAnalyticsSchoolData_ = function(data) {
        var dataAnalytics = {
            hitType: 'event',
            eventCategory: 'suggest',
            eventAction: 'suggest click',
            eventLabel: data.item.name
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
            id: data.key,
            name: data.text,
            position: data.index + 1
        };

        Analytics.clickProduct(ecData, 'Suggest');
    };

    /**
     * Redirect handler
     * @private
     * @param {Object} event
     */
    Search.prototype.onSubmit_ = function(event) {
        if (this.dataParams_.redirect) {
            this.searchRequest_(this.getText());
        } else {
            this.dispatchEvent({
                type: Search.Event.SUBMIT,
                data: this.getData()
            });
        }
    };

    /**
     * Search redirect
     * @param {string} searchString
     * @private
     */
    Search.prototype.searchRequest_ = function(searchString) {
        var url = '/search';
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
            metroId: null,
            areaId: null
        });
        this.dispatchEvent(Search.Event.TEXT_CHANGE);
    };

    /**
     * Area/metro redirect handler
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    Search.prototype.onNotSchoolSelect_ = function(event, data) {
        var url = '/search' +
                '?name=' + encodeURIComponent(data.text);
        if (data.item.type === 'metro') {
            url += '&metroId=' + data.item.id;
        } else if (data.item.type === 'areas') {
            url += '&areaId=' + data.item.id;
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
});
