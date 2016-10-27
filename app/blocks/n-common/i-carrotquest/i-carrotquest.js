goog.provide('sm.iCarrotquest.Carrotquest');



/**
 * Carrotquest
 * @constructor
 */
sm.iCarrotquest.Carrotquest = function() {


    /**
     * Client Id
     * @type {string}
     * @private
     */
    this.clientId_ = null;
};
goog.addSingletonGetter(sm.iCarrotquest.Carrotquest);


goog.scope(function() {
    var Carrotquest = sm.iCarrotquest.Carrotquest;


    /**
     * Init Carrotquest
     * @param {string} clientId
     * @public
     */
    Carrotquest.prototype.init = function(clientId) {
        this.clientId_ = clientId;

        this.loadingLibrary_(this.clientId_);
    };


    /**
     * loading library
     * @param {string} clientId
     * @private
     */
    Carrotquest.prototype.loadingLibrary_ = function(clientId) {
        if (typeof carrotquest === 'undefined') {
            this.insertScript_();
            this.create_();
        }
        this.connect_(clientId);
    };


    /**
     * Insert script library Carrotquest
     * @private
     */
    Carrotquest.prototype.insertScript_ = function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = '//cdn.carrotquest.io/api.min.js';

        var domNode = document.getElementsByTagName('head')[0];
        domNode.appendChild(script);
    };


    /**
     * Create Carrotquest
     * @private
     */
    Carrotquest.prototype.create_ = function() {
        window.carrotquest = {};
        window.carrotquestasync = [];
        carrotquest.settings = {};

        var functions = [
            'connect', 'track', 'identify', 'auth', 'open',
            'onReady', 'addCallback', 'removeCallback',
            'trackMessageInteraction'
        ];

        for (var i = 0; i < functions.length; i++) {
            carrotquest[functions[i]] = this.build_(functions[i]);
        }
    };


    /**s
     * Build Carrotquest
     * @param {string} name
     * @param {string|Object|Array} args
     * @return {Function}
     * @private
     */
    Carrotquest.prototype.build_ = function(name, args) {
        return function() {
            window.carrotquestasync.push(name, arguments);
        };
    };


    /**
     * Connect to Carrotquest
     * @param {string} clientId
     * @private
     */
    Carrotquest.prototype.connect_ = function(clientId) {
        carrotquest.connect(clientId);
    };


    goog.exportSymbol(
        'sm.iCarrotquest.Carrotquest.getInstance',
        Carrotquest.getInstance
    );

    goog.exportProperty(
        Carrotquest.prototype,
        'init',
        Carrotquest.prototype.init
    );
});  // goog.scope
