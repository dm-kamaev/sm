goog.provide('sm.bSmScore.View');

goog.require('cl.iControl.View');



goog.scope(function() {
    /**
     * View for Score block
     *
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
     sm.bSmScore.View = function(opt_params, opt_type, opt_modifier) {
         sm.bSmScore.View.base(
             this, 'constructor', opt_params, opt_type, opt_modifier
         );
    };
    goog.inherits(sm.bSmScore.View, cl.iControl.View);
    var View = sm.bSmScore.View;


    /**
    * List of CSS classes
    * @enum {string}
    * @const
    */
    View.CssClass = {
        ROOT: 'b-sm-score'
    };
});  // goog.scope
