goog.provide('sm.bEntityRelation.EntityRelation');

goog.require('cl.iControl.Control');
goog.require('sm.bEntityRelation.Template');
goog.require('sm.bEntityRelation.View');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bEntityRelation.EntityRelation = function(view, opt_domHelper) {
    sm.bEntityRelation.EntityRelation.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(sm.bEntityRelation.EntityRelation, cl.iControl.Control);


goog.scope(function() {
    var EntityRelation = sm.bEntityRelation.EntityRelation,
        View = sm.bEntityRelation.View;

    /**
     * Name of this element in factory
     */
    EntityRelation.NAME = sm.bEntityRelation.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        EntityRelation.NAME,
        {
            control: EntityRelation,
            view: View
        }
    );
});  // goog.scope
