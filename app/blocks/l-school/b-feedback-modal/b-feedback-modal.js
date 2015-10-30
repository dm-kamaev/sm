goog.provide('sm.lSchool.bFeedbackModal.FeedbackModal');

goog.require('goog.ui.Component');

goog.require('sm.bStars.Stars');
goog.require('sm.lSchool.bFeedbackModal.Template');

goog.require('gorod.bModal.Modal');
goog.require('gorod.bModal.Template');
goog.require('gorod.bTextarea.Textarea');


sm.lSchool.bFeedbackModal.FeedbackModal = function(opt_params) {
    goog.base(this);

    this.params_ = opt_params || {};

    this.modal_ = gorod.bModal.Modal.create('', {
        config: {
            customClasses: 'b-modal_feedback'
        }
    });
};
goog.inherits(sm.lSchool.bFeedbackModal.FeedbackModal, goog.ui.Component);


goog.scope(function() {
    var FeedbackModal = sm.lSchool.bFeedbackModal.FeedbackModal;


    FeedbackModal.CssClass = {
        'FEEDBACK': 'b-feedback',
        'MODAL': 'b-modal_feedback',
        'BUTTON': 'b-feedback__button'
    };


    FeedbackModal.prototype.show = function() {
        this.modal_.show();
        this.textarea_.setValue('');
        this.stars_.forEach(function(stars) {
            stars.setValue(0);
        });
    };


    FeedbackModal.prototype.hide = function() {
        this.modal_.hide();
    };


    /**
     * @overwrite
     */
    FeedbackModal.prototype.render = function() {
        goog.base(this, 'render', this.getContainer_());
    };


    /**
     * @overwrite
     */
    FeedbackModal.prototype.createDom = function() {
        var elem = goog.soy.renderAsElement(
            sm.lSchool.bFeedbackModal.Template.feedback, {
                params: this.params_
            });

        this.decorateInternal(elem);
    };


    /**
     * @overwrite
     */
    FeedbackModal.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.elements_ = {
            stars: goog.dom.getElementsByClass(
                sm.bStars.Stars.CssClass.ROOT, element
            ),
            /**
             * TODO: Add 'b-textarea' to gorod.bTextarea.Textarea.Classes.ROOT
             */
            textarea: goog.dom.getElementByClass(
                'b-textarea', element
            )
        };

        this.stars_ = this.initStars_(this.elements_.stars);
    };


    /**
     * @overwrite
     */
    FeedbackModal.prototype.enterDocument = function() {
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
     * @overwrite
     */
    FeedbackModal.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        goog.events.unlisten(
            this.getElement(),
            goog.events.EventType.SUBMIT,
            this.onSubmit_,
            false,
            this
        );
    };


    FeedbackModal.prototype.initStars_ = function(elems) {
        var res = [],
            elem,
            star;

        for (var i = 0, n = elems.length; i < n; i++) {
            elem = elems[i];
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


    FeedbackModal.prototype.onSubmit_ = function(event) {
        event.preventDefault();

        this.submit_();
    };


    FeedbackModal.prototype.submit_ = function() {
        var form = jQuery(this.getElement());

        var data = form.serializeArray(),
            score = 0,
            text = "";

        /**
         * TODO: rewrite this trash
         */
        for (var i = 0, n = data.length, item; i < n; i++) {
            item = data[i];
            if (item.name == 'score[]') {
                score += parseInt(item.value);
            } else if (item.name == 'text') {
                text = item.value.trim();
            }
        }

        if (score || text) {
            jQuery.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: form.serialize(),
                success: function(data) {
                    location.reload();
                }
            });
        }
        else {
            this.hide();
        }
    };


    /**
     * Get modal container element
     * TODO: Do something about this terrible method
     * @return {Element}
     * @private
     */
    FeedbackModal.prototype.getContainer_ = function() {
        return this.modal_
            .getRoot()
            .find('.b-dialog__body')
            .get(0);
    };
});
