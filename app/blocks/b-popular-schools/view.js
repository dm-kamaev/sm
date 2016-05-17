goog.provide('sm.bPopularSchools.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');



/**
 * Popular school view
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bPopularSchools.View = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.bPopularSchools.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bPopularSchools.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-popular-schools',
        SCHOOL: 'b-popular-schools__school'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
       SCHOOL_CLICK: 'school-click'
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_(element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        for (var i = 0; i < this.dom.schools.length; i++) {
            this.getHandler().listen(
                this.dom.schools[i],
                goog.events.EventType.CLICK,
                this.onClickSchool_.bind(this, i),
                false,
                this
            );
        }
    };


    /**
     * Get Analytics Action
     * @return {string}
     */
    View.prototype.getAnalyticsAction = function() {
        var data = this.getDataParams_();

        return data['analyticsAction'];
    };


    /**
     * Get popular school's params
     * @return {Array<Object>}
     */
    View.prototype.getSchoolsParams = function() {
        var schoolParams = [];
        for (var i = 0, elem; elem = this.dom.schools[i]; i++) {
            schoolParams.push(this.getDataParams_(elem));
        }
        return schoolParams;
    };


    /**
     * @param {number} schoolNumInArr
     * @private
     */
    View.prototype.onClickSchool_ = function(schoolNumInArr) {
        var schoolData = this.getDataParams_(this.dom.schools[schoolNumInArr]),
            schoolName = schoolData['schoolName'],
            schoolId = schoolData['id'];

        this.dispatchEvent({
            'id': schoolId,
            'type': View.Event.SCHOOL_CLICK,
            'schoolName': schoolName,
            'position': schoolNumInArr + 1
        });
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom.schools = goog.dom.getElementsByClass(
            View.CssClass.SCHOOL,
            element
        );
    };


    /**
     * Get data params
     * @param {Element=} opt_element dom element
     * @return {Object}
     * @private
     */
    View.prototype.getDataParams_ = function(opt_element) {
        var element = opt_element || this.getElement();
        var params = JSON.parse(goog.dom.dataset.get(element, 'params'));

        return params;
    };
});  // goog.scope
