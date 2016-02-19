goog.provide('sm.gListSelect.List');

goog.require('cl.gList.List');

/**
 * Select list control
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gList.List}
 */
sm.gListSelect.List = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);


    /**
     * Text, that sends to opener customtext of select
     * @type {Array<string>}
     * @private
     */
    this.openerTexts_ = [];
};
goog.inherits(sm.gListSelect.List, cl.gList.List);

goog.scope(function() {
    var List = sm.gListSelect.List;

    /**
     * @param {Element} element
     * @override
     */
    List.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var dataParams = this.getView().getDataParams(element);

        for (var i = 0, l = dataParams.length; i < l; i++) {
            var item = dataParams[i];

            if (item.openerText || item.openerText === 0) {
                this.openerTexts_.push(item.openerText);
            }
            else {
                this.openerTexts_.push(item.label);
            }
        }
    };

    /**
     * get opener texts array or text on index
     * @param {number} opt_index
     * @return {Array<string>|string}
     */
    List.prototype.getOpenerText = function(opt_index) {
        return (opt_index >= 0) ?
            this.openerTexts_[opt_index] :
            this.openerTexts_;
    };
});

