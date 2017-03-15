goog.provide('sm.bSmInteractionForm.SmInteractionFormComment');

goog.require('sm.bSmInteractionForm.SmInteractionForm');
goog.require('sm.bSmInteractionForm.TemplateComment');
goog.require('sm.bSmInteractionForm.ViewComment');
goog.require('sm.bSmStars.SmStars');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.gInput.InputStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');


goog.scope(function() {



    /**
     * Control
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {sm.bSmInteractionForm.SmInteractionForm}
     */
    sm.bSmInteractionForm.SmInteractionFormComment = function(view,
        opt_domHelper) {

        sm.bSmInteractionForm.SmInteractionFormComment.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * User type field instance
         * @type {sm.gDropdown.DropdownSelect}
         * @private
         */
        this.userTypeField_ = null;


        /**
         * Year graduate instance
         * @type {sm.gInput.InputStendhal}
         * @private
         */
        this.yearField_ = null;


        /**
         * User type field instance
         * @type {sm.gDropdown.DropdownSelect}
         * @private
         */
        this.gradeField_ = null;


        /**
         * Instance stars
         * @type {Array<sm.smStars.Stars>}
         * @private
         */
        this.stars_ = [];
    };
    goog.inherits(
        sm.bSmInteractionForm.SmInteractionFormComment,
        sm.bSmInteractionForm.SmInteractionForm
    );
    var InteractionForm = sm.bSmInteractionForm.SmInteractionFormComment,
        View = sm.bSmInteractionForm.ViewComment;


    /**
     * Name of this element in factory
     */
    InteractionForm.NAME = sm.bSmInteractionForm.TemplateComment.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        InteractionForm.NAME,
        {
            control: InteractionForm,
            view: View
        }
    );


    /**
     * User type enum
     * @enum {string}
     */
    InteractionForm.UserType = {
        GRADUATE: 'Graduate',
        STUDENT: 'Student'
    };


    /**
     * @protected
     * @override
     */
    InteractionForm.prototype.enterDocument = function() {
        InteractionForm.base(this, 'enterDocument');

        this.initUserFieldsListeners_();
    };


    /**
     * Get data
     * @return {Object<string, (string|number|Array<(string|number)>)>}
     * @override
     * @public
     */
    InteractionForm.prototype.getData = function() {
        var data = InteractionForm.base(this, 'getData'),
            userData = this.getUserData_(),
            evaluationsData = this.getEvaluationsData_();

        goog.object.extend(data, userData, evaluationsData);

        return data;
    };


    /**
     * Validate fields
     * @return {boolean}
     * @override
     * @public
     */
    InteractionForm.prototype.validate = function() {
        return this.validateUserData_();
    };


    /**
     * Clear all fields
     * @override
     * @public
     */
    InteractionForm.prototype.clear = function() {
        InteractionForm.base(this, 'clear');
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    InteractionForm.prototype.decorateInternal = function(element) {
        InteractionForm.base(this, 'decorateInternal', element);

        this.initUserFields_();
        this.initEvaluations_();
    };


    /**
     * Init user fields listeners
     * @private
     */
    InteractionForm.prototype.initUserFieldsListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.userTypeField_,
            sm.gDropdown.DropdownSelect.Event.ITEM_SELECT,
            this.onUserTypeSelect_
        );
    };


    /**
     * Handler select item of user type
     * @private
     */
    InteractionForm.prototype.onUserTypeSelect_ = function() {
        var userType = this.userTypeField_.getValue();

        if (userType == InteractionForm.UserType.GRADUATE) {
            this.getView().setYearFieldVisibility(true);
            this.getView().setGradeFieldVisibility(false);
        }
        else if (userType == InteractionForm.UserType.STUDENT) {
            this.getView().setYearFieldVisibility(false);
            this.getView().setGradeFieldVisibility(true);
        }
    };


    /**
     * Validate fields of user data
     * @return {boolean}
     * @private
     */
    InteractionForm.prototype.validateUserData_ = function() {
        var isValid = false,
            isValidUserTypeField = this.userTypeField_.validate();

        var userType = this.userTypeField_.getValue();

        if (userType == InteractionForm.UserType.GRADUATE) {
            isValid = this.yearField_.validate() && isValidUserTypeField;
        }
        else if (userType == InteractionForm.UserType.STUDENT) {
            isValid = this.gradeField_.validate() && isValidUserTypeField;
        }

        return isValid;
    };


    /**
     * Get user data
     * @return {Object<string, (string|number|Array<(string|number)>)>}
     * @private
     */
    InteractionForm.prototype.getUserData_ = function() {
        var data = {};

        var userTypeFieldName = this.userTypeField_.getName(),
            userType = this.userTypeField_.getValue();

        data[userTypeFieldName] = userType;

        if (userType == InteractionForm.UserType.GRADUATE) {
            var yearFieldName = this.yearField_.getName();
            data[yearFieldName] = this.yearField_.getValue();
        }
        else if (userType == InteractionForm.UserType.STUDENT) {
            var gradeFieldName = this.gradeField_.getName();
            data[gradeFieldName] = this.gradeField_.getValue();
        }

        return data;
    };


    /**
     * Get evaluations
     * @return {Object<string, (string|number|Array<(string|number)>)>}
     * @private
     */
    InteractionForm.prototype.getEvaluationsData_ = function() {
        var score = this.stars_.map(function(star) {
            return star.getValue() || 0;
        });

        var hasValues = score.some(function(value) {
            return value > 0;
        });

        return {
            'score': hasValues ? score : null
        };
    };


    /**
     * Initializes instance to use for evaluations
     * @private
     */
    InteractionForm.prototype.initUserFields_ = function() {
        var userTypeField = this.getView().getDom().userTypeField;
        this.userTypeField_ = this.getFieldInstance(userTypeField);

        var yearField = this.getView().getDom().yearField;
        this.yearField_ = this.getFieldInstance(yearField);

        var gradeField = this.getView().getDom().gradeField;
        this.gradeField_ = this.getFieldInstance(gradeField);
    };


    /**
     * Initializes instance to use for evaluations
     * @private
     */
    InteractionForm.prototype.initEvaluations_ = function() {
        this.stars_ = this.decorateChildren(
            sm.bSmStars.SmStars.NAME,
            this.getView().getDom().stars
        );
    };
});  // goog.scope
