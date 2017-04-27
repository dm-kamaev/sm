goog.provide('sm.lSearch.bFilter.ViewExtended');

goog.require('sm.lSearch.bFilter.View');



/**
 * Filter Extended View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.View}
 */
sm.lSearch.bFilter.ViewExtended = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.ViewExtended.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lSearch.bFilter.ViewExtended, sm.lSearch.bFilter.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewExtended,
        Utils = cl.iUtils.Utils;

    /**
     * @typedef {{
     *     name: string,
     *     type: string,
     *     api: string,
     *     apiPopular: ?string,
     *     optionsToShow: number,
     *     modal: {
     *         header: string,
     *         placeholder: ?string,
     *         filterHeader: string,
     *         theme: ?string
     *     }
     * }}
     */
    sm.lSearch.bFilter.ViewExtended.Params;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_extended',
        BUTTON_SHOW_MODAL: 'b-sm-filter__button_show-modal'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        SHOW_MODAL_CLICK: goog.events.getUniqueId('show-modal-click')
    };


    /**
     * Render option
     * @param {sm.bSmCheckbox.SmCheckbox.Params} data
     * @return {Element}
     * @protected
     */
    View.prototype.renderOption = function(data) {
        return goog.soy.renderAsElement(
            sm.lSearch.bFilter.TemplateExtended.option, {
                params: {
                    data: data
                }
            },
            {
                factoryIndex: this.getFactory().getIndex()
            }
        );
    };


    /**
     * Initializes controls
     * @param {Element} element
     * @override
     */
    View.prototype.initButtons = function(element) {
        this.dom.buttonShowModal = goog.dom.getElementByClass(
            View.CssClass.BUTTON_SHOW_MODAL,
            element
        );
    };


    /**
     * Initializes listeners for buttons
     * @override
     */
    View.prototype.initButtonsListeners = function() {
        var handler = this.getHandler();

        if (this.dom.buttonShowModal) {
            handler.listen(
                this.dom.buttonShowModal,
                goog.events.EventType.CLICK,
                this.onButtonShowModalClick_
            );
        }
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object} rawParams
     * @return {sm.lSearch.bFilter.ViewExtended.Params}
     * @override
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            name: rawParams['name'],
            type: rawParams['type'],
            api: rawParams['api'],
            apiPopular: rawParams['apiPopular'],
            optionsToShow: rawParams['optionsToShow'],
            modal: {
                header: rawParams['modal']['header'],
                placeholder: rawParams['modal']['placeholder'],
                filterHeader: rawParams['modal']['filterHeader'],
                theme: rawParams['modal']['theme']
            }
        };
    };


    /**
     * Button show modal handler
     * @private
     */
    View.prototype.onButtonShowModalClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.SHOW_MODAL_CLICK
        });
    };
});  // goog.scope
