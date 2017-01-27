goog.provide('sm.iNewFactory.FactoryStendhal');
goog.provide('sm.iNewFactory.FactoryStendhal.INSTANCE');

goog.require('cl.iCloblFactory.CloblFactory');
/**
 * @constructor
 * @extends {cl.iAbstractFactory.AbstractFactory}
 */
sm.iNewFactory.FactoryStendhal = function() {
    sm.iNewFactory.FactoryStendhal.base(this, 'constructor');
    this.setParent(cl.iCloblFactory.CloblFactory.getInstance());
};

goog.scope(function() {
    var Factory = sm.iNewFactory.FactoryStendhal;

    goog.inherits(Factory, cl.iAbstractFactory.AbstractFactory);
    goog.addSingletonGetter(Factory);

    sm.iNewFactory.FactoryStendhal.INSTANCE = Factory.getInstance();
});