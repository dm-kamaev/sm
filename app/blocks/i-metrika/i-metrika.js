goog.provide('sm.iMetrika.Metrika');



/**
 * Google Metrika
 * @constructor
 */
sm.iMetrika.Metrika = function() {


    /**
     * Client Id
     * @type {string}
     * @private
     */
    this.clientId_ = null;
};
goog.addSingletonGetter(sm.iMetrika.Metrika);


goog.scope(function() {
    var Metrika = sm.iMetrika.Metrika;


    /**
     * Init Metrika
     * @param {string} clientId
     * @public
     */
    Metrika.prototype.init = function(clientId) {
        this.clientId_ = clientId;
        this.loadingLibrary_();
    };


    /**
     * loading library
     * @private
     */
    Metrika.prototype.loadingLibrary_ = function() {
        var doc = document,
            win = window,
            callbacks = 'yandex_metrika_callbacks';

        var counter = 'yaCounter' + this.clientId_;

        (win[callbacks] = win[callbacks] || []).push(function() {
            try {
                win[counter] = new Ya.Metrika({
                    'id': this.clientId_,
                    'clickmap': true,
                    'trackLinks': true,
                    'accurateTrackBounce': true,
                    'webvisor': true
                });
            } catch (e) {}
        });

        var elemScript = doc.getElementsByTagName('script')[0],
            elem = doc.createElement('script');

        var func = function() {
            elemScript.parentNode.insertBefore(elem, elemScript);
        };

        elem.type = 'text/javascript';
        elem.async = true;
        elem.src = 'https://mc.yandex.ru/metrika/watch.js';

        if (win['opera'] == '[object Opera]') {
            doc.addEventListener('DOMContentLoaded', func, false);
        } else {
            func();
        }
    };

    goog.exportSymbol(
        'sm.iMetrika.Metrika.getInstance',
        Metrika.getInstance
    );
    goog.exportProperty(
        Metrika.prototype,
        'init',
        Metrika.prototype.init
    );
});  // goog.scope
