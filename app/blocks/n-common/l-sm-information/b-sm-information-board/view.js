goog.provide('sm.bSmInformationBoard.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Information Board View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmInformationBoard.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmInformationBoard.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);
};
goog.inherits(sm.bSmInformationBoard.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSmInformationBoard.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-sm-information-board'
    };
});  // goog.scope
