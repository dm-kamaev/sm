'use strict';

const redis = require('redis'),
    bluebird = require('bluebird'),
    await = require('asyncawait/await');

class Redis {
    constructor() {
        /**
         * @private
         * @type {Object}
         */
        var client_ = null;

        this.promisify_();
    }

    /**
     * Create a connection to Redis-server
     */
    connect() {
        this.client_ = redis.createClient({
            prefix: 'sm.'
        });
    }

    /**
     * @param {string} key
     * @return {Object}
     */
    get(key) {
        return JSON.parse(await(this.client_.getAsync(key)));
    }

    /**
     * @param {string} key
     * @param {Object} data
     * @param {number} expireIn
     */
    set(key, data, expireIn) {
        this.client_.set(key, JSON.stringify(data));
        this.client_.expire(key, expireIn);
    }

    /**
     * @private
     */
    promisify_() {
        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);
    }
}

module.exports = new Redis();
