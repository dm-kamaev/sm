goog.provide('sm.lSchool.bResults.Results');

goog.require('cl.gTab.View');
goog.require('goog.ui.Component');
goog.require('sm.bDiagram.Diagram');
goog.require('sm.gDropdown.DropdownSelectLegacy');
goog.require('sm.gTab.TabStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSchool.bResults.Template');



/**
 * sm.lSchool.bResults.Results component
 * @param {Object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bResults.Results = function(opt_params) {
    goog.base(this);


    /**
     * Tab
     * @type {cl.gTab.Tab}
     * @private
     */
    this.tab_ = null;


    /**
     * Contents with dropdown
     * @type {Array.<{
     *     dropdown: sm.gDropdown.DropdownSelectLegacy,
     *     selectedItemId: number,
     *     showMoreButton: Element,
     *     innerContents: Array.<{
     *         element: Element,
     *         showMoreButtonElements: Array.<Element>
     *     }>
     * }>}
     * @private
     */
    this.contents_ = [];


    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.lSchool.bResults.Results, goog.ui.Component);


goog.scope(function() {
    var Results = sm.lSchool.bResults.Results,
        Factory = sm.iCloblFactory.FactoryStendhal.getInstance(),
        TabView = cl.gTab.View,
        DropdownView = cl.gDropdown.View,
        DropdownSelect = sm.gDropdown.DropdownSelectLegacy,
        Utils = cl.iUtils.Utils,
        Diagram = sm.bDiagram.Diagram;


    /**
     * Css class enum
     * @enum {string}
     */
    Results.CssClass = {
        ROOT: 'b-results',
        CONTENT: 'b-results__content',
        INNER_CONTENT: 'b-results__inner-content',
        SHOW_MORE_BUTTON: 'b-results__show-more-button',
        SHOW_MORE_BUTTON_ACTIVE: 'b-results__show-more-button_active'
    };


    /**
     * @override
     * @param {Element} element
     */
    Results.prototype.decorate = function(element) {
        if (element) {
            goog.base(this, 'decorate', element);
        }
    };


    /**
     * @override
     * @param {Element=} opt_parentElement
     */
    Results.prototype.render = function(opt_parentElement) {
        var cond = this.params_ &&
                this.params_.data &&
                (
                    (
                        this.params_.data.ege &&
                        this.params_.data.ege.years &&
                        this.params_.data.ege.years.length
                    ) ||
                    (
                        this.params_.data.gia &&
                        this.params_.data.gia.years &&
                        this.params_.data.gia.years.length
                    ) ||
                    (
                        this.params_.data.olymp &&
                        this.params_.data.olymp.years &&
                        this.params_.data.olymp.years.length
                    )
                );

        if (cond) {
            goog.base(this, 'render', opt_parentElement);
        }
    };


    /**
     * @override
     */
    Results.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSchool.bResults.Template.results,
            {
                params: this.params_
            },
            {
                factoryIndex:
                    sm.iCloblFactory.FactoryStendhal.getInstance().getIndex()
            }
        );

        this.decorateInternal(element);
    };


    /**
     * @override
     * @param {Element} element
     */
    Results.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var contentElements = this.getElementsByClass(Results.CssClass.CONTENT),
            tabElement = this.getElementByClass(TabView.CssClass.ROOT),
            diagramElements = this.getElementsByClass(Diagram.CssClass.ROOT);

        this.tab_ = Factory.decorate(
            sm.gTab.TabStendhal.NAME,
            tabElement,
            null,
            this
        );

        this.initContents_(contentElements);

        this.initDiagrams_(diagramElements);
    };


    /**
     * @override
     */
    Results.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        var that = this,
            handler = this.getHandler();

        handler.listen(
            this.tab_,
            cl.gTab.Tab.Event.TAB_SELECT,
            this.onTabSelect_
        );

        this.contents_.forEach(function(content, index) {
            if (content.dropdown) {
                handler.listen(
                    content.dropdown,
                    DropdownSelect.Event.ITEM_SELECT,
                    that.onDropdownSelect_.bind(that, index)
                );
            }

            content.innerContents.forEach(function(innerContent) {
                var buttonElements = innerContent.showMoreButtonElements;
                for (var i = 0; i < buttonElements.length; i++) {
                    handler.listen(
                        buttonElements[i],
                        goog.events.EventType.CLICK,
                        that.showAllOlympiads_.bind(that, buttonElements[i])
                    );
                }
            });
        });
    };


    /**
     * @override
     */
    Results.prototype.disposeInternal = function() {
        goog.base(this, 'disposeInternal');

        this.contents_ = null;
        this.params_ = null;
        this.tab_ = null;
    };


    /**
     * On dropdown select actions
     * @param {number} index
     * @param {Object} event
     * @private
     */
    Results.prototype.onDropdownSelect_ = function(index, event) {
        var content = this.contents_[index],
            innerContent = content.innerContents[content.selectedItemId];

        this.hide_(innerContent.element);
        this.hideInnerContentOlympiads_(innerContent);
        content.selectedItemId = event['itemId'];
        this.show_(content.innerContents[content.selectedItemId].element);
    };


    /**
     * On tab select actions
     * @param {Object} event
     * @private
     */
    Results.prototype.onTabSelect_ = function(event) {
        var that = this;

        this.contents_[event['tabId']].innerContents
            .forEach(function(innerContent) {
                that.hideInnerContentOlympiads_(innerContent);
            });
    };


    /**
     * Shows elements
     * @param {Element} element
     * @private
     */
    Results.prototype.show_ = function(element) {
        goog.dom.classlist.remove(element, Utils.CssClass.HIDDEN);
    };


    /**
     * Hides element
     * @param {Element} element
     * @private
     */
    Results.prototype.hide_ = function(element) {
        goog.dom.classlist.add(element, Utils.CssClass.HIDDEN);
    };


    /**
     * Shows olympiads
     * @param {Element} buttonElement
     * @private
     */
    Results.prototype.showAllOlympiads_ = function(buttonElement) {
        goog.dom.classlist.remove(
            buttonElement,
            Results.CssClass.SHOW_MORE_BUTTON_ACTIVE
        );
    };


    /**
     * Hides olympiads in inner content
     * @param {{
     *     element: Element,
     *     showMoreButtonElements: Array.<Element>
     * }} innerContent
     * @private
     */
    Results.prototype.hideInnerContentOlympiads_ = function(innerContent) {
        var buttonElements = innerContent.showMoreButtonElements;

        for (var i = 0; i < buttonElements.length; i++) {
            goog.dom.classlist.add(
                buttonElements[i],
                Results.CssClass.SHOW_MORE_BUTTON_ACTIVE
            );
        }
    };


    /**
     * Contents initialization
     * @param {Array.<Element>} contentElements
     * @private
     */
    Results.prototype.initContents_ = function(contentElements) {
        var domHelper = this.getDomHelper(),
            dropdownElement,
            innerContentElements;

        for (var i = 0, element; i < contentElements.length; i++) {
            element = contentElements[i];
            innerContentElements = domHelper.getElementsByClass(
                Results.CssClass.INNER_CONTENT,
                element
            );

            if (innerContentElements.length > 1) {
                dropdownElement = domHelper.getElementByClass(
                    DropdownView.CssClass.ROOT,
                    element
                );

                this.contents_.push({
                    dropdown: Factory.decorate(
                        sm.gDropdown.DropdownSelectLegacy.NAME,
                        dropdownElement,
                        null,
                        this
                    ),
                    selectedItemId: innerContentElements.length - 1,
                    innerContents: this.initInnerContent_(innerContentElements)
                });
            } else {
                this.contents_.push({
                    innerContents: this.initInnerContent_(innerContentElements)
                });
            }
        }
    };


    /**
     * Inner contents initialization
     * @param {Array.<Element>} elements
     * @return {Array.<{
     *     element: Element,
     *     showMoreButtonElements: Array.<Element>
     * }>}
     * @private
     */
    Results.prototype.initInnerContent_ = function(elements) {
        var innerContents = [],
            domHelper = this.getDomHelper();

        for (var i = 0, element; i < elements.length; i++) {
            element = elements[i];
            innerContents.push({
                element: element,
                showMoreButtonElements: domHelper.getElementsByClass(
                    Results.CssClass.SHOW_MORE_BUTTON,
                    element
                )
            });
        }

        return innerContents;
    };


    /**
     * Diagrams initialization
     * @param {Array.<Element>} elements
     * @private
     */
    Results.prototype.initDiagrams_ = function(elements) {
        for (var i = 0, instance; i < elements.length; i++) {
            instance = new Diagram();
            this.addChild(instance);
            instance.decorate(elements[i]);
        }
    };
});  // goog.scope
