goog.provide('sm.bDiagram.Diagram');

goog.require('goog.dom.classlist');
goog.require('goog.events.EventType');
goog.require('goog.ui.Component');
goog.require('sm.bDiagram.Template');

/**
 * sm.bDiagram.Diagram component
 * @param {Object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bDiagram.Diagram = function(opt_params) {
    goog.base(this);

    /**
     * Elements
     * @type {Object}
     * @private
     */
    this.elements_ = {};

    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};

    /**
     * Flag for hint
     * @type {boolean}
     * @private
     */
    this.hintIsShown_ = false;

    /**
     * Shown hint element
     * @type {element}
     * @private
     */
    this.shownHintElement_ = null;
};
goog.inherits(sm.bDiagram.Diagram, goog.ui.Component);


goog.scope(function() {
    Diagram = sm.bDiagram.Diagram;

    /**
     * Css class enum
     * @enum {string}
     */
    Diagram.CssClass = {
        ROOT: 'b-diagram',
        BAR_WRAP: 'b-diagram__bar-wrap',
        HINT: 'b-diagram__tooltip',
        SHOWN_HINT: 'b-diagram__tooltip_shown'
    };

    /**
     * @override
     */
    Diagram.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.bDiagram.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * @override
     * @param {Element} element
     */
    Diagram.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.elements_.bars = this.getElementsByClass(
            Diagram.CssClass.BAR_WRAP
        );

        this.elements_.hints = this.getElementsByClass(Diagram.CssClass.HINT);
    };

    /**
     * @override
     */
    Diagram.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var barElements = this.elements_.bars;

        for (var i = 0, barElement; i < barElements.length; i++) {
            barElement = barElements[i];

            this.getHandler().listen(
                barElement,
                goog.events.EventType.CLICK,
                this.onBarClick_.bind(this, i)
            ).listen(
                barElement,
                goog.events.EventType.MOUSEENTER,
                this.onMouseEnter_
            );
        }
    };

    /**
     * @override
     */
    Diagram.prototype.disposeInternal = function() {
        goog.base(this, 'disposeInternal');

        this.params_ = null;
        this.elements_ = null;
        this.hintIsShown_ = null;
        this.shownHintElement_ = null;
    };

    /**
     * On bar click actions
     * @param {number} id
     * @private
     */
    Diagram.prototype.onBarClick_ = function(id) {
        var hintElement = this.elements_.hints[id];

        if (this.hintIsShown_) {
            this.hideHint_();
        }

        if (!this.hintIsShown_ || !(this.shownHintElement_ === hintElement)) {
            this.shownHintElement_ = hintElement;

            goog.dom.classlist.add(
                this.shownHintElement_,
                Diagram.CssClass.SHOWN_HINT
            );

            this.getHandler().listen(
                document,
                goog.events.EventType.CLICK,
                this.onDocumentClick_
            );
        }
    };

    /**
     * On document click actions
     * @private
     */
    Diagram.prototype.onDocumentClick_ = function() {
        if (this.hintIsShown_) {
            this.hideHint_();
        } else {
            this.hintIsShown_ = !this.hintIsShown_;
        }
    };

    /**
     * On mouse enter actions
     * @private
     */
    Diagram.prototype.onMouseEnter_ = function() {
        if (this.hintIsShown_) {
            this.hideHint_();
        }
    };

    /**
     * Hides hint
     * @private
     */
    Diagram.prototype.hideHint_ = function() {
        this.getHandler().unlisten(
            document,
            goog.events.EventType.CLICK,
            this.hideHint_
        );

        goog.dom.classlist.remove(
            this.shownHintElement_,
            Diagram.CssClass.SHOWN_HINT
        );

        this.hintIsShown_ = !this.hintIsShown_;
    };
});
