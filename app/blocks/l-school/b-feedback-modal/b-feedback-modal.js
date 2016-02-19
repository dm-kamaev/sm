goog.provide('sm.lSchool.bFeedbackModal.FeedbackModal');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('goog.ui.Component');
goog.require('sm.bStars.Stars');
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
};
goog.inherits(sm.lSchool.bFeedbackModal.FeedbackModal, goog.ui.Component);

goog.scope(function() {
    var FeedbackModal = sm.lSchool.bFeedbackModal.FeedbackModal;
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
        'CLOSE_CONTROL': 'b-icon',
        'CLOSE_CONTROL_IMG_HOVERED': 'b-icon_img_close-dialog-hovered',
        'CLOSE_CONTROL_IMG': 'b-icon_img_close-dialog',
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

        handler.listen(
            this.yearGraduate_,
            sm.gInput.DigitInput.Event.FOCUS,
            this.onFocusInput_
        );

        this.initCLoseControlListeners_(handler);

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
            close: this.getElementByClass(FeedbackModal.CssClass.CLOSE_CONTROL),
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
    FeedbackModal.prototype.initCLoseControlListeners_ = function(handler) {
        handler.listen(
            this.elements_.close,
            goog.events.EventType.MOUSEOVER,
            this.onCrossHover_
        );

        handler.listen(
            this.elements_.close,
            goog.events.EventType.MOUSEOUT,
            this.onCrossHover_
        );

        handler.listen(
            this.elements_.close,
            goog.events.EventType.CLICK,
            this.onCrossClick_
        );
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

        handler.listen(
            this.dropdowns_.classType,
            cl.gDropdown.Dropdown.Event.OPENER_CLICK,
            this.hideUserType_
        );

        handler.listen(
            this.dropdowns_.userType,
            cl.gDropdown.Dropdown.Event.OPENER_CLICK,
            this.hideClassType_
        );
    };

    /**
     * Handler for hover over close element
     * @private
     */
    FeedbackModal.prototype.onCrossHover_ = function() {
        goog.dom.classes.toggle(
            this.elements_.close,
            FeedbackModal.CssClass.CLOSE_CONTROL_IMG
        );
        goog.dom.classes.toggle(
            this.elements_.close,
            FeedbackModal.CssClass.CLOSE_CONTROL_IMG_HOVERED
        );
    };

    /**
     * Handler for click over close element
     * @private
     */
    FeedbackModal.prototype.onCrossClick_ = function() {
        this.hide();
    };

    /**
     * Handler for click on user type select
     * @param {Object} event
     * @private
     */
    FeedbackModal.prototype.onUserTypeClick_ = function(event) {
        var itemId = event.itemId;

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
     * Input focus handler
     * @private
     */
    FeedbackModal.prototype.onFocusInput_ = function() {
        this.closeDropdowns_();
    };

    /**
     * Close all opened dropdowns
     * @private
     */
    FeedbackModal.prototype.closeDropdowns_ = function() {
        this.hideClassType_();
        this.hideUserType_();
    };

    /**
     * Close user type dropdown
     * @private
     */
    FeedbackModal.prototype.hideUserType_ = function() {
        this.dropdowns_.userType.close();
    };

    /**
     * Close class type dropdown
     * @private
     */
    FeedbackModal.prototype.hideClassType_ = function() {
        this.dropdowns_.classType.close();
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
        var form = jQuery(this.elements_.form),
            data = form.serializeArray();
        if (this.isValid_(data)) {
            this.send_(form, function() {
                location.reload();
            });
        }
    };

    /**
     * Sends form using jQuery.ajax
     * @param {Element} form
     * @param {Function=} opt_callback
     * @private
     */
    FeedbackModal.prototype.send_ = function(form, opt_callback) {
        var data = form.serialize();
        switch (this.dropdowns_.userType.getValue()) {
            case 0:
                data += '&userType=Parent';
                break;
            case 1:
                data += this.dropdowns_.classType.getValue() ?
                    '&class=' + this.dropdowns_.classType.getValue() :
                    '&class=0';
                data += '&userType=Graduate';
                break;
            case 2:
                data += this.dropdowns_.classType.getValue() ?
                    '&class=' + this.dropdowns_.classType.getValue() :
                    '&class=0';
                data += '&userType=Scholar';
                break;
        }
        jQuery.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: data,
            success: opt_callback ? opt_callback : function() {}
        });
    };

    /**
     * Modal data validation
     * @param {Array.<Object>} data
     * @return {boolean}
     * @private
     */
    FeedbackModal.prototype.isValid_ = function(data) {
        var isValid = false,
            isValidOpt = false,
            userType = this.dropdowns_.userType.getValue();
            this.dropdowns_.userType.getView().removeNotSelectedModifier();

        this.hideValidationError_();

        if (userType != null) {
            isValid = true;

            var dataToValidate = {
                    'textArea': '',
                    'yearGraduate': '',
                    'score': []
                };

            for (var i = 0, item; item = data[i]; i++) {
                var value = item.value,
                    name = item.name;

                /** Take values for each check criterion  **/
                switch (name) {
                    case 'text':
                        dataToValidate.textArea = value;
                        break;
                    case 'year-graduate':
                        dataToValidate.yearGraduate = value;
                        break;
                    case 'score':
                        dataToValidate.score.push(value);
                        break;
                }
            }

            isValidOpt = this.validateComment_(dataToValidate);

        } else {
            this.dropdowns_.userType.getView().addNotSelectedModifier();
            this.showValidationError_(FeedbackModal.Error.TYPE_REQUIRED);
        }
        return (isValid && isValidOpt);
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
            commentText = formData.textArea;

        if (commentText.trim()) {
            if (commentText.length <= 300) {
                isValid = this.validateGraduateInput_(formData.yearGraduate);
            } else {
                this.showValidationError_(FeedbackModal.Error.COMMENT_TOO_LONG);
            }
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

        for (var i = 0, l = formData.score.length, scoreItem;
            i < l, scoreItem = formData.score[i]; i++) {
            if (parseInt(scoreItem)) {
                isValid = true;
            }
        }

        if (!isValid) {
            this.showValidationError_(
                FeedbackModal.Error.RATING_REQUIRED
            );
        } else {
            isValid = this.validateGraduateInput_(formData.yearGraduate);
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
        console.log('Validate input started!');
        var userType = this.dropdowns_.userType.getValue(),
            isValid = false,
            yearRegex = /[\d][\d][\d][\d]/;
        console.log(userType);
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
