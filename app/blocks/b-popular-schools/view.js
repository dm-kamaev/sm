goog.provide('sm.bPopularSchools.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');

/**
 * Popular school view
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bPopularSchools.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.bPopularSchools.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bPopularSchools.View,
        PopularSchools = sm.bPopularSchools.PopularSchools;

    /**
     * Css class enum
     * @enum {String}
     */
    View.CssClass = {
        ROOT: 'b-popular-schools',
        SCHOOL: 'b-popular-schools__school'
    };

    /**
     * Event enum
     * @enum {String}
     */
    View.Event = {
       CLICK_SCHOOL: 'click-school'
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
            var ii = i;
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
     * @param {Number} schoolNumInArr
     * @private
     */
    View.prototype.onClickSchool_ = function(schoolNumInArr) {
        var dataSchool = this.getDataParams_(this.dom.schools[schoolNumInArr]),
            schoolName = dataSchool.schoolName;

        this.dispatchEvent({
            'type': View.Event.CLICK_SCHOOL,
            'schoolName': schoolName
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
     * @param {Element} element dom element
     * @return {Object}
     * @private
     */
    View.prototype.getDataParams_ = function(element) {
        var params = JSON.parse(goog.dom.dataset.get(element, 'params'));

        return params;
    };

});

