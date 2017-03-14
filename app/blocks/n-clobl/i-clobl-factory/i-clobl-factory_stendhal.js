goog.provide('sm.iCloblFactory.FactoryStendhal');
goog.provide('sm.iCloblFactory.FactoryStendhal.INSTANCE');

goog.require('cl.iCloblFactory.CloblFactory');



/**
 * NewFactoryStendhal
 * @constructor
 * @extends {cl.iAbstractFactory.AbstractFactory}
 */
sm.iCloblFactory.FactoryStendhal = function() {
    sm.iCloblFactory.FactoryStendhal.base(this, 'constructor');
    this.setParent(cl.iCloblFactory.CloblFactory.getInstance());
    this.addStylization('stendhal');
};

goog.scope(function() {
    var Factory = sm.iCloblFactory.FactoryStendhal;
    goog.inherits(Factory, cl.iAbstractFactory.AbstractFactory);
    goog.addSingletonGetter(Factory);

    /** @type {sm.iCloblFactory.FactoryStendhal} */
    sm.iCloblFactory.FactoryStendhal.INSTANCE = Factory.getInstance();
});  // goog.scope
