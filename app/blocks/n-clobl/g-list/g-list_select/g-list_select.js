goog.provide('sm.gList.List.Select');

goog.require('cl.gList.List');
goog.require('sm.gList.TemplateSelect');
goog.require('sm.gList.ViewSelect');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * Select list control
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gList.List}
 */
sm.gList.List.Select = function(view, opt_domHelper) {
    sm.gList.List.Select.base(this, 'constructor', view, opt_domHelper);


    /**
     * Text, that sends to opener customtext of select
     * @type {Array<string>}
     * @private
     */
    this.itemValues_ = [];
};
goog.inherits(sm.gList.List.Select, cl.gList.List);


goog.scope(function() {
    var SelectList = sm.gList.List.Select;

    /**
     * Name of this element in factory
     */
    SelectList.NAME = sm.gList.TemplateSelect.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(SelectList.NAME, {
        control: SelectList,
        view: sm.gList.ViewSelect
    });

    /**
     * @param {Element} element
     * @override
     */
    SelectList.prototype.decorateInternal = function(element) {
        SelectList.base(this, 'decorateInternal', element);

        var dataParams = this.getView().getDataParams(element);

        for (var i = 0, l = dataParams.length; i < l; i++) {
            var item = dataParams[i];

            if (item.text || item.text === 0) {
                this.itemValues_.push(item.text);
            } else {
                this.itemValues_.push(item.label);
            }
        }
    };


    /**
     * get values array or value on opt_index
     * @param {number=} opt_index
     * @return {Array.<string>|string}
     */
    SelectList.prototype.getItemValue = function(opt_index) {
        return (opt_index >= 0) ?
            this.itemValues_[opt_index] :
            this.itemValues_;
    };
});  // goog.scope
