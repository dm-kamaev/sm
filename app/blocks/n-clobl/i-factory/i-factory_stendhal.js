goog.provide('sm.iFactory.FactoryStendhal');

goog.require('cl.iFactory.Factory');
goog.require('sm.bHeader.Header');
goog.require('sm.bHeader.View');
goog.require('sm.gAuthSocial.ViewStendhal');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.gDropdown.DropdownSelectView');
goog.require('sm.gInput.DigitInput');
goog.require('sm.gInput.DigitInputView');
goog.require('sm.gList.SelectList');
goog.require('sm.gList.SelectListView');
goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.ViewStendhal');
goog.require('sm.gTextarea.ViewStendhal');

/**
 * FactoryStendhal
 * @constructor
 * @extends {cl.iFactory.Factory}
 */
sm.iFactory.FactoryStendhal = function() {
    var templateFactory = sm.iFactory.TemplateFactoryStendhal.getInstance();

    goog.base(this, templateFactory, 'stendhal');

    this.setControlListItem('dropdown-select', {
            control: sm.gDropdown.DropdownSelect,
            view: sm.gDropdown.DropdownSelectView
        })
        .setControlListItem('list-select', {
            control: sm.gList.SelectList,
            view: sm.gList.SelectListView
        })
        .setControlListItem('digit-input', {
            control: sm.gInput.DigitInput,
            view: sm.gInput.DigitInputView
        })
        .setControlListItem('textarea', {
            view: sm.gTextarea.ViewStendhal
        })
        .setControlListItem('modal', {
            control: sm.gModal.ModalStendhal,
            view: sm.gModal.ViewStendhal
        })
        .setControlListItem('auth-social', {
            view: sm.gAuthSocial.ViewStendhal
        })
        .setControlListItem('header', {
            control: sm.bHeader.Header,
            view: sm.bHeader.View
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
