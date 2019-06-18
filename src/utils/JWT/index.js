const expressJwt = require('express-jwt');
const { secretKey } = require('./info');

const jwtAuth = expressJwt({
  secret: secretKey,
  credentialsRequired: true // 设置为false全部用户/非用户可以访问
}).unless({
  path: ['/api/login', '/about'] // 设置无需验证得路由，用于设置登录路由
});

module.exports = jwtAuth;
