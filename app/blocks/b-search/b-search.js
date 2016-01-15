goog.provide('sm.bSearch.Search');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('gorod.gSuggest.Suggest');
goog.require('sm.bSearch.Template');

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

    this.elements_ = {};

    this.suggest_ = null;
};
goog.inherits(sm.bSearch.Search, goog.ui.Component);

goog.scope(function() {
    var Search = sm.bSearch.Search;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Search.CssClass = {
        ROOT: 'b-search',
        INPUT: 'b-input__input',
        LIST: 'b-search__list',
        ICON: 'b-search__icon'
    };

    /**
     * Event enum
     * @enum {string}
     */
    Search.Event = {
        SUBMIT: 'submit',
        ITEM_SELECT: 'itemSelect'
    };

    /**
     * Get input value
     * @return {string} Input value
     * @public
     */
    Search.prototype.getValue = function() {
        return goog.dom.getElementByClass(Search.CssClass.INPUT).value;
    };

    /**
     * Internal decorates the DOM element
     * @param {element} element
     */
    Search.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_(element);
    };

    /**
     * Set up the Component.
     */
     Search.prototype.enterDocument = function() {
         goog.base(this, 'enterDocument');

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

         if (this.elements_.icon) {
             this.getHandler().listen(
                 this.elements_.icon,
                 goog.events.EventType.CLICK,
                 this.onIconClick_
             );
         }

        this.suggest_.setCallbacks({
            getData: function(elem) {
                elem = JSON.parse(elem);
                var result = [];
                for (prop in elem) {
                    var type;
                    switch (prop) {
                        case 'schools':
                            type = 'school';
                            break;
                        case 'areas':
                            type = 'area';
                            break;
                        case 'metro':
                            type = 'metro';
                            break;
                    }
                    elem[prop].forEach(function(item) {
                        item.type = type;
                        result.push(item);
                    });
                }
                return result;
            },

            search: function(elem) {
                return elem.name + ' ' +
                    elem.fullName + ' ' +
                    elem.abbreviation;
            },

            renderItem: function(item, str) {
                var result,
                    Suggest = gorod.gSuggest.Suggest;

                str = str || '';

                /**
                 * Finds entry
                 * @param {string} name
                 */
                var findEntry = function(name) {
                    return Suggest.findEntry(name, str);
                };

                if (findEntry(item.name)) {
                    result = item.name;
                } else if (findEntry(item.fullName)) {
                    result = item.fullName;
                } else if (findEntry(item.abbreviation)) {
                    result = item.abbreviation;
                } else {
                    result = '';
                }

                result = '<span class="b-search__list-name">' +
                    result +
                    '</span>';

                if (item.hasOwnProperty('addresses')) {
                    result += ' <span class="b-search__list-area">' +
                        item.addresses
                        .map(function(address) {
                            return address.area.name;
                        })
                        .reduce(function(prev, curr) {
                            return (prev.indexOf(' ' + curr) < 0) ?
                                prev.concat([' ' + curr]) : prev;
                        }, []) +
                        '</span>';
                }

                return result;
            }
        });
     };

    /**
     * Clean up the Component.
     */
    Search.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');
    };

    /**
     * gets DOM elements
     * @param {Element} root
     * @private
     */
    Search.prototype.initElements_ = function(root) {
        this.elements_ = {
            root: goog.dom.getElementByClass(
                Search.CssClass.ROOT
            ),
            suggest: goog.dom.getElementByClass(
                gorod.gSuggest.Suggest.Css.ROOT
            ),
            icon: goog.dom.getElementByClass(
                Search.CssClass.ICON
            )
        };
    };

    /**
     * Icon click handler
     * @private
     */
    Search.prototype.onIconClick_ = function() {
        this.dispatchEvent({
            type: Search.Event.SUBMIT,
            text: this.suggest_.getText()
        });
    };

    /**
     * Redirect handler
     * @private
     * @param {Object} event
     * @param {Object} data
     */
    Search.prototype.itemClickHandler_ = function(event, data) {
        if (data.item.type === 'school') {
            document.location.href = '/school/' + data.item.url;
        } else {
            this.dispatchEvent({
                type: Search.Event.ITEM_SELECT,
                data: {
                    id: data.item.id,
                    type: data.item.type
                }
            });
        }
    };

    /**
     * Redirect handler
     * @private
     * @param {Object} event
     * @param {Object} data
     */
    Search.prototype.onSubmit_ = function(event, data) {
        this.dispatchEvent({
            type: Search.Event.SUBMIT,
            text: data.text
        });
    };
});
