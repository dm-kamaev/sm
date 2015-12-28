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
        SUBMIT: 'submit'
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

         var ui = gorod.iUIInstanceStorage.UIInstanceStorage.getInstance(),
             suggestInstance = ui.getInstanceByElement(this.elements_.suggest);

         suggestInstance.addEventListener(
             gorod.gSuggest.Suggest.Events.SELECT,
             this.itemClickHandler_
         );

         suggestInstance.addEventListener(
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

         suggestInstance.setCallbacks({
             getData: function(elem) {
                 var data = JSON.parse(elem);
                 data = data.sort(function(school1, school2) {
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
                 return data.slice(0, 10);
             },

             search: function(elem) {
                 var result = elem.name + ' ' +
                     elem.fullName + ' ' +
                     elem.abbreviation;
                 return result;
             },

             renderItem: function(item, str) {
                 var matchName,
                     Suggest = gorod.gSuggest.Suggest;

                 str = str || '';

                 matchName = Suggest.findEntry(item.name, str);
                 if (matchName) {
                     return item.name;
                 }

                 var matchFullName = Suggest.findEntry(item.fullName, str);
                 if (matchFullName) {
                     return item.fullName;
                 }

                 var matchAbbreviation = Suggest.findEntry(
                     item.abbreviation, str);
                 if (matchAbbreviation) {
                     return item.abbreviation;
                 }
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
        this.dispatchEvent(gorod.gSuggest.Suggest.Events.SUBMIT);
    };

    /**
     * Redirect handler
     * @private
     * @param {Object} event
     * @param {Object} data
     */
    Search.prototype.itemClickHandler_ = function(event, data) {
        document.location.href = '/school/' + data.key;
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
