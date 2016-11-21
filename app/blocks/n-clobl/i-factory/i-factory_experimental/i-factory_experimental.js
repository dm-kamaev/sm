goog.provide('sm.iFactory.FactoryExperimental');

goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.iFactory.TemplateFactoryExperimental');



/**
 * Factory
 * @constructor
 * @extends {sm.iFactory.FactoryStendhal}
 */
sm.iFactory.FactoryExperimental = function() {
    sm.iFactory.FactoryExperimental.base(this, 'constructor');

    this.setStylization('experimental');
};
goog.inherits(
    sm.iFactory.FactoryExperimental,
    sm.iFactory.FactoryStendhal
);
goog.addSingletonGetter(sm.iFactory.FactoryExperimental);


goog.scope(function() {
    var Factory = sm.iFactory.FactoryExperimental;

    /**
     * Important!
     */
    Factory.getInstance().attachToManager();
});  // goog.scope
