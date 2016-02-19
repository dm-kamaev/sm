goog.provide('sm.iFactory.TemplateFactoryStendhal');
goog.provide('sm.iFactory.TemplateFactoryStendhal.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');

goog.require('sm.gDropdown.DropdownSelectTemplate');
goog.require('sm.gInput.DigitInputTemplate');
goog.require('sm.gList.SelectTemplate');

/**
 * Template factory
 * @constructor
 */
sm.iFactory.TemplateFactoryStendhal = function() {
    goog.base(this, 'stendhal');

    this.setTemplateListItem(
        'dropdown-select',
        sm.gDropdown.DropdownSelectTemplate.dropdown
    );

    this.setTemplateListItem(
        'list-select',
        sm.gList.SelectTemplate.list
    );

    this.setTemplateListItem(
        'digit-input',
        sm.gInput.DigitInputTemplate.input
    );
};
goog.inherits(sm.iFactory.TemplateFactoryStendhal, cl.iFactory.TemplateFactory);
goog.addSingletonGetter(sm.iFactory.TemplateFactoryStendhal);

goog.scope(function() {
    var TemplateFactory = sm.iFactory.TemplateFactoryStendhal;
    /**
     * Instance
     */
    TemplateFactory.INSTANCE = TemplateFactory.getInstance();

    /**
     * Important!
     */
    TemplateFactory.getInstance().attachToManager();
});
