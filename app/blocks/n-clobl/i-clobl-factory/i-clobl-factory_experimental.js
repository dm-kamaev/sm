goog.provide('sm.iCloblFactory.FactoryExperimental');
goog.provide('sm.iCloblFactory.FactoryExperimental.INSTANCE');

goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * NewFactoryExperimental
 * @constructor
 * @extends {cl.iAbstractFactory.AbstractFactory}
 */
sm.iCloblFactory.FactoryExperimental = function() {
    sm.iCloblFactory.FactoryExperimental.base(this, 'constructor');
    this.setParent(sm.iCloblFactory.FactoryStendhal.getInstance());
    this.addStylization('experimental');
};

goog.scope(function() {
    var Factory = sm.iCloblFactory.FactoryExperimental;
    goog.inherits(Factory, cl.iAbstractFactory.AbstractFactory);
    goog.addSingletonGetter(Factory);

    /** @type {sm.iCloblFactory.FactoryExperimental} */
    sm.iCloblFactory.FactoryExperimental.INSTANCE = Factory.getInstance();
});  // goog.scope
