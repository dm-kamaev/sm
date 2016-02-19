goog.provide('sm.iFactory.FactoryStendhal');

goog.require('cl.iFactory.Factory');
goog.require('sm.gDropdownSelect.DropdownSelect');
goog.require('sm.gDropdownSelect.View');
goog.require('sm.gInputFeedback.InputFeedback');
goog.require('sm.gInputFeedback.View');
goog.require('sm.gListSelect.List');
goog.require('sm.gListSelect.View');

/**
 * FactoryStendhal
 * @constructor
 * @extends {sm.iControl.Control}
 */
sm.iFactory.FactoryStendhal = function() {
    var templateFactory = sm.iFactory.TemplateFactoryStendhal.getInstance();

    goog.base(this, templateFactory, 'stendhal');

    this.setControlListItem('dropdown-select', {
        control: sm.gDropdownSelect.DropdownSelect,
        view: sm.gDropdownSelect.View
    });

    this.setControlListItem('list-select', {
        control: sm.gListSelect.List,
        view: sm.gListSelect.View
    });

    this.setControlListItem('input-feedback', {
        control: sm.gInputFeedback.InputFeedback,
        view: sm.gInputFeedback.View
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
