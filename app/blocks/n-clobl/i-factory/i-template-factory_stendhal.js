goog.provide('sm.iFactory.TemplateFactoryStendhal');
goog.provide('sm.iFactory.TemplateFactoryStendhal.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');
goog.require('sm.bBanner.Template');
goog.require('sm.bHeader.Template');
goog.require('sm.gAuthSocial.TemplateStendhal');
goog.require('sm.gAuthSocialModal.TemplateStendhal');
goog.require('sm.gButton.TemplateSocialStendhal');
goog.require('sm.gButton.TemplateStendhal');
goog.require('sm.gDropdown.DropdownSelectTemplate');
goog.require('sm.gHint.TemplateStendhal');
goog.require('sm.gInput.DigitInputTemplate');
goog.require('sm.gList.SelectTemplate');
goog.require('sm.gModal.TemplateFeedback');
goog.require('sm.gModal.TemplateStendhal');
goog.require('sm.gTab.TemplateStendhal');
goog.require('sm.gTextarea.TemplateStendhal');

/**
 * Template factory
 * @constructor
 */
sm.iFactory.TemplateFactoryStendhal = function() {
    goog.base(this, 'stendhal');

    this.setTemplateListItem(
            'tab',
            sm.gTab.TemplateStendhal.tab
        )
        .setTemplateListItem(
            'textarea',
            sm.gTextarea.TemplateStendhal.textarea
        )
        .setTemplateListItem(
            'hint',
            sm.gHint.TemplateStendhal.hint
        )
        .setTemplateListItem(
            'modal',
            sm.gModal.TemplateStendhal.modal
        ).
        setTemplateListItem(
            'feedback-modal',
            sm.gModal.TemplateFeedback.modal
        )
        .setTemplateListItem(
            'dropdown-select',
            sm.gDropdown.DropdownSelectTemplate.dropdown
        )
        .setTemplateListItem(
            'list-select',
            sm.gList.SelectTemplate.list
        )
        .setTemplateListItem(
            'digit-input',
            sm.gInput.DigitInputTemplate.input
        )
        .setTemplateListItem(
            'button-social',
            sm.gButton.TemplateSocialStendhal.button
        )
        .setTemplateListItem(
            'auth-social',
            sm.gAuthSocial.TemplateStendhal.authSocial
        )
        .setTemplateListItem(
            'auth-social-modal',
            sm.gAuthSocialModal.TemplateStendhal.authSocialModal
        )
        .setTemplateListItem(
            'header',
            sm.bHeader.Template.base
        )
        .setTemplateListItem(
            'banner',
            sm.bBanner.Template.banner
        )
        .setTemplateListItem(
            'button',
            sm.gButton.TemplateStendhal.button
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
