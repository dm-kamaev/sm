goog.provide('sm.gList.SelectList');

goog.require('cl.gList.List');



/**
 * Select list control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gList.List}
 */
sm.gList.SelectList = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);


    /**
     * Text, that sends to opener customtext of select
     * @type {Array.<string>}
     * @private
     */
    this.itemValues_ = [];
};
goog.inherits(sm.gList.SelectList, cl.gList.List);


goog.scope(function() {
    var SelectList = sm.gList.SelectList;


    /**
     * @param {Element} element
     * @override
     */
    SelectList.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var dataParams = this.getView().getDataParams(element);

        for (var i = 0, l = dataParams.length; i < l; i++) {
            var item = dataParams[i];

            if (item.text || item.text === 0) {
                this.itemValues_.push(item.text);
            }
            else {
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
