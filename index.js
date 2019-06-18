// API
const express = require('express')
// Import modules
const redisConnection = require('./src/utils/redis/redisConnection')
const swaggerDoc = require('./src/utils/swagger/swaggerDoc');
const jwtAuth = require('./src/utils/JWT')
const view = require('./src/view/index')
const logRecode = require('./src/utils/log')
const test = require('./src/routes/test')
// Init
const app = express()

// 日志
app.use(logRecode)

// swagger setting
swaggerDoc(app)


app.use('/test', test)

// 啓用Redis
// redisConnection()

// JWT验证
app.use(jwtAuth)
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err.message);
  }
});

// 需要在JWT后面载入否则会直接显示数据
view(app)

app.listen(8002, function (){
  console.log('Example app listening on port 8002!');
  console.log(`Your application is running here: http://localhost:8002/`)
});
