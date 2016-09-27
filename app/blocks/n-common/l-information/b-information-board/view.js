goog.provide('sm.lInformation.bInformationBoard.View');

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
sm.lInformation.bInformationBoard.View = function(opt_params,
    opt_type, opt_modifier) {

    sm.lInformation.bInformationBoard.View.base(this, 'constructor',
        opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.lInformation.bInformationBoard.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.lInformation.bInformationBoard.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-information-board'
    };
});  // goog.scope
