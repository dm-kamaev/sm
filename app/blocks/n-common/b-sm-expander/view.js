goog.provide('sm.bSmExpander.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.SmLink');



goog.scope(function() {



    /**
     * View for Expander block block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmExpander.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmExpander.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.bSmExpander.View, cl.iControl.View);
    var View = sm.bSmExpander.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-expander',
        EXPAND_BUTTON: 'b-sm-expander__expand-button',
        EXPANDED_STATE: 'b-sm-expander_expanded',
        FOLDED_STATE: 'b-sm-expander_folded'
    };


    /**
     * List pf possible events
     * @enum {string}
     */
    View.Event = {
        EXPAND_BUTTON_CLICK: goog.events.getUniqueId('expandButtonClick')
    };


    /**
     * List of possible states
     * @enum {string}
     */
    View.State = {
        EXPANDED: 'expanded',
        FOLDED: 'folded'
    };


    /**
     * @typedef {{
     *     isExpanded: boolean
     * }}
     */
    sm.bSmExpander.View.DataParams;


    /**
     * @typedef {{
     *     data: {
     *         content: ?string
     *     },
     *     config: {
     *         isExpanded: boolean,
     *         theme: string
     *     }
     * }}
     */
    sm.bSmExpander.View.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string, number, Object)>} rawParams
     * @return {sm.bSmExpander.View.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        return {
            data: {
                content: rawParams['data']['content']
            },
            config: {
                isExpanded: rawParams['config']['isExpanded'],
                theme: rawParams['config']['theme']
            }
        };
    };


    /**
     * Set given state
     * @param {sm.bSmExpander.View.State} state
     * @public
     */
    View.prototype.setState = function(state) {
        var stateCssClasses = [
            View.CssClass.EXPANDED_STATE,
            View.CssClass.FOLDED_STATE
        ];
        goog.dom.classlist.removeAll(
            this.getElement(), stateCssClasses
        );

        switch (state) {
            case View.State.EXPANDED:
                goog.dom.classlist.add(
                    this.getElement(), View.CssClass.EXPANDED_STATE
                );
                break;

            case View.State.FOLDED:
                goog.dom.classlist.add(
                    this.getElement(), View.CssClass.FOLDED_STATE
                );
                break;
        }

    };


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_()
            .initParams_();
    };


    /**
     * @override
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.expandButton,
            goog.events.EventType.CLICK,
            this.onExpandButtonClick_
        );
    };


    /**
     * Expand button click handler
     * @private
     */
    View.prototype.onExpandButtonClick_ = function() {
        this.dispatchEvent(View.Event.EXPAND_BUTTON_CLICK);
    };


    /**
     * Init dom elements
     * @return {sm.bSmExpander.View.DataParams}
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            expandButton: this.getElementByClass(View.CssClass.EXPAND_BUTTON),
            link: this.getElementByClass(
                sm.bSmLink.SmLink.CssClass.ROOT
            )

        };

        return this;
    };


    /**
     * Init params from data params
     * @return {sm.bSmExpander.View}
     * @private
     */
    View.prototype.initParams_ = function() {
        var params = this.getParams();

        this.params = this.transformParams_(params);
        return this;
    };


    /**
     * Return transformed params
     * @param {Object<string, string>} rawParams
     * @return {sm.bSmExpander.View.DataParams}
     * @private
     */
    View.prototype.transformParams_ = function(rawParams) {
        return {
            isExpanded: rawParams['isExpanded']
        };
    };
});  // goog.scope
