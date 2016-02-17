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
