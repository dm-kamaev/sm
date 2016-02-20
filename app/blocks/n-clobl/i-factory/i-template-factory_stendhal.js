goog.provide('sm.iFactory.TemplateFactoryStendhal');
goog.provide('sm.iFactory.TemplateFactoryStendhal.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');

goog.require('sm.gDropdownSelect.Template');
goog.require('sm.gInputFeedback.Template');
goog.require('sm.gListSelect.Template');
goog.require('sm.nClobl.gHint.TemplateStendhal');
goog.require('sm.nClobl.gTab.TemplateStendhal');

/**
 * Template factory
 * @constructor
 */
sm.iFactory.TemplateFactoryStendhal = function() {
    goog.base(this, 'stendhal');

    this.setTemplateListItem(
        'tab',
        sm.nClobl.gTab.TemplateStendhal.tab
    );

    this.setTemplateListItem(
        'hint',
        sm.nClobl.gHint.TemplateStendhal.hint
    );

    this.setTemplateListItem(
        'dropdown-select',
        sm.gDropdownSelect.Template.dropdown
    );

    this.setTemplateListItem(
        'list-select',
        sm.gListSelect.Template.list
    );

    this.setTemplateListItem(
        'input-feedback',
        sm.gInputFeedback.Template.input
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
