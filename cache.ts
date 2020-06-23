export class Cache {

    cache = new Map()
    constructor() {
    }

    /**
     * @param {String} key (required) - cache key
     * @param {Object} value (required) - cache value
     * @param {Number} expire (required) - cache expiration time (seconds)
     * */
    set(key:string, value:any, ttl:number) {
        const expire = (1000 * ttl) + Date.now();
        this.cache.set(key, { value, expire })
    }

    /**
     * @param {String} key (required) - cache key to get
     * */
    get(key:string) {
        if(!key) throw new Error('key is required!');
        let record = this.cache.get(key);
        if (!record) return null;
        if (!record.expire || record.expire > Date.now()) return record.value;
        else return this.remove(key);
    }

    /**
     * @param {String} key (required) - cache key to remove
     * */
    remove(key:string) {
        let record = this.cache.get(key);
        if (!record) return null;
        this.cache.delete(key);
        return null;
    }

}