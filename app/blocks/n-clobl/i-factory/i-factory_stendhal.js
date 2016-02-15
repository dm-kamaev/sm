goog.provide('sm.iFactory.FactoryStendhal');

goog.require('cl.gDropdownSelect.DropdownSelect');
goog.require('cl.gDropdownSelect.View');
goog.require('cl.gListSelect.List');
goog.require('cl.gListSelect.View');
goog.require('cl.iFactory.Factory');

/**
 * FactoryStendhal
 * @constructor
 * @extends {sm.iControl.Control}
 */
sm.iFactory.FactoryStendhal = function() {
    var templateFactory = sm.iFactory.TemplateFactoryStendhal.getInstance();

    goog.base(this, templateFactory, 'stendhal');

    this.setControlListItem('dropdown-select', {
        control: cl.gDropdownSelect.DropdownSelect,
        view: cl.gDropdownSelect.View
    });

    this.setControlListItem('list-select', {
        control: cl.gListSelect.List,
        view: cl.gListSelect.View
    });

};
goog.inherits(sm.iFactory.FactoryStendhal, cl.iFactory.Factory);
goog.addSingletonGetter(sm.iFactory.FactoryStendhal);

goog.scope(function() {
    var Factory = sm.iFactory.FactoryStendhal;

    /**
     * Important!
     */
    Factory.getInstance().attachToManager();
});
