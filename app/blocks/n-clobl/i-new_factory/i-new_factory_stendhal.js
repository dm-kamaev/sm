goog.provide('sm.iNewFactory.FactoryStendhal');
goog.provide('sm.iNewFactory.FactoryStendhal.INSTANCE');

goog.require('cl.iCloblFactory.CloblFactory');



/**
 * NewFactoryStendhal
 * @constructor
 * @extends {cl.iAbstractFactory.AbstractFactory}
 */
sm.iNewFactory.FactoryStendhal = function() {
    sm.iNewFactory.FactoryStendhal.base(this, 'constructor');
    this.setParent(cl.iCloblFactory.CloblFactory.getInstance());
    this.addStylization('stendhal');
};

goog.scope(function() {
    var Factory = sm.iNewFactory.FactoryStendhal;
    goog.inherits(Factory, cl.iAbstractFactory.AbstractFactory);
    goog.addSingletonGetter(Factory);

    /** @type {sm.iNewFactory.FactoryStendhal} */
    sm.iNewFactory.FactoryStendhal.INSTANCE = Factory.getInstance();
});  // goog.scope
