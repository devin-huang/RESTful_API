const user = require('../controller/User')
const jwt = require('jsonwebtoken');
// MD5_SUFFIX / md5 给用户得密码加密 => md5(password) + MD5_SUFFIX
const { MD5_SUFFIX, md5, secretKey } = require('../utils/JWT/info');

module.exports = (app, {jsonParser, urlencodedParser}) => {
  
  // Root
  app.get('/api/login', function(req, res){

      // jsonWebToken生成token返给前端保存，然后通过express-jwt验证
      let token = jwt.sign({
        username: req.body && req.body.name || 'devin'
      }, secretKey, {
        expiresIn : '2 days'
      });
      res.json({
        success: true,
        message: 'success',
        token: token
      });
      //前端请求格式: Authorization = `Bearer token码`
  });
  
  // Get User
  app.get('/api/user', user.getUser);
  
  // Create a User
  app.post('/api/user', jsonParser, user.createUser);
  
  // Update User
  app.put('/api/user/:id', user.updateUser);

  // // Delete a User
  // app.delete('/api/customers/:id', user.deleteUser);
}