goog.provide('sm.bSmInteractionForm.SmInteractionForm');

goog.require('cl.iControl.Control');
goog.require('goog.object');
goog.require('sm.bSmInteractionForm.View');


goog.scope(function() {



    /**
     * Control
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmInteractionForm.SmInteractionForm = function(view, opt_domHelper) {
        sm.bSmInteractionForm.SmInteractionForm.base(
            this, 'constructor', view, opt_domHelper
        );

        /**
         * Instance fields
         * @type {Array<Object>}
         * @protected
         */
        this.fields = [];
    };
    goog.inherits(sm.bSmInteractionForm.SmInteractionForm, cl.iControl.Control);
    var InteractionForm = sm.bSmInteractionForm.SmInteractionForm,
        View = sm.bSmInteractionForm.View;


    /**
     * Get data
     * @return {Object<string, (string|number|Array<(string|number)>)>}
     * @public
     */
    InteractionForm.prototype.getData = function() {
        var data = {};

        this.fields.forEach(function(field) {
            var name = field.getName();
            data[name] = field.getValue();
        });

        return data;
    };


    /**
     * Validate all fields
     * @return {boolean}
     * @public
     */
    InteractionForm.prototype.validate = function() {
        return this.fields.every(function(field) {
            return field.validate();
        });
    };


    /**
     * Clear all fields
     * @public
     */
    InteractionForm.prototype.clear = function() {
        this.fields.forEach(function(field) {
            field.clear();
        });
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    InteractionForm.prototype.decorateInternal = function(element) {
        InteractionForm.base(this, 'decorateInternal', element);

        this.initFields_();
    };


    /**
     * Get instance of field
     * @param {Element} domElement
     * @return {Object}
     * @protected
     */
    InteractionForm.prototype.getFieldInstance = function(domElement) {
        var controlName = this.getView().getFieldControlName(domElement);
        return this.decorateChild(controlName, domElement);
    };


    /**
     * Initializes instance of fields
     * @private
     */
    InteractionForm.prototype.initFields_ = function() {
        var fields = Array.prototype.slice.call(
            this.getView().getDom().fields,
            0
        );

        this.fields = fields.map(function(field) {
            return this.getFieldInstance(field);
        }, this);
    };
});  // goog.scope
