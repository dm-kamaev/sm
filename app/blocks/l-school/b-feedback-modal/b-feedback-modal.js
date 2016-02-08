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
        'BUTTON': 'b-feedback__button',
        'RADIO': 'b-feedback__radio'
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
            form: this.getElementByClass(FeedbackModal.CssClass.FORM)
        };

        this.textarea_ = factory.decorate(
            'textarea',
            this.getElementByClass(cl.gTextarea.View.CssClass.ROOT),
            this
        );

        this.stars_ = this.initStars_(
            this.getElementsByClass(sm.bStars.Stars.CssClass.ROOT)
        );

        this.modal_ = factory.decorate(
            'modal',
            this.getElementByClass(cl.gModal.View.CssClass.ROOT),
            this
        );
    };

    /**
     * Sets up the Component.
     * @public
     */
    FeedbackModal.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.elements_.form,
            goog.events.EventType.SUBMIT,
            this.onSubmit_
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
     * @param {Function} event
     * @private
     */
    FeedbackModal.prototype.onSubmit_ = function(event) {
        event.preventDefault();

        this.submit_();
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

    /**
     * Submit form
     * @private
     */
    FeedbackModal.prototype.submit_ = function() {
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
});
