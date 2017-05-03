goog.provide('sm.lSearch.bSearchResults.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.array');
goog.require('goog.dom.classlist');
goog.require('goog.object');
goog.require('sm.iAnimate.Animate');
goog.require('sm.lSearch.bSearchResults.Template');



goog.scope(function() {
    var Animate = sm.iAnimate.Animate;



    /**
     * View for SearchResults block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.lSearch.bSearchResults.View = function(
        opt_params, opt_type, opt_modifier) {
        sm.lSearch.bSearchResults.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );


        /**
         * Is css 3 animations supported by browser
         * @private
         */
        this.isAnimationSupported_ = false;

        /**
         * Current status
         * @type {sm.lSearch.bSearchResults.View.Status}
         * @private
         */
        this.status_ = sm.lSearch.bSearchResults.View.NOT_EMPTY_RESULTS;


        /**
         * Animation promise
         * In case it not null -> animation in progress
         * @type {goog.Promise}
         * @private
         */
        this.animationPromise_ = null;


        /**
         * Stores status to switch
         * @type {sm.lSearch.bSearchResults.View.Status}
         * @private
         */
        this.pendingStatus_ = null;
    };
    goog.inherits(sm.lSearch.bSearchResults.View, cl.iControl.View);
    var View = sm.lSearch.bSearchResults.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-search-results',
        HEADER: 'b-search-results__header_active',
        HEADER_TEXT: 'b-search-results__header-text',
        SORT_DROPDOWN: 'b-search-results__sort-control_dropdown',
        SORT_SWITCH: 'b-search-results__sort-control_switch',
        ITEM_LIST: 'b-search-results__item-list',
        SHOW_MORE_BUTTON: 'b-search-results__show-more-button',
        SHOW_MORE_BUTTON_WRAP: 'b-search-results__show-more-button-wrap',
        LOADER: 'b-search-results__loader',
        RESULTS: 'b-search-results__results',
        ANIMATION_ON: 'b-search_animation_on',
        PLACEHOLDER: 'b-search-results__placeholder',
        LOADER_SHOW_ANIMATION: 'b-search-results__loader_show',
        LOADER_HIDE_ANIMATION: 'b-search-results__loader_hide',
        SEARCH_IN_PROGRESS: 'b-search-results_search-in-progress',
        SORT_IN_PROGRESS: 'b-search-results_sort-in-progress',
        NOT_EMPTY_RESULTS: 'b-search-results_not-empty-results',
        EMPTY_RESULTS: 'b-search-results_empty-results'
    };


    /**
     * Possible status enum
     * @enum {string}
     */
    View.Status = {
        NOT_EMPTY_RESULTS: 'notEmptyResults',
        EMPTY_RESULTS: 'emptyResults',
        SEARCH_IN_PROGRESS: 'searchInProgress',
        SORT_IN_PROGRESS: 'sortInProgress'
    };

    /**
     * Possible event enum
     * @enum
     */
    View.Event = {
        ANIMATION_END: goog.events.getUniqueId('animationEnd'),
        HIDE_ANIMATION_END: goog.events.getUniqueId('hideAnimationEnd')
    };

    /**
     * @typedef {Array<{
     *     number: (number|undefined),
     *     text: (string|{
     *         nom: string,
     *         gen: string,
     *         plu: string
     *     })
     * }>}
     */
    View.TextHeaderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Array<Object>} rawParams
     * @return {View.TextHeaderParams}
     * @public
     */
    View.getHeaderRenderParams = function(rawParams) {
        var headerText = rawParams.map(part => {
            var text = part['text'];

            return {
                number: part['number'],
                text: (text && text['nom']) ? {
                    nom: text['nom'],
                    gen: text['gen'],
                    plu: text['plu']
                } : text
            };
        });

        return {
            params: {
                data: {
                    headerText: headerText
                }
            }
        };
    };


    /**
     * Update headers size s and l for results list
     * @param {sm.lSearch.bSearchResults.View.TextHeaderParams} headerText
     * @public
     */
    View.prototype.updateHeader = function(headerText) {
        var renderParams = View.getHeaderRenderParams(headerText);

        goog.soy.renderElement(
            this.dom.headerText,
            sm.lSearch.bSearchResults.Template.generateHeaderText,
            renderParams
        );
    };


    /**
     * Return animation promise
     * @return {goog.Promise}
     * @public
     */
    View.prototype.getAnimationPromise = function() {
        return this.animationPromise_;
    };


    /**
     * Reset animation promise
     * @public
     */
    View.prototype.resetAnimationPromise = function() {
        this.animationPromise_ = null;
    };


    /**
     * Change if is possible and needed status to given one
     * @param {sm.lSearch.bSearchResults.View.Status} status
     * @public
     */
    View.prototype.changeStatus = function(status) {
        if (this.isCorrectStatus_(status) && this.status_ != status) {
            var animationPromise = this.getAnimationPromise();
            if (animationPromise) {
                this.pendingStatus_ = status;
                animationPromise.then(this.setPendingStatus_, null, this);
            } else {
                this.setStatus_(status);
            }
        }
    };


    /**
     * Show or hide show more button
     * @param {boolean} visibility
     * @public
     */
    View.prototype.setShowMoreButtonVisibility = function(visibility) {
        visibility ?
            this.show_(this.dom.showMoreWrap) :
            this.hide_(this.dom.showMoreWrap);
    };


    /**
     * Show or hide loader
     * @param {boolean} visibility
     * @public
     */
    View.prototype.setLoaderVisibility = function(visibility) {
        visibility ?
            this.show_(this.dom.loader) :
            this.hide_(this.dom.loader);
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);
        this.initDom_()
            .initStatus_()
            .initAnimationSupportion_();
    };


    /**
     * Return data-params from dom element
     * @return {sm.lSearch.bSearchResults.View.DataParams}
     * @protected
     * @override
     */
    View.prototype.getParams = function() {
        var rawParams = View.base(this, 'getParams');

        this.params = (rawParams && !goog.object.isEmpty(rawParams)) ?
            this.transformParams(rawParams) :
            {};

        return this.params;
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object} rawParams
     * @return {sm.lSearch.bSearchResults.View.DataParams}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            declensionEntityType: {
                nom: rawParams['declensionEntityType']['nom'],
                gen: rawParams['declensionEntityType']['gen'],
                plu: rawParams['declensionEntityType']['plu']
            },
            countResults: rawParams['countResults']
        };
    };


    /**
     * Check that give status is in possible states enum
     * @param {sm.lSearch.bSearchResults.View.Status} status
     * @return {boolean}
     * @private
     */
    View.prototype.isCorrectStatus_ = function(status) {
        return goog.object.containsValue(
            View.Status, status
        );
    };


    /**
     * Switch status to given one
     * @param {sm.lSearch.bSearchResults.View.Status} status
     * @private
     */
    View.prototype.switchStatus_ = function(status) {
        this.removeOldStatus_();
        this.setStatus_(status);
    };


    /**
     * Switch to internally stored status
     * @private
     */
    View.prototype.setPendingStatus_ = function() {
        if (this.pendingStatus_) {
            this.setStatus_(this.pendingStatus_);
            this.pendingStatus_ = null;
        }
    };


    /**
     * Set given status
     * @param {sm.lSearch.bSearchResults.View.Status} status
     * @private
     */
    View.prototype.setStatus_ = function(status) {
        switch (status) {
            case View.Status.NOT_EMPTY_RESULTS:
                this.setNotEmptyResultsStatus_();
                break;

            case View.Status.SEARCH_IN_PROGRESS:
                this.setSearchInProgressStatus_();
                break;

            case View.Status.SORT_IN_PROGRESS:
                this.setSortInProgressStatus_();
                break;

            case View.Status.EMPTY_RESULTS:
                this.setEmptyResultsStatus_();
                break;
        }
    };


    /**
     * Set empty resukts status
     * @private
     */
    View.prototype.setEmptyResultsStatus_ = function() {
        var oldStatusCssClass = this.getCssClassByStatus_(this.status_);
        var newStatusCssClass = View.CssClass.EMPTY_RESULTS;
        this.status_ = View.Status.EMPTY_RESULTS;

        this.animationPromise_ = this.hideLoader_();

        if (this.animationPromise_) {
            this.animationPromise_.then(function() {
                this.switchToSearchDoneStatus_(
                    oldStatusCssClass, newStatusCssClass
                );
            }, null, this);
        } else {
            this.switchToSearchDoneStatus_(
                oldStatusCssClass, newStatusCssClass
            );
        }
    };


    /**
     * Set not empty results status
     * @private
     */
    View.prototype.setNotEmptyResultsStatus_ = function() {
        var oldStatusCssClass = this.getCssClassByStatus_(this.status_);
        var newStatusCssClass = View.CssClass.NOT_EMPTY_RESULTS;
        this.status_ = View.Status.NOT_EMPTY_RESULTS;

        this.animationPromise_ = this.hideLoader_();

        if (this.animationPromise_) {
            this.animationPromise_.then(function() {
                this.switchToSearchDoneStatus_(
                    oldStatusCssClass, newStatusCssClass
                );
            }, null, this);
        } else {
            this.switchToSearchDoneStatus_(
                oldStatusCssClass, newStatusCssClass
            );
        }
    };


    /**
     * Hide loader, reset animation promise
     * and change given classes on root element to switch to search done
     * status
     * @param {sm.lSearch.bSearchResults.View.CssClass} oldStatusCssClass
     * @param {sm.lSearch.bSearchResults.View.CssClass} newStatusCssClass
     * @private
     */
    View.prototype.switchToSearchDoneStatus_ = function(
        oldStatusCssClass, newStatusCssClass) {
        this.switchClass_(
            oldStatusCssClass,
            newStatusCssClass
        );

        this.setLoaderVisibility(false);
        this.resetAnimationPromise();
    };


    /**
     * Set search in progress status
     * @private
     */
    View.prototype.setSearchInProgressStatus_ = function() {
        var oldStatusCssClass = this.getCssClassByStatus_(this.status_);
        this.status_ = View.Status.SEARCH_IN_PROGRESS;
        this.switchClass_(
            oldStatusCssClass,
            View.CssClass.SEARCH_IN_PROGRESS
        );

        this.animationPromise_ = this.showLoader_();

        if (this.animationPromise_) {
            this.animationPromise_.then(this.resetAnimationPromise, null, this);
        }
    };


    /**
     * Set sort in progress status
     * @private
     */
    View.prototype.setSortInProgressStatus_ = function() {
        var oldStatusCssClass = this.getCssClassByStatus_(this.status_);
        this.status_ = View.Status.SORT_IN_PROGRESS;
        this.switchClass_(
            oldStatusCssClass,
            View.CssClass.SORT_IN_PROGRESS
        );

        this.animationPromise_ = this.showLoader_();
        if (this.animationPromise_) {
            this.animationPromise_.then(this.resetAnimationPromise, null, this);
        }
    };


    /**
     * Return css class corresponding to given status
     * @param {sm.lSearch.bSearchResults.View.Status} status
     * @return {sm.lSearch.bSearchResults.View.CssClass}
     * @private
     */
    View.prototype.getCssClassByStatus_ = function(status) {
        var cssClass;
        switch (status) {
            case View.Status.NOT_EMPTY_RESULTS:
                cssClass = View.CssClass.NOT_EMPTY_RESULTS;
                break;

            case View.Status.SEARCH_IN_PROGRESS:
                cssClass = View.CssClass.SEARCH_IN_PROGRESS;
                break;

            case View.Status.SORT_IN_PROGRESS:
                cssClass = View.CssClass.SORT_IN_PROGRESS;
                break;

            case View.Status.EMPTY_RESULTS:
                cssClass = View.CssClass.EMPTY_RESULTS;
                break;
        }
        return cssClass;
    };


    /**
     * Switch between given classes on root element
     * @param {string} classToRemove
     * @param {string} classToAdd
     * @private
     */
    View.prototype.switchClass_ = function(classToRemove, classToAdd) {
        goog.dom.classlist.addRemove(
            this.getElement(),
            classToRemove,
            classToAdd
        );
    };


    /**
     * Hide given element
     * @param {Element} element
     * @private
     */
    View.prototype.hide_ = function(element) {
        goog.dom.classlist.add(
            element,
            cl.iUtils.Utils.CssClass.HIDDEN
        );
    };


    /**
     * Show given element
     * @param {Element} element
     * @private
     */
    View.prototype.show_ = function(element) {
        goog.dom.classlist.remove(
            element,
            cl.iUtils.Utils.CssClass.HIDDEN
        );
    };


    /**
     * Add to loader element class that show it
     * @return {Promise}
     * @private
     */
    View.prototype.showLoader_ = function() {
        goog.dom.classlist.addRemove(
            this.dom.loader,
            cl.iUtils.Utils.CssClass.HIDDEN,
            View.CssClass.LOADER_SHOW_ANIMATION
        );

        var promise = this.isAnimationSupported_ ?
            new goog.Promise(function(resolve, reject) {
                goog.events.listenOnce(
                    this.dom.loader,
                    goog.events.EventType.ANIMATIONEND,
                    resolve
                );
            }, this) :
            null;

        return promise;
    };


    /**
     * Add to loader element class that show it
     * @return {Promise}
     * @private
     */
    View.prototype.hideLoader_ = function() {
        goog.dom.classlist.addRemove(
            this.dom.loader,
            View.CssClass.LOADER_SHOW_ANIMATION,
            View.CssClass.LOADER_HIDE_ANIMATION
        );

        var promise = this.isAnimationSupported_ ?
            new goog.Promise(function(resolve, reject) {
                goog.events.listenOnce(
                    this.dom.loader,
                    goog.events.EventType.ANIMATIONEND,
                    function() {
                        this.setLoaderVisibility(false);
                        goog.dom.classlist.remove(
                            this.dom.loader,
                            View.CssClass.LOADER_HIDE_ANIMATION
                        );
                        resolve();
                    }.bind(this)
                );
            }, this) :
            null;

        return promise;
    };


    /**
     * Init dom elements
     * @return {sm.lSearch.bSearchResults.View}
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            results: this.getElementByClass(View.CssClass.RESULTS),
            placeholder: this.getElementByClass(View.CssClass.PLACEHOLDER),
            header: this.getElementByClass(View.CssClass.HEADER),
            headerText: this.getElementByClass(View.CssClass.HEADER_TEXT),
            sortDropdown: this.getElementByClass(View.CssClass.SORT_DROPDOWN),
            sortSwitch: this.getElementByClass(View.CssClass.SORT_SWITCH),
            itemList: this.getElementByClass(View.CssClass.ITEM_LIST),
            showMore: this.getElementByClass(View.CssClass.SHOW_MORE_BUTTON),
            showMoreWrap: this.getElementByClass(
                View.CssClass.SHOW_MORE_BUTTON_WRAP
            ),
            loader: this.getElementByClass(View.CssClass.LOADER)
        };

        return this;
    };


    /**
     * Init current status
     * @return {sm.lSearch.bSearchResults.View}
     * @private
     */
    View.prototype.initStatus_ = function() {
        var isEmptyResultsStatus = goog.dom.classlist.contains(
            this.getElement(),
            View.CssClass.EMPTY_RESULTS
        );

        if (isEmptyResultsStatus) {
            this.status_ = View.Status.EMPTY_RESULTS;
        } else {
            this.status_ = View.Status.NOT_EMPTY_RESULTS;
        }

        return this;
    };


    /**
     * Init css 3 animation suppotion by browser and put corresponding value to
     * isAnimationSupported_ field
     * @private
     */
    View.prototype.initAnimationSupportion_ = function() {
        this.isAnimationSupported_ = Animate.isSupported();

        if (this.isAnimationSupported_) {
            this.addCssClass(View.CssClass.ANIMATION_ON);
        }
    };
});  // goog.scope
