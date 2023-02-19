# Redis with Node.js

### Start Redis service

```
$ brew services start redis
```

### Install node-redis packages

```
$ cd [project directory]
```

```
$ npm install redis
```

### import packages

```js
const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379'
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
