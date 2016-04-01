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
        Utils = cl.iUtils.Utils;

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
        ANIMATION_OFF: 'b-search_animation_off'

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
     * Get input value
     * @return {string} Input value
     * @public
     */
    Search.prototype.getValue = function() {
        return this.suggest_.getText();
    };

    /**
     * Sets input value
     * @param {string} value
     * @public
     */
    Search.prototype.setValue = function(value) {
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
    };

    /**
     * Switch to default mode
     * @public
     */
    Search.prototype.switchToDefaultMode = function() {
        this.setValue('');
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

        if (this.elements_.searchButton) {
            handler.listen(
                this.elements_.searchButton,
                goog.events.EventType.CLICK,
                this.onSearchClick_
            );
        }

        if (this.elements_.clearButton) {
            handler.listen(
                this.elements_.clearButton,
                goog.events.EventType.CLICK,
                this.onClearClick_
            );
        }

        if (this.elements_.fader) {
            handler.listen(
                this.elements_.fader,
                goog.events.EventType.CLICK,
                this.onClearClick_
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
                    value: item.id
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
        var res = '';

        if (Suggest.findEntry(item.name, str)) {
            res = item.name;
        } else if (Suggest.findEntry(item.fullName, str)) {
            res = item.fullName;
        } else if (Suggest.findEntry(item.abbreviation, str)) {
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
        this.suggest_.setText(data.item.name);
        this.suggest_.blur();

        if (data.item.type === 'schools') {
            document.location.href = '/school/' + data.item.url;
        } else if (this.dataParams_.redirect) {
            this.onNotSchoolSelect_(event, data);
        } else {
            this.dispatchEvent({
                type: Search.Event.ITEM_SELECT,
                data: this.transformItemToEventData_(data.item)
            });
        }
    };

    /**
     * Transform item object to event data
     * @param {{
     *     id: number,
     *     type: number,
     *     name: string
     * }} item
     * @return {{
     *     name: string,
     *     metroId: number|null,
     *     areaId: number|null
     *     }}
     * @private
     */
    Search.prototype.transformItemToEventData_ = function(item) {
        var data = {
            name: item.name,
            metroId: null,
            areaId: null
        };

        if (item.type == 'metro') {
            data.metroId = item.id;
        } else if (item.type == 'areas') {
            data.areaId = item.id;
        }

        return data;
    };

    /**
     * Redirect handler
     * @private
     * @param {Object} event
     * @param {Object} data
     */
    Search.prototype.onSubmit_ = function(event, data) {
        if (this.dataParams_.redirect) {
            this.searchRequest_(data.text);
        } else {
            this.dispatchEvent({
                type: Search.Event.SUBMIT,
                data: {
                    name: data.text,
                    metroId: null,
                    areaId: null
                }
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
        this.dispatchEvent({
            type: Search.Event.TEXT_CHANGE,
            data: {
                name: data.text,
                metroId: null,
                areaId: null
            }
        });
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
});
