goog.provide('sm.lSearchResult.bSchoolList.SchoolList');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bRating.Rating');
//goog.require('sm.lSearchResult.bSchoolList.ListElement');
goog.require('sm.lSearchResult.bSchoolList.Template');

/**
 * School list component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bSchoolList.SchoolList = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};

    /**
     * Array of instances of list elements
     * @private
     * @type {Array.<sm.lSearchResult.bSchoolList.ListElement>}
     */
    this.schoolElements_ = [];
};
goog.inherits(sm.lSearchResult.bSchoolList.SchoolList, goog.ui.Component);

goog.scope(function() {
    var SchoolList = sm.lSearchResult.bSchoolList.SchoolList,
        Rating = sm.bRating.Rating;

    /**
     * CSS-class enum
     * @enum {string}
     */
    SchoolList.CssClass = {
        ROOT: 'b-school-list',
        SCHOOL: 'b-school-list__school',
        SCHOOL_RATING: Rating.CssClass.ROOT
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    SchoolList.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bSchoolList.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    SchoolList.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        //school elements
        this.schoolElements_ = goog.dom.getElementsByClass(
            SchoolList.CssClass.SCHOOL,
            element
        );

        //school rating
        this.initRating_();
    };

    /**
     * Set up the Component.
     */
    SchoolList.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        for (var i = 0; i < this.schoolElements_.length; i++) {
            goog.events.listen(
                this.schoolElements_[i],
                goog.events.EventType.CLICK,
                this.redirect_,
                false,
                this
            );
        }
    };

    /**
     * Clean up the Component.
     */
    SchoolList.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        for (var i = 0; i < this.schoolElements_.length; i++) {
            goog.events.unlisten(
                this.schoolElements_[i],
                goog.events.EventType.CLICK,
                this.redirect_
            );
        }
    };

    /**
     * Sort handler
     * @param {string} sortKey
     * @public
     */
    SchoolList.prototype.sort = function(sortKey) {
        console.log('Sort by key: \"' + sortKey + '\" released!');
    };

    /**
     * Rating initialization
     * @private
     */
    SchoolList.prototype.initRating_ = function() {
        var schoolRatingElement,
            schoolRating;

        for (var i = 0; i < this.schoolElements_.length; i++) {
            //dom elements
            schoolRatingElement = goog.dom.getElementByClass(
                SchoolList.CssClass.SCHOOL_RATING,
                this.schoolElements_[i]
            );
            //rating
            schoolRating = new Rating();
            this.addChild(schoolRating);
            schoolRating.decorate(schoolRatingElement);
        }
    };

    /**
     * Redirect handler
     * @param {Object} event
     * @private
     */
    SchoolList.prototype.redirect_ = function(event) {
        var params = event.currentTarget.getAttribute('data-params');
        params = JSON.parse(params);
        document.location.href = '/school/' + params.id;
        //TODO refactor this - make something like generation events by list-items with data-id in event
    };
});
