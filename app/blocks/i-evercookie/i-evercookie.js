goog.provide('sm.iEvercookie.Evercookie');



/**
 * Evercookie facade
 * @constructor
 */
sm.iEvercookie.Evercookie = function() {


    /**
     * Evercookie
     * @type {Object}
     * @private
     */
    this.evercookie_ = new evercookie({
        baseurl: '',
        asseturi: '/evercookie/assets',
        phpuri: '/evercookie',
        pngPath: '/png',
        etagPath: '/etag',
        cachePath: '/cache',
        history: false
    });


    /**
     * Client id
     * @type {?number}
     * @private
     */
    this.clientId_ = null;
};
goog.addSingletonGetter(sm.iEvercookie.Evercookie);


/**
 * Get client id
 * @param {Function} callback
 */
sm.iEvercookie.Evercookie.prototype.getClientId = function(callback) {
    var that = this;
    callback = callback || function(id) { };
    if (that.clientId_) {
        callback(that.clientId_);
    }
    else {
        that.get('clevverId', function(value) {
             if (value) {
                that.clientId_ = value;
            }
            else {
                that.clientId_ = that.generateGuid_();
                that.set('clevverId', that.clientId_);
            }
            callback(that.clientId_);
        });
    }
};


/**
 * Get value
 * @param {string} name
 * @param {function} callback
 * @param {boolean=} opt_dontReset
 */
sm.iEvercookie.Evercookie.prototype.get = function(name,
                                                   callback,
                                                   opt_dontReset) {

    this.evercookie_.get(name, callback, opt_dontReset);
};


/**
 * Set value
 * @param {string} name
 * @param {string} value
 */
sm.iEvercookie.Evercookie.prototype.set = function(name, value) {
    this.evercookie_.set(name, value);
};


/**
 * Generate guid
 * @return {string}
 * @private
 */
sm.iEvercookie.Evercookie.prototype.generateGuid_ = function() {
    var mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return mask.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};  // goog.scope
