"use strict";

class Cache {

    constructor() {
        this.collectionName = `${process.env.AWS_LAMBDA_FUNCTION_NAM}-${process.env.AWS_LAMBDA_FUNCTION_VERSION}`;
        if (!global['CACHE_STORAGE'])
            global['CACHE_STORAGE'] = {};
        if (!global['CACHE_STORAGE'][this.collectionName]) {
            global['CACHE_STORAGE'][this.collectionName] = new Map();
        }
    }
    
    /**
     * @param {String} key (required) - cache key
     * @param {Object} value (required) - cache value
     * @param {Number} expire (required) - cache expiration time (seconds)
     * */
    set(key, value, ttl) {
        const expire = (1000 * ttl) + Date.now();
        global['CACHE_STORAGE'][this.collectionName].set(key, { value, expire });
    }

    /**
     * @param {String} key (required) - cache key to get
     * */
    get(key) {
        if (!key)
            throw new Error('key is required!');
        let record = global['CACHE_STORAGE'][this.collectionName].get(key);
        if (!record)
            return null;
        if (!record.expire || record.expire > Date.now())
            return record.value;
        else
            return this.remove(key);
    }

    /**
     * @param {String} key (required) - cache key to remove
     * */
    remove(key) {
        let record = global['CACHE_STORAGE'][this.collectionName].get(key);
        if (!record)
            return null;
        global['CACHE_STORAGE'][this.collectionName].delete(key);
        return null;
    }
}

exports.Cache = Cache;
