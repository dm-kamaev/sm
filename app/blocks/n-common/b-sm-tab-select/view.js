goog.provide('sm.bSmTabSelect.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.json');
goog.require('sm.bSmTabSelect.Event.ItemSelect');



/**
 * Dropdown View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmTabSelect.View = function(opt_params, opt_template, opt_modifier) {
    sm.bSmTabSelect.View.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );

    this.selectedLinkID = null;

};
goog.inherits(sm.bSmTabSelect.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmTabSelect.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-tab-select',
        LINKS: 'b-sm-tab-select__link',
        SELECTED_LINK: 'b-sm-tab-select__selected-link'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        ITEM_SELECT: sm.bSmTabSelect.Event.ItemSelect.Type
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom.links = goog.dom.getElementsByClass(View.CssClass.LINKS);
        this.dom.selectedLink =
            this.getElementByClass(View.CssClass.SELECTED_LINK);
    };

    /**
     * @override
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

            this.selectedLinkID = 0;
            goog.dom.classlist.add(
                this.dom.links[this.selectedLinkID],
                View.CssClass.SELECTED_LINK
            );

        }
    };

    /**
     * Item click handler
     * @param {number} id
     * @param {goog.events.Event} event
     * @protected
     */
    View.prototype.onItemClick = function(id, event) {
        if (id != this.selectedLinkID) {
            this.selectedLinkID = id;
            var data = goog.dom.dataset.get(this.dom.links[id], 'params');

            var params = {
                'label': this.dom.links[id].innerText,
                'value': goog.json.parse(data).id
            };
            var event = new sm.bSmTabSelect.Event.ItemSelect(params);
            this.dispatchEvent(event);

            this.dom.links.forEach(function(item) {
                goog.dom.classlist.remove(item, View.CssClass.SELECTED_LINK);
            });
            goog.dom.classlist.add(
                this.dom.links[id],
                View.CssClass.SELECTED_LINK
            );
        }
    };

});  // goog.scope
