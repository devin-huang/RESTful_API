// API
const express = require('express')
// Import modules
const redisConnection = require('./src/utils/redis/redisConnection')
const swaggerDoc = require('./swagger/swaggerDoc');
const jwtAuth = require('./src/utils/jwt')
const Routers = require('./src/routes/index')
const logRecode = require('./log/index')

// Init
const app = express()
app.get('/hello', (req, res) => {
  res.json({name: 'world'})
})
// 日志
app.use(logRecode)

// swagger setting
swaggerDoc(app)

// 啓用Redis
// redisConnection()

// JWT验证
app.use(jwtAuth)
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err.message);
  }
});

// 需要在jwt后面载入否则会直接显示数据
Routers(app)

app.listen(8002, function (){
  console.log('Example app listening on port 8002!');
  console.log(`Your application is running here: http://localhost:8002/`)
});
