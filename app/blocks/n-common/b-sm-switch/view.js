goog.provide('sm.bSmSwitch.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.json');
goog.require('sm.bSmSwitch.Event.ItemSelect');



/**
 * Dropdown View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmSwitch.View = function(opt_params, opt_template, opt_modifier) {
    sm.bSmSwitch.View.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );

    /**
     * id of selected link
     * @type {?number}
     * @private
     */
    this.selectedLinkId_ = null;

    /**
     * data params
     * @type {?Object}
     * @private
     */
    this.params_ = null;

};
goog.inherits(sm.bSmSwitch.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmSwitch.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-switch',
        LINK: 'b-sm-switch__link',
        SELECTED: 'b-sm-switch__link_selected',
        LINK_WRAP: 'b-sm-switch__link-wrapper'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        ITEM_SELECT: sm.bSmSwitch.Event.ItemSelect.Type
    };

    /**
     * @override
     * @param {Element} element
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.params = JSON.parse(goog.dom.dataset.get(element, 'params'));
        this.dom.links = goog.dom.getElementsByClass(View.CssClass.LINK);
        this.dom.wraps = goog.dom.getElementsByClass(View.CssClass.LINK_WRAP);
    };

    /**
     * @override
     * @public
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        if (this.dom.links.length > 0) {

            this.dom.links.forEach(function(item, i) {
                this.getHandler().listen(
                    item,
                    goog.events.EventType.CLICK,
                    this.onItemClick.bind(this, i)
                );
            }, this);

        }
    };

    /**
     * Item click handler
     * @param {number} id
     * @param {goog.events.Event} event
     * @protected
     */
    View.prototype.onItemClick = function(id, event) {
        if (id != this.selectedLinkId_) {
            this.selectLink(id);
            var params = this.params.items[id];
            var newEvent = new sm.bSmSwitch.Event.ItemSelect(params);
            this.dispatchEvent(newEvent);
        }
    };

    /**
     * control presence of class SELECTED
     * @param {number} id
     */
    View.prototype.selectLink = function(id) {
        this.selectedLinkId_ = id;

        this.dom.links.forEach(function(item) {
            goog.dom.classlist.remove(item, sm.bSmLink.View.CssClass.SELECTED);
        });
        this.dom.wraps.forEach(function(item) {
            goog.dom.classlist.remove(item, View.CssClass.SELECTED);
        });

        goog.dom.classlist.add(
            this.dom.links[id],
            sm.bSmLink.View.CssClass.SELECTED
        );
        goog.dom.classlist.add(this.dom.wraps[id], View.CssClass.SELECTED);
    };

});  // goog.scope
