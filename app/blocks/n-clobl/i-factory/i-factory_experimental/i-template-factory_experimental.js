goog.provide('sm.iFactory.TemplateFactoryExperimental');

goog.require('cl.iFactory.FactoryManager');
goog.require('sm.iFactory.TemplateFactoryStendhal');



/**
 * Template factory
 * @constructor
 * @extends {sm.iFactory.TemplateFactoryStendhal}
 */
sm.iFactory.TemplateFactoryExperimental = function() {
    sm.iFactory.TemplateFactoryExperimental.base(this, 'constructor');

    this.setStylization('experimental');
};
goog.inherits(
    sm.iFactory.TemplateFactoryExperimental,
    sm.iFactory.TemplateFactoryStendhal
);
goog.addSingletonGetter(sm.iFactory.TemplateFactoryExperimental);


goog.scope(function() {
    var TemplateFactory = sm.iFactory.TemplateFactoryExperimental;

    /**
     * Important!
     */
    TemplateFactory.getInstance().attachToManager();
});  // goog.scope
