goog.provide('sm.bSchoolListPaged.View');

goog.require('cl.gHint.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * SchoolListPaged View
 * @param {Object=} opt_params
 * @param {Function=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSchoolListPaged.View = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.bSchoolListPaged.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSchoolListPaged.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-school-list-paged'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            schoolListItems: this.getElementsByClass(
                sm.bSchoolListItem.SchoolListItem.CssClass.ROOT
            )
        };
    };
});  // goog.scope
