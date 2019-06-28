// API
import express from 'express'
import compression from 'compression'

// Import modules
import redisConnection from './src/utils/redis/redisConnection'
import swaggerDoc from './swagger/swaggerDoc'
import jwtAuth from './src/utils/jwt'
import Routers from './src/routes/index'
import logRecode from './log/index'

// Init
const app = express()
app.use(compression())

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
  console.log(`Your application is running here: http://localhost:8002/index`)
});
