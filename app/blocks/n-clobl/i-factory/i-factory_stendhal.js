goog.provide('sm.iFactory.FactoryStendhal');

goog.require('cl.iFactory.Factory');


/**
 * FactoryStendhal
 * @constructor
 * @extends {sm.iControl.Control}
 */
sm.iFactory.FactoryStendhal = function() {
    var templateFactory = sm.iFactory.TemplateFactoryStendhal.getInstance();

    goog.base(this, templateFactory, 'stendhal');
};
goog.inherits(sm.iFactory.FactoryStendhal, cl.iFactory.Factory);
goog.addSingletonGetter(sm.iFactory.FactoryStendhal);

goog.scope(function() {
    var Factory = sm.iFactory.FactoryStendhal;

    /**
     * IMPORTANT !
     */
    Factory.getInstance().getFactoryManager()
        .factories[Factory.getInstance().getStylization()] =
            Factory.getInstance();
});
