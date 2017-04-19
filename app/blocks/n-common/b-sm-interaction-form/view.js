goog.provide('sm.bSmInteractionForm.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');


goog.scope(function() {



    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmInteractionForm.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmInteractionForm.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.bSmInteractionForm.View, cl.iControl.View);
    var View = sm.bSmInteractionForm.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-interaction-form',
        FIELD: 'b-sm-interaction-form__field',
        FIELD_CONTROL: 'b-sm-interaction-form__field-item'
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom.fields = this.getElementsByClass(
            View.CssClass.FIELD_CONTROL
        );
    };


    /**
     * Get field control name
     * @param {Element} field
     * @return {string}
     * @public
     */
    View.prototype.getFieldControlName = function(field) {
        var ancestor = goog.dom.getAncestorByClass(field, View.CssClass.FIELD);

        var dataParams = goog.dom.dataset.get(
            ancestor,
            'params'
        );

        return JSON.parse(dataParams).name;
    };
});  // goog.scope
