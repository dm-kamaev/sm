goog.provide('sm.gDropdown.DropdownStendhal');

goog.require('cl.gDropdown.Dropdown');
goog.require('sm.gDropdown.TemplateStendhal');
goog.require('sm.gDropdown.ViewStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Dropdown control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gDropdown.Dropdown}
 */
sm.gDropdown.DropdownStendhal = function(view, opt_params, opt_domHelper) {
    sm.gDropdown.DropdownStendhal.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gDropdown.DropdownStendhal, cl.gDropdown.Dropdown);


goog.scope(function() {
    var Dropdown = sm.gDropdown.DropdownStendhal,
        View = sm.gDropdown.ViewStendhal;

    /**
     * Name of this element in factory
     */
    Dropdown.NAME = sm.gDropdown.TemplateStendhal.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Dropdown.NAME, {
        control: Dropdown,
        view: View
    });
});  // goog.scope
