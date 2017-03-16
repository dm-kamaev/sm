goog.provide('sm.bSmInteractionForm.ViewComment');

goog.require('cl.iUtils.Utils');
goog.require('sm.bSmInteractionForm.View');


goog.scope(function() {



    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {sm.bSmInteractionForm.View}
     */
    sm.bSmInteractionForm.ViewComment = function(opt_params, opt_type,
        opt_modifier) {

        sm.bSmInteractionForm.ViewComment.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(
        sm.bSmInteractionForm.ViewComment,
        sm.bSmInteractionForm.View
    );
    var View = sm.bSmInteractionForm.ViewComment;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-interaction-form_comment',
        FIELD_YEAR_WRAP: 'b-sm-interaction-form__field-wrap_year-graduate',
        FIELD_GRADE_WRAP: 'b-sm-interaction-form__field-wrap_grade',
        FIELD_DEFAULT: 'b-sm-interaction-form__field-item_default',
        FIELD_USER_TYPE: 'b-sm-interaction-form__field-item_user-type',
        FIELD_YEAR: 'b-sm-interaction-form__field-item_year-graduate',
        FIELD_GRADE: 'b-sm-interaction-form__field-item_grade'
    };


    /**
     * Set year field visibility
     * @param {boolean} visible
     * @public
     */
    View.prototype.setYearFieldVisibility = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.yearFieldWrap,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.yearFieldWrap,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


    /**
     * Set grade field visibility
     * @param {boolean} visible
     * @public
     */
    View.prototype.setGradeFieldVisibility = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.gradeFieldWrap,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.gradeFieldWrap,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.yearFieldWrap = this.getElementByClass(
            View.CssClass.FIELD_YEAR_WRAP
        );

        this.dom.gradeFieldWrap = this.getElementByClass(
            View.CssClass.FIELD_GRADE_WRAP
        );

        this.dom.userTypeField = this.getElementByClass(
            View.CssClass.FIELD_USER_TYPE
        );

        this.dom.yearField = this.getElementByClass(
            View.CssClass.FIELD_YEAR
        );

        this.dom.gradeField = this.getElementByClass(
            View.CssClass.FIELD_GRADE
        );

        this.dom.fields = this.getElementsByClass(
            View.CssClass.FIELD_DEFAULT
        );

        this.dom.stars = this.getElementsByClass(
            sm.bSmStars.View.CssClass.ROOT
        );
    };
});  // goog.scope
