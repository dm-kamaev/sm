goog.provide('sm.bDiagram.Diagram');

goog.require('sm.bDiagram.Template');
goog.require('goog.ui.Component');

/**
 * sm.bDiagram.Diagram component
 * @param {Object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bDiagram.Diagram = function(opt_params) {
    goog.base(this);

    /**
     * Dom elements
     * @type {Object}
     * @protected
     */
    this.dom = {};

    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.bDiagram.Diagram, goog.ui.Component);

goog.scope(function() {
    var Diagram = sm.bDiagram.Diagram;

    /**
     * Css class enum
     * @enum {string}
     */
    Diagram.CssClass = {
        ROOT: 'b-diagram',

        ITEM: 'b-diagram__item'
    };

    /**
     * Display type enum
     * @enum {string}
     */
    Diagram.DisplayType = {
        DEFAULT: 'default',
        BARS: 'bars',
        TEXT: 'text',
        MARKS: 'marks',
        STARS: 'stars'
    };

    /**
     * Event enum
     * @enum {string}
     */
    Diagram.Event = {

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

        this.dom.items = this.getElementsByClass(Diagram.CssClass.ITEM);
    };

    /**
     * @override
     */
    Diagram.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };

    /**
     * @override
     */
    Diagram.prototype.disposeInternal = function() {
        goog.base(this, 'disposeInternal');

        this.dom = null;
        this.params_ = null;
    };
});
