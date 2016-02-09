goog.provide('sm.iFactory.TemplateFactoryStendhal');
goog.provide('sm.iFactory.TemplateFactoryStendhal.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');


/**
 * Template factory
 * @constructor
 */
sm.iFactory.TemplateFactoryStendhal = function() {
    goog.base(this, 'stendhal');
};
goog.inherits(sm.iFactory.TemplateFactoryStendhal, cl.iFactory.TemplateFactory);
goog.addSingletonGetter(sm.iFactory.TemplateFactoryStendhal);

/**
 * Instance
 */
sm.iFactory.TemplateFactoryStendhal.INSTANCE =
    sm.iFactory.TemplateFactoryStendhal.getInstance();

/**
 * IMPORTANT !
 */
sm.iFactory.TemplateFactoryStendhal.getInstance()
    .getFactoryManager()
    .addTemplateFactory(
    sm.iFactory.TemplateFactoryStendhal.getInstance().getStylization(),
    sm.iFactory.TemplateFactoryStendhal.getInstance()
);
