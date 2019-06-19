const expressJwt = require('express-jwt');
const { secretKey } = require('./info');

// 请求header: Authorization Bearer *******
const jwtAuth = expressJwt({
  secret: secretKey,
  credentialsRequired: true // 设置为false全部用户/非用户可以访问
}).unless({
  path: ['/user/login'] // 设置无需验证得路由，用于设置登录路由
});

module.exports = jwtAuth;
