goog.provide('sm.lSchool.bFeedbackModal.FeedbackModal');

goog.require('cl.iUtils.Utils');
goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.ui.Component');
goog.require('sm.bStars.Stars');
goog.require('sm.iEvercookie.Evercookie');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.lSchool.bFeedbackModal.Template');

/**
 * Feedback modal
 * @param {Object} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bFeedbackModal.FeedbackModal = function(opt_params) {
    goog.base(this);

    /**
     * parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};

    /**
     * DOM elements
     * @type {Object}
     * @private
     */
    this.elements_ = {};

    /**
     * Textarea instance
     * @type {cl.gTextarea.Textarea}
     * @private
     */
    this.textarea_ = null;

    /**
     * modal
     * @type {cl.gModal.Modal}
     * @private
     */
    this.modal_ = null;

    /**
     * Stars instances
     * @type {Array.<sm.bStars.Stars>}
     * @private
     */
    this.stars_ = [];

    /**
     * Instances of dropdowns with type of user
     * @type {Object}
     * @private
     */
    this.dropdowns_ = {};

    /**
     * Input instance
     * @type {sm.gInput.DigitInput}
     * @private
     */
    this.yearGraduate_ = null;

    /**
     * @type {object}
     * @private
     */
    this.evercookie_ = sm.iEvercookie.Evercookie.getInstance();

    /**
     * @type {?string}
     * @private
     */
    this.clientIdPromise_ = null;
};
goog.inherits(sm.lSchool.bFeedbackModal.FeedbackModal, goog.ui.Component);

goog.scope(function() {
    var FeedbackModal = sm.lSchool.bFeedbackModal.FeedbackModal,
        Analytics = sm.iAnalytics.Analytics.getInstance();
    /**
     * CSS-class enum
     * @enum {string}
     */
    FeedbackModal.CssClass = {
        'ROOT': 'b-feedback',
        'FORM': 'b-feedback__form',
        'RADIO': 'b-feedback__radio',
        'USER_TYPE_SELECT': 'b-feedback__control',
        'CLASS_TYPE_SELECT': 'b-feedback__class-select',
        'TEXT_STUDENT': 'b-feedback__text_student',
        'TEXT_PARENT': 'b-feedback__text_parent',
        'GRADUATION_YEAR': 'b-feedback__graduation-year',
        'VALIDATION_ERRORS': 'b-feedback__validation-errors'
    };

    /**
     * Validation error texts
     * @enum {string}
     */
    FeedbackModal.Error = {
        'TYPE_REQUIRED': 'Выберите, кто вы по отношению к школе.',
        'RATING_REQUIRED': 'Оставьте оценку или комментарий.',
        'COMMENT_TOO_LONG': 'Комментарий не должен превышать 300 символов.',
        'WRONG_GRADUATION_YEAR': ' Укажите год выпуска в формате ХХХХ.'
    };

    /**
     * formatting data for the type of user
     * @enum {number}
     */
    FeedbackModal.UserType = {
        'PARENT': 0,
        'ALUMNI': 1,
        'STUDENT': 2
    };

    /**
     * action to send events Analytics
     * @enum {string}
     */
    FeedbackModal.AnalyticsAction = {
        'REVIEW_SUBMIT': 'review submit',
        'YEAR_CHOICE': 'year choice',
        'GRADUATION_CHOICE': 'graduation choice',
        'ROLE_CHOISE': 'role choice',
        'STAR_EDUCATION': 'star-education',
        'STAR_TEACHER': 'star-teachers',
        'STAR_ATMOSPHERE': 'star-atmosphere',
        'STAR_INFRASTUCTURE': 'star-infrastructure'
    };

    /**
     * shows modal window
     * @public
     */
    FeedbackModal.prototype.show = function() {
        this.modal_.show();
    };

    /**
     * hides modal window
     * @public
     */
    FeedbackModal.prototype.hide = function() {
        this.modal_.hide();
    };

    /**
     * From cleaning
     * @public
     */
    FeedbackModal.prototype.clean = function() {
        this.textarea_.clean();
        this.yearGraduate_.clean();

        for (var i = 0, stars; stars = this.stars_[i]; i++) {
            stars.setValue(0);
        }

        this.removeRadioCheck_();
    };


    /**
     * Sets up the Component.
     * @public
     */
    FeedbackModal.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var handler = this.getHandler();

        handler.listen(
            this.elements_.button,
            goog.events.EventType.CLICK,
            this.formSubmit_
        );

        this.initDropdownListeners_(handler);
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    FeedbackModal.prototype.createDom = function() {
        var elem = goog.soy.renderAsElement(
            sm.lSchool.bFeedbackModal.Template.feedback, {
                params: this.params_
            });

        this.decorateInternal(elem);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     * @public
     */
    FeedbackModal.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var factory = sm.iFactory.FactoryStendhal.getInstance();

        this.elements_ = {
            radio: this.getElementsByClass(FeedbackModal.CssClass.RADIO),
            button: this.getElementByClass(cl.gButton.View.CssClass.ROOT),
            form: this.getElementByClass(FeedbackModal.CssClass.FORM),
            classSelect: this.getElementByClass(
                FeedbackModal.CssClass.CLASS_TYPE_SELECT
            ),
            graduationYear: this.getElementByClass(
                FeedbackModal.CssClass.GRADUATION_YEAR
            ),
            parentText: this.getElementByClass(
                FeedbackModal.CssClass.TEXT_PARENT
            ),
            studentText: this.getElementByClass(
                FeedbackModal.CssClass.TEXT_STUDENT
            ),
            errors: this.getElementByClass(
                FeedbackModal.CssClass.VALIDATION_ERRORS
            )
        };

        this.modal_ = factory.decorate(
            'modal',
            this.getElementByClass(cl.gModal.View.CssClass.ROOT),
            this
        );

        this.textarea_ = factory.decorate(
            'textarea',
            goog.dom.getElementByClass(
                cl.gTextarea.View.CssClass.ROOT,
                this.modal_.getElement()
            ),
            this
        );

        this.stars_ = this.initStars_(
            goog.dom.getElementsByClass(
                sm.bStars.Stars.CssClass.ROOT,
                this.modal_.getElement()
            )
        );

        this.yearGraduate_ = factory.decorate(
            'digit-input',
            goog.dom.getElementByClass(
                cl.gInput.View.CssClass.ROOT,
                this.modal_.getElement()
            )
        );

        this.initDropdowns_(factory);

        this.awaitClientId_();
    };

    /**
     * await for cookie value
     * @private
     */
    FeedbackModal.prototype.awaitClientId_ = function() {
        this.clientIdPromise_ = new goog.Promise(function(resolve, reject) {
            this.evercookie_.getClientId(function(clientId) {
                resolve(clientId);
            });
        }, this);
    };

    /**
     * dropdowns initialization
     * @param {sm.iFactory.FactoryStendhal} factory
     * @private
     */
    FeedbackModal.prototype.initDropdowns_ = function(factory) {
        var userTypeElement = goog.dom.getElementByClass(
            cl.gDropdown.View.CssClass.ROOT,
            this.modal_.getElementByClass(
                FeedbackModal.CssClass.USER_TYPE_SELECT
            )
        );

        this.dropdowns_.userType = factory.decorate(
            'dropdown-select',
            userTypeElement,
            this
        );

        var classTypeElement = goog.dom.getElementByClass(
            cl.gDropdown.View.CssClass.ROOT,
            this.modal_.getElementByClass(
                FeedbackModal.CssClass.CLASS_TYPE_SELECT
            )
        );

        this.dropdowns_.classType = factory.decorate(
            'dropdown-select',
            classTypeElement,
            this
        );
    };

    /**
     * stars initialization
     * @param {Array.<Element>} elements
     * @return {Array}
     * @private
     */
    FeedbackModal.prototype.initStars_ = function(elements) {
        var res = [],
            elem,
            star;

        for (var i = 0, n = elements.length; i < n; i++) {
            elem = elements[i];
            star = new sm.bStars.Stars({
                data: {
                    mark: 0
                },
                config: {
                    isClickable: true
                }
            });
            this.addChild(star);
            star.decorate(elem);
            res.push(star);
        }

        return res;
    };

    /**
     * Listeners for close control initialization
     * @param {Object=} handler
     * @private
     */
    FeedbackModal.prototype.initDropdownListeners_ = function(handler) {
        handler.listen(
            this.dropdowns_.userType,
            sm.gDropdown.DropdownSelect.Event.ITEM_SELECT,
            this.onUserTypeClick_
        );
    };

    /**
     * Handler for click on user type select
     * @param {Object} event
     * @private
     */
    FeedbackModal.prototype.onUserTypeClick_ = function(event) {
        var itemId = event['itemId'];

        switch (itemId) {
            case 0:
                this.showHideClassSelect_(true);
                this.showHideGraduationYear_();
                break;
            case 1:
                this.showHideClassSelect_();
                this.showHideGraduationYear_(true);
                break;
            case 2:
                this.showHideClassSelect_(true, true);
                this.showHideGraduationYear_();
                break;
        }
    };

    /**
     * Show or hide Class select element
     * @param {boolean} opt_showClasses - show element if true
     * and hide if false or undefined
     * @param {boolean} opt_showStudentText - show student text if true
     * and parent if false or not defined
     * @private
     */
    FeedbackModal.prototype.showHideClassSelect_ =
        function(opt_showClasses, opt_showStudentText) {
        if (opt_showClasses) {
            goog.dom.classes.remove(
                this.elements_.classSelect,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
            if (opt_showStudentText) {
                goog.dom.classes.remove(
                    this.elements_.studentText,
                    cl.iUtils.Utils.CssClass.HIDDEN
                );
                goog.dom.classes.add(
                    this.elements_.parentText,
                    cl.iUtils.Utils.CssClass.HIDDEN
                );
            } else {
                goog.dom.classes.add(
                    this.elements_.studentText,
                    cl.iUtils.Utils.CssClass.HIDDEN
                );
                goog.dom.classes.remove(
                    this.elements_.parentText,
                    cl.iUtils.Utils.CssClass.HIDDEN
                );
            }
        } else {
            goog.dom.classes.add(
                this.elements_.classSelect,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
            this.dropdowns_.classType.close();
        }
    };

    /**
     * Show or hide Graduation input block
     * @param {boolean} opt_showInput - if true show element,
     * if false or undefined - hide
     * @private
     */
    FeedbackModal.prototype.showHideGraduationYear_ = function(opt_showInput) {
        if (opt_showInput) {
            goog.dom.classes.remove(
                this.elements_.graduationYear,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
        } else {
            this.yearGraduate_.clear();
            goog.dom.classes.add(
                this.elements_.graduationYear,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
        }
    };

    /**
     * Submit event handler
     * @private
     */
    FeedbackModal.prototype.formSubmit_ = function() {
        if (this.isValid_()) {
            var that = this;

            this.clientIdPromise_.then(function(clientId) {
                that.send_(clientId, function() {
                    that.updateCommentsAnalytics_();
                    location.reload();
                });
            });
        }
    };

    /**
     * Set analytics accounting comments
     * @private
     */
    FeedbackModal.prototype.updateCommentsAnalytics_ = function() {
        this.sendAnalyticsSchoolName_();
        this.sendAnalyticsUserData_();
        this.sendAnalyticsScore_();
    };

    /**
     * Send analytics schoolName
     * @private
     */
    FeedbackModal.prototype.sendAnalyticsSchoolName_ = function() {
        var schoolName = this.params_.data['schoolName'];

        this.sendAnalyticsEvent_(
            FeedbackModal.AnalyticsAction.REVIEW_SUBMIT,
            schoolName,
            100
        );
    };

    /**
     * send analytics user data
     * @private
     */
    FeedbackModal.prototype.sendAnalyticsUserData_ = function() {
        var dataForm = this.getFormData_(),
            userType = this.dropdowns_.userType.getValue();

        this.sendAnalyticsEvent_(
            FeedbackModal.AnalyticsAction.ROLE_CHOISE,
            this.formatUserTypeToAnalytics_(userType)
        );

        if (this.isYearChoise_(userType)) {
            this.sendAnalyticsEvent_(
                FeedbackModal.AnalyticsAction.YEAR_CHOICE,
                dataForm['classType']
            );
        }
        else {
            this.sendAnalyticsEvent_(
                FeedbackModal.AnalyticsAction.GRADUATION_CHOICE,
                dataForm['yearGraduate']
            );
        }
    };

    /**
     * get graduation year or class of user
     * @param {String} userType
     * @return {Boolean}
     * @private
     */
    FeedbackModal.prototype.isYearChoise_ = function(userType) {
        var result;

        if (userType == FeedbackModal.UserType.PARENT ||
            userType == FeedbackModal.UserType.STUDENT) {
            result = true;
        }
        else if (userType == FeedbackModal.UserType.ALUMNI) {
            result = false;
        }
        return result;
    };

    /**
     * get formatted for the analyst user type
     * @param {String} userType
     * @return {String}
     * @private
     */
    FeedbackModal.prototype.formatUserTypeToAnalytics_ = function(userType) {
        var dictionary = {};
        dictionary[FeedbackModal.UserType.ALUMNI] = 'alumni';
        dictionary[FeedbackModal.UserType.PARENT] = 'parent';
        dictionary[FeedbackModal.UserType.STUDENT] = 'student';

        return dictionary[userType];
    };

    /**
     * Send analytics all score
     * @private
     */
    FeedbackModal.prototype.sendAnalyticsScore_ = function() {
        var dataForm = this.getFormData_();

        var scoreName = [
            FeedbackModal.AnalyticsAction.STAR_EDUCATION,
            FeedbackModal.AnalyticsAction.STAR_TEACHER,
            FeedbackModal.AnalyticsAction.STAR_ATMOSPHERE,
            FeedbackModal.AnalyticsAction.STAR_INFRASTUCTURE
        ];

        for (var i = 0; i < scoreName.length; i++) {
            this.sendAnalyticsEvent_(scoreName[i], dataForm['score'][i]);
        }
    };

    /**
     * Send data comment analytics
     * @param {string} action
     * @param {string} label
     * @param {number=} opt_value
     * @private
     */
    FeedbackModal.prototype.sendAnalyticsEvent_ = function(
        action, label, opt_value) {

        var dataAnalytics = {
            hitType: 'event',
            eventCategory: 'review',
            eventAction: action,
            eventLabel: label
        };

        if (opt_value) {
            dataAnalytics.eventValue = opt_value;
        }

        Analytics.send(dataAnalytics);
    };

    /**
     * Sends form using jQuery.ajax
     * @param {string} clientId
     * @param {Function=} opt_callback
     * @private
     */
    FeedbackModal.prototype.send_ = function(clientId, opt_callback) {
        var data = this.getFormData_();
        data['key'] = clientId;
        data['_csrf'] = window['ctx']['csrf'];

        var form = jQuery(this.elements_.form);

        jQuery.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: opt_callback ? opt_callback : function() {},
            error: this.onError_.bind(this)
        });
    };

    /**
     * ajax error handler
     * @param {object} response
     * @private
     */
    FeedbackModal.prototype.onError_ = function(response) {
        this.showValidationError_(JSON.parse(response.responseText)[0].message);
    };

    /**
     * Modal data validation
     * @return {boolean}
     * @private
     */
    FeedbackModal.prototype.isValid_ = function() {
        var isValid = false,
            isValidOpt = false;

        var dataForm = this.getFormData_();

        this.dropdowns_.userType.getView().unsetNotValidState();

        if (dataForm['userType'] != null) {
            isValid = true;

            isValidOpt = this.validateComment_(dataForm);

        } else {
            dataForm['userType'].setNotValidState();
            this.showValidationError_(FeedbackModal.Error.TYPE_REQUIRED);
        }
        return (isValid && isValidOpt);
    };

    /**
     * Get data form
     * @return {Object}
     * @private
     */
    FeedbackModal.prototype.getFormData_ = function() {
        return {
            'userType' : this.getFormDataUserType_(),
            'classType' : this.getFormDataClassType_(),
            'text': this.getFormDataText_(),
            'yearGraduate': this.getFormDataYearGraduate_(),
            'score': this.getFormDataScore_()
        };
    };

    /**
     * get formatted user type
     * @return {String}
     * @private
     */
    FeedbackModal.prototype.getFormDataUserType_ = function() {
        var dictionary = {};
        dictionary[FeedbackModal.UserType.ALUMNI] = 'Graduate';
        dictionary[FeedbackModal.UserType.PARENT] = 'Parent';
        dictionary[FeedbackModal.UserType.STUDENT] = 'Scholar';

        var userType = this.dropdowns_.userType.getValue();
        return dictionary[userType];
    };

    /**
     * get formatted data on user class
     * @return {Number}
     * @private
     */
    FeedbackModal.prototype.getFormDataClassType_ = function() {
        var classType = this.dropdowns_.classType.getValue();
        return classType ? classType + 1 : '';
    };

    /**
     * get formatted text comment
     * @return {String}
     * @private
     */
    FeedbackModal.prototype.getFormDataText_ = function() {
        var form = jQuery(this.elements_.form),
            data = form.serializeArray();

        var text = goog.array.find(data, function(item) {
            return (item.name == 'text');
        });

        return text.value;
    };

    /**
     * get formatted year graduation
     * @return {Number}
     * @private
     */
    FeedbackModal.prototype.getFormDataYearGraduate_ = function() {
        var form = jQuery(this.elements_.form),
            data = form.serializeArray();

        var yearGraduate = goog.array.find(data, function(item) {
            return (item.name == 'yearGraduate');
        });

        return yearGraduate.value;
    };

    /**
     * get score user
     * @return {Number}
     * @private
     */
    FeedbackModal.prototype.getFormDataScore_ = function() {
        var form = jQuery(this.elements_.form),
            data = form.serializeArray();

        var scores = goog.array.filter(data, function(item) {
            return (item.name == 'score');
        });

        return scores.map(function(item) {
            return item.value;
        });
    };

    /**
     * Validate text in textarea,
     * then call next validate function or return false
     * @param {Object} formData
     * @return {boolean}
     * @private
     */
    FeedbackModal.prototype.validateComment_ = function(formData) {
        var isValid = false,
            commentText = formData['text'];

        if (commentText.trim()) {
            isValid = this.validateGraduateInput_(formData['yearGraduate']);
        } else {
            isValid = this.validateScore_(formData);
        }

        return isValid;
    };

    /**
     * Validate score item
     * @param {Object} formData
     * @return {boolean}
     * @private
     */
    FeedbackModal.prototype.validateScore_ = function(formData) {
        var isValid = false;

        for (var i = 0, len = formData['score'].length, scoreItem; i < len; i++) {
            scoreItem = formData['score'][i];
            if (parseInt(scoreItem)) {
                isValid = true;
            }
        }

        if (!isValid) {
            this.showValidationError_(
                FeedbackModal.Error.RATING_REQUIRED
            );
        } else {
            isValid = this.validateGraduateInput_(formData['yearGraduate']);
        }

        return isValid;
    };

    /**
     * Validate input with year of graduate
     * @param {number} value
     * @private
     * @return {boolean}
     */
    FeedbackModal.prototype.validateGraduateInput_ = function(value) {
        var userType = this.dropdowns_.userType.getValue(),
            isValid = false,
            yearRegex = /[\d][\d][\d][\d]/;

        if (userType == 1) {
            if (value) {
                if (yearRegex.test(value)) {
                    isValid = true;
                    this.yearGraduate_.getView().removeNotValidModifier();
                } else {
                    this.yearGraduate_.getView().addNotValidModifier();
                    this.showValidationError_(
                        FeedbackModal.Error.WRONG_GRADUATION_YEAR
                    );
                }
            } else {
                isValid = true;
            }
        } else {
            isValid = true;
        }

        return isValid;
    };

    /**
     * removes 'checked' attribute from radio
     * @private
     */
    FeedbackModal.prototype.removeRadioCheck_ = function() {
        for (var i = 0, radio; i < this.elements_.radio.length; i++) {
            radio = this.elements_.radio[i];

            if (radio.checked) {
                radio.checked = false;
            }
        }
    };

    /**
     * Show error
     * @param {string} error
     * @private
     */
    FeedbackModal.prototype.showValidationError_ = function(error) {
        this.getDomHelper().setTextContent(
            this.elements_.errors,
            error
        );

        goog.dom.classes.remove(
            this.elements_.errors,
            cl.iUtils.Utils.CssClass.HIDDEN
        );

    };

    /**
     * Hide errors
     * @private
     */
    FeedbackModal.prototype.hideValidationError_ = function() {
        this.getDomHelper().setTextContent(
            this.elements_.errors,
            ''
        );
        goog.dom.classes.add(
            this.elements_.errors,
            cl.iUtils.Utils.CssClass.HIDDEN
        );
    };
});
