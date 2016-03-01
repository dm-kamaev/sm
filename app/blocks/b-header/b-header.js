goog.provide('sm.bHeader.Header');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bHeader.View');


/**
 * Header
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bHeader.Header = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    this.setSupportedState(goog.ui.Component.State.FOCUSED, false);

    this.mode_ = sm.bHeader.Header.Mode.DEFAULT;
};
goog.inherits(sm.bHeader.Header, cl.iControl.Control);


goog.scope(function() {
    var Header = sm.bHeader.Header,
        View = sm.bHeader.View,
        FactoryManager = cl.iFactory.FactoryManager;


    /**
     * Header modes
     * @enum {string}
     */
    Header.Mode = {
        'DEFAULT': 'default',
        'SEARCH': 'search'
    };


    /**
     * Singleton getter
     * @return {sm.bHeader.Header}
     */
    Header.getInstance = function() {
        if (!Header.instance_) {
            Header.instance_ = FactoryManager.getInstance().decorate(
                'stendhal',
                'header',
                goog.dom.getElementByClass(View.CssClass.ROOT)
            );
        }

        return Header.instance_;
    };


    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.getView(),
            View.Event.DEFAULT_MODE_INITED,
            this.onDefaultModeInited_
        ).listen(
            this.getView(),
            View.Event.SEARCH_MODE_INITED,
            this.onSearchModeInited_
        );
    };


    /**
     * Set header mode
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     */
    Header.prototype.setMode = function(mode) {
        var res = (this.isCorrectMode_(mode) && !this.isCurrentMode_(mode));

        if (res) {
            this.mode_ = mode;
            this.switchViewMode_(mode);
        }

        return res;
    };


    /**
     * Is mode already selected
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     * @private
     */
    Header.prototype.isCurrentMode_ = function(mode) {
        return this.mode_ == mode;
    };


    /**
     * Is mode correct
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     * @private
     */
    Header.prototype.isCorrectMode_ = function(mode) {
        return mode == Header.Mode.DEFAULT ||
               mode == Header.Mode.SEARCH;
    };


    /**
     * Switch mode of view
     * @param {sm.bHeader.Header.Mode} mode
     * @private
     */
    Header.prototype.switchViewMode_ = function(mode) {
        switch (mode) {
            case Header.Mode.DEFAULT:
                this.getView().switchToDefaultMode();
                break;

            case Header.Mode.SEARCH:
                this.getView().switchToSearchMode();
                break;
        }
    };

    /**
     * Default mode inition handler
     * @param {object} event
     * @private
     */
    Header.prototype.onDefaultModeInited_ = function(event) {
        this.setMode(Header.Mode.DEFAULT);
    };


    /**
     * Search mode inition handler
     * @param {object} event
     * @private
     */
    Header.prototype.onSearchModeInited_ = function(event) {
        this.setMode(Header.Mode.SEARCH);
    };


    jQuery(function() {
        Header.getInstance();
    });
});
