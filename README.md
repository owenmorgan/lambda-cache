**lambda-cache**

Package to cache objects in memory for NodeJS Lambda Functions

## How to use
```js
import { APIGatewayEvent } from 'aws-lambda';
import { Cache } from './cache';

const cache = new Cache();

export const handler = async (ev: APIGatewayEvent) => {

    const testKey = "testkey";

    const val = cache.get(testKey);

    if(val) {
        console.log("Cache hit")

        return {
            statusCode: 200,
            body: JSON.stringify(val),
            headers: {
                'Content-type': 'application/json'
            },
        };
    }

    console.log("Cache miss");

    let test = {"k":"testing"};
    cache.set("test", test, 10); // cache object for 10 seconds

    return {
            statusCode: 200,
            body: JSON.stringify(test),
            headers: {
                'Content-type': 'application/json'
            },
        };
}
```