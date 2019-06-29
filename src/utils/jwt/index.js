const expressJwt = require('express-jwt');
const { secretKey } = require('./config');

console.log(process.env.NODE_ENV,'<=====================>')
// 请求header: Authorization Bearer *******
const jwtAuth = expressJwt({
  secret: secretKey,
  credentialsRequired: process.env.NODE_ENV === 'production' ? true : false // 设置为false全部用户/非用户可以访问
}).unless({
  path: ['/user/login', '/api-docs', '/swagger.json', '/index'] // 设置无需验证得路由，用于设置登录路由
});

module.exports = jwtAuth;
