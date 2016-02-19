goog.provide('sm.iFactory.FactoryStendhal');

goog.require('cl.iFactory.Factory');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.gDropdown.DropdownSelectView');
goog.require('sm.gInput.DigitInput');
goog.require('sm.gInput.DigitInputView');
goog.require('sm.gList.SelectList');
goog.require('sm.gList.SelectListView');

/**
 * FactoryStendhal
 * @constructor
 * @extends {sm.iControl.Control}
 */
sm.iFactory.FactoryStendhal = function() {
    var templateFactory = sm.iFactory.TemplateFactoryStendhal.getInstance();

    goog.base(this, templateFactory, 'stendhal');

    this.setControlListItem('dropdown-select', {
        control: sm.gDropdown.DropdownSelect,
        view: sm.gDropdown.DropdownSelectView
    });

    this.setControlListItem('list-select', {
        control: sm.gList.SelectList,
        view: sm.gList.SelectListView
    });

    this.setControlListItem('digit-input', {
        control: sm.gInput.DigitInput,
        view: sm.gInput.DigitInputView
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
