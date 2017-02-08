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

    /**
     * @protected
     * @param {cl.iAbstractFactory.AbstractFactory} parent
     * @override
     */
    Factory.prototype.setParent = function(parent) {
        this.parent_ = parent;
        if (parent.getIndex() !== 0)
        this.stylizations_ = goog.array.clone(parent.stylizations_);
    };

    /**
     * Add new stylization to factory
     * @param {string} stylization
     * @override
     */
    Factory.prototype.addStylization = function(stylization) {
        if (!this.hasStylization(stylization)) {
            this.stylizations_.push(stylization);
        }
    };

    /**
     * Get active stylization
     * @param {?Array.<string>} childStylization
     * @return {?string} Stylization or "null" if it is not defined
     * @override
     */
    Factory.prototype.getStylization = function(childStylization) {
        var result = null;
        var arr = childStylization || this.stylizations_;
        if (arr.length > 0) {
            result = arr[arr.length - 1];
        }
        return result;
    };

    /**
     * Get parent stylizations
     * @param {?Array.<string>} childStylization
     * @return {?Array.<string>} Parent stylizations or "null"
     * @override
     * if they are not defined
     */
    Factory.prototype.getParentStylizations = function(childStylization) {
        var result = null;
        var arr = childStylization || this.stylizations_;
        if (arr.length > 1) {
            result = arr.slice(0, arr.length - 1);
        }
        return result;
    };

    /**
     * Render soy template
     * @param {{
     *     type: string,
     *     renderParams: ?object
     * }} soyParams
     * @param {object=} opt_ignored
     * @param {object=} opt_ijData
     * @param {?Array.<string>=} opt_childStylization
     * @return {string}
     * @override
     */
    Factory.prototype.soy =
        function(soyParams, opt_ignored, opt_ijData, opt_childStylization) {
            var name = soyParams.type,
                params = soyParams.renderParams || {},
                ijData = opt_ijData || {},
                stylizations = opt_childStylization || this.stylizations_,
                result = null;
            if (!goog.isDefAndNotNull(params.config)) {
                params.config = {};
            }
            // params.config.stylizationModifier = this.getStylization();

            //Temporary workaround for ES6 "includes" function
            //which conflicts with "includes" property
            if (
                goog.isDefAndNotNull(params.includes) &&
                (params.includes instanceof Function)
            ) {
                params.includes = null;
            }

            var currentLocale = (
                ijData.currentLocale ||
                this.i18nManagerContainer_.accessManager().getCurrentLocale()
            );

            if (ijData.factoryIndex === undefined)
            {
                ijData.factoryIndex = this.index_;
            }

            if (this.hasTemplate(name)) {
                result = this.controls_[name].template(
                    {
                        params: params
                    },
                    null,
                    {
                        activeStylization:
                            this.getStylization(stylizations),
                        parentsStylizations:
                            this.getParentStylizations(stylizations),
                        factoryIndex: ijData.factoryIndex,
                        currentLocale: currentLocale
                    }
                );
            } else if (this.hasParent()) {
                result = this.parent_.soy(
                    soyParams,
                    opt_ignored,
                    ijData,
                    stylizations
                );
            } else {
                this.controlNotRegistered_(name);
            }
            return result;
        };

    /**
     * Render template and return result as DOM-element
     * @param {string} name
     * @param {object=} opt_params
     * @param {?{
     *      stylizations: Array.<string>,
     *      index: number
     * }=} opt_child
     * @return {Element}
     * @override
     */
    Factory.prototype.renderAsElement =
        function(name, opt_params, opt_child) {
            var element = null,
                stylizations =
                    (opt_child && opt_child.stylizations) || this.stylizations_,
                index = (opt_child && opt_child.index) || this.index_;

            if (this.hasTemplate(name)) {
                element = goog.soy.renderAsElement(
                    this.controls_[name].template,
                    {
                        params: opt_params,
                    },
                    {
                        activeStylization: this.getStylization(stylizations),
                        parentsStylizations:
                            this.getParentStylizations(stylizations),
                        factoryIndex: index
                    }
                );
            } else if (this.hasParent()) {
                element = this.parent_.renderAsElement(
                    name,
                    opt_params,
                    {'stylizations': stylizations, 'index': index}
                );
            } else {
                this.controlNotRegistered_(name);
            }

            return element;
        };

    /**
     * Create view (for internal usage only)
     * @protected
     * @param {string} name
     * @param {object=} opt_params
     * @param {?Array.<string>=} opt_childStylization
     * @return {cl.iControl.View}
     * @override
     */
    Factory.prototype.createView =
        function(name, opt_params, opt_childStylization) {
            var view = null,
                ViewCtor = null,
                stylizations = opt_childStylization || this.stylizations_;

            if (this.hasView(name)) {
                ViewCtor = this.controls_[name].view;
                view = new ViewCtor(
                    opt_params,
                    name,
                    this.getStylization(stylizations)
                );
            } else if (this.hasParent()) {
                view = this.parent_.createView(name, opt_params, stylizations);
            } else {
                this.controlNotRegistered_(name);
            }
            return view;
        };

    /** @type {sm.iCloblFactory.FactoryStendhal} */
    sm.iCloblFactory.FactoryStendhal.INSTANCE = Factory.getInstance();
});  // goog.scope
