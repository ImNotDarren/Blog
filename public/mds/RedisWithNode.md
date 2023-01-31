# Redis with Node.js

### import packages

```js
const redis = require('redis')
const redisUrl = 'redis:://127.0.0.1:6379'
const client = redis.creatgeClient(redisUrl)
```

### Check your connections

```js
client.on('connect', () => {
    console.log('Connected!')
})
```

### Set key pairs

Firstly connect to redis server: (add `async` to its parent function)

```js
await client.connet()
```

Set values:

```js
const response = await client.set('key', 'value')
```