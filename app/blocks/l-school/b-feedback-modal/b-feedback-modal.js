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
    this.dropdownInstances_ = {};

    /**
     * Close control element
     * @type {element}
     * @private
     */
    this.closeElement_ = null;
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
        'USER_TYPE_SELECT': 'b-feedback__user-type',
        'CLASS_TYPE_SELECT': 'b-feedback__class-select',
        'TEXT_STUDENT': 'b-feedback__text_student',
        'TEXT_PARENT': 'b-feedback__text_parent',
        'GRADUATION_YEAR': 'b-feedback__graduation-year',
        'CLOSE_CONTROL': 'b-icon__content',
        'CLOSE_CONTROL_IMG_HOVERED': 'b-icon_img_close-dialog-hovered',
        'CLOSE_CONTROL_IMG': 'b-icon_img_close-dialog'
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

        this.getHandler().listen(
            this.elements_.button,
            goog.events.EventType.CLICK,
            this.formSubmit_
        );

        this.getHandler().listen(
            this.closeElement_,
            goog.events.EventType.MOUSEOVER,
            this.onCrossHover_
        );

        this.getHandler().listen(
            this.closeElement_,
            goog.events.EventType.MOUSEOUT,
            this.onCrossHover_
        );

        this.getHandler().listen(
            this.closeElement_,
            goog.events.EventType.CLICK,
            this.onCrossClick_
        );

        this.getHandler().listen(
            this.dropdownInstances_.userType,
            sm.gDropdownSelect.DropdownSelect.Event.ITEM_SELECT,
            this.onUserTypeClick_
        );

        this.getHandler().listen(
            this.dropdownInstances_.classType,
            sm.gDropdownSelect.DropdownSelect.Event.CONTROL_CLICK,
            this.hideUserType_
        );

        this.getHandler().listen(
            this.dropdownInstances_.userType,
            sm.gDropdownSelect.DropdownSelect.Event.CONTROL_CLICK,
            this.hideClassType_
        );
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

        this.closeElement_ = goog.dom.getElementByClass(
            FeedbackModal.CssClass.CLOSE_CONTROL,
            this.modal_.getElement()
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
        this.dropdownInstances_.userType = factory.decorate(
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

        this.dropdownInstances_.classType = factory.decorate(
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
        } else {
            this.hide();
        }

        this.clean();
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
                this.showClassSelect_(true);
                this.showGraduationYear_();
                break;
            case 1:
                this.showClassSelect_();
                this.showGraduationYear_(true);
                break;
            case 2:
                this.showClassSelect_(true, true);
                this.showGraduationYear_();
                break;
        }
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
        console.log('User type closes');
        this.dropdownInstances_.userType.close();
    };

    /**
     * Close class type dropdown
     * @private
     */
    FeedbackModal.prototype.hideClassType_ = function() {
        console.log('Class type closes');
        this.dropdownInstances_.classType.close();
    };

    /**
     * Show or hide Class select element
     * @param {boolean} opt_showClasses - show element if true
     * and hide if false or undefined
     * @param {boolean} opt_showStudentText - show student text if true
     * and parent if false or not defined
     * @private
     */
    FeedbackModal.prototype.showClassSelect_ = function(
        opt_showClasses, opt_showStudentText) {
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
            this.dropdownInstances_.classType.close();
        }

    };
    /**
     * Show or hide Graduation input block
     * @param {boolean} opt_showInput - if 'show' show element,
     * if false or undefined - hide
     * @private
     */
    FeedbackModal.prototype.showGraduationYear_ = function(opt_showInput) {
        if (opt_showInput) {
            goog.dom.classes.remove(
                this.elements_.graduationYear,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
        } else {
            goog.dom.classes.add(
                this.elements_.graduationYear,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * Sends form using jQuery.ajax
     * @param {Element} form
     * @param {Function=} opt_callback
     * @private
     */
    FeedbackModal.prototype.send_ = function(form, opt_callback) {
        jQuery.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: form.serialize(),
            success: opt_callback ? opt_callback : function() {}
        });
    };

    /**
     * data validation
     * @param {Array.<Object>} data
     * @return {boolean}
     * @private
     */
    FeedbackModal.prototype.isValid_ = function(data) {
        var isValid = false,
            isValidOpt = false;

        /** list of parameters for validate */
        var validateList = {
            'text': function(value) {
                if (value.trim()) {
                    isValidOpt = true;
                }
            },
            'score': function(value) {
                if (parseInt(value)) {
                    isValidOpt = true;
                }
            },
            'userType': function(value) {
                if (value.trim()) {
                    isValid = true;
                }
            }
        };

        /** checks parameters */
        for (var i = 0, item; item = data[i]; i++) {
            var value = item.value,
                name = item.name;

            validateList[name](value);
        }

        return (isValid && isValidOpt);
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
});
