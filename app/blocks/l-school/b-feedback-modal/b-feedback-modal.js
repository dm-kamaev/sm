goog.provide('sm.lSchool.bFeedbackModal.FeedbackModal');

goog.require('goog.ui.Component');
goog.require('goog.dom.classes');

goog.require('sm.bStars.Stars');
goog.require('sm.lSchool.bFeedbackModal.Template');

goog.require('gorod.bModal.Modal');
goog.require('gorod.bModal.Template');
goog.require('gorod.bTextarea.Textarea');


/**
 * Feedback modal
 * @param opt_params
 * @constructor
 * @inherits goog.ui.Component
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
     * modal
     * @type {gorod.bModal.Modal}
     * @private
     */
    this.modal_ = gorod.bModal.Modal.create('', {
        config: {
            customClasses: 'b-modal_feedback'
        }
    });
};
goog.inherits(sm.lSchool.bFeedbackModal.FeedbackModal, goog.ui.Component);

goog.scope(function() {
    var FeedbackModal = sm.lSchool.bFeedbackModal.FeedbackModal;

    /**
     * CSS-class enum
     * @enum {string}
     */
    FeedbackModal.CssClass = {
        'FEEDBACK': 'b-feedback',
        'MODAL': 'b-modal_feedback',
        'BUTTON': 'b-feedback__button',
        'RADIO': 'b-feedback__radio',
        'DIALOG_BODY': 'b-dialog__body'
    };

    /**
     * shows modal window
     * @public
     */
    FeedbackModal.prototype.show = function () {
        this.modal_.show();
    };

    /**
     * hides modal window
     * @public
     */
    FeedbackModal.prototype.hide = function () {
        this.modal_.hide();
    };

    /**
     * From cleaning
     * @public
     */
    FeedbackModal.prototype.clean = function() {
        this.textarea_.setValue('');

        for (var i = 0, stars; stars = this.stars_[i]; i++) {
            stars.setValue(0);
        }

        this.removeRadioCheck_();
    };

    /**
     * Component render
     * @public
     */
    FeedbackModal.prototype.render = function () {
        var modalDialog = this.modal_.getDialog()[0],
            modalDialogBody = goog.dom.getElementByClass(
                FeedbackModal.CssClass.DIALOG_BODY,
                modalDialog
            );

        goog.base(this, 'render', modalDialogBody);
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    FeedbackModal.prototype.createDom = function () {
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
    FeedbackModal.prototype.decorateInternal = function (element) {
        goog.base(this, 'decorateInternal', element);

        goog.dom.getParentElement(element).style.display = 'none';

        this.elements_ = {
            stars: goog.dom.getElementsByClass(
                sm.bStars.Stars.CssClass.ROOT,
                element
            ),
            /**
             * TODO: Add 'b-textarea' to gorod.bTextarea.Textarea.Classes.ROOT
             */
            textarea: goog.dom.getElementByClass(
                'b-textarea', element
            ),

            radio: goog.dom.getElementsByClass(
                FeedbackModal.CssClass.RADIO,
                element
            )
        };

        this.stars_ = this.initStars_(this.elements_.stars);
    };

    /**
     * Sets up the Component.
     * @public
     */
    FeedbackModal.prototype.enterDocument = function () {
        goog.base(this, 'enterDocument');

        this.textarea_ = new gorod.bTextarea.Textarea(this.elements_.textarea);

        goog.events.listen(
            this.getElement(),
            goog.events.EventType.SUBMIT,
            this.onSubmit_,
            false,
            this
        );
    };

    /**
     * Cleans up the Component.
     * @public
     */
    FeedbackModal.prototype.exitDocument = function () {
        goog.base(this, 'exitDocument');

        goog.events.unlisten(
            this.getElement(),
            goog.events.EventType.SUBMIT,
            this.onSubmit_,
            false,
            this
        );
    };

    /**
     * stars initialization
     * @param {Array.<Element>} elements
     * @returns {Array}
     * @private
     */
    FeedbackModal.prototype.initStars_ = function (elements) {
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
            star.decorate(elem);
            res.push(star);
        }

        return res;
    };

    /**
     * Submit event handler
     * @param {Function} event
     * @private
     */
    FeedbackModal.prototype.onSubmit_ = function (event) {
        event.preventDefault();

        this.submit_();
    };

    /**
     * Sends form using jQuery.ajax
     * @param {Element} form
     * @param {Function=} opt_callback
     * @private
     */
    FeedbackModal.prototype.send_ = function (form, opt_callback) {
        jQuery.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: form.serialize(),
            success: opt_callback || function () {}
        });
    };

    /**
     * data validation
     * @param {Array.<Object>} data
     * @returns {boolean}
     * @private
     */
    FeedbackModal.prototype.isValid_ = function(data) {
        var isValid = false,
            isValidOpt = false;

        /** list of parameters for validate */
        var validateList = {
            'text': function (value) {
                if (value.trim()) {
                    isValidOpt = true;
                }
            },
            'score[]': function(value) {
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
        for(var i = 0, radio; i < this.elements_.radio.length; i++) {
            radio = this.elements_.radio[i];

            if(radio.checked) {
                radio.checked = false;
            }
        }
    };

    /**
     * Submit form
     * @private
     */
    FeedbackModal.prototype.submit_ = function () {
        var form = jQuery(this.getElement()),
            data = form.serializeArray();

        if (this.isValid_(data)) {
            this.send_(form, function(){
                location.reload();
            });
        } else {
            this.hide();
            /**
             * TODO: remove scroll bug
             */
            location.reload();
        }

        this.clean();
    };
});
