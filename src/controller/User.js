const user = require('../model/DBuser')
const { querySQL, dataFormat } = require('../../config/connection')

const jwt = require('jsonwebtoken')
const { MD5_SUFFIX, md5, secretKey } = require('../utils/jwt/config')

module.exports = {
  getUserInfo: (req, res, next) => {
    let params = {
      name: req.body.name,
      password: `${md5(req.body.password)}` // `${md5(req.body.password)}_${MD5_SUFFIX}` // MD5_SUFFIX用于md5加密后的密码加上后缀
    }
    // 获取到对应SQL语句
    let sql = user.getUser(params)
    // 请求数据库返回API接口
    querySQL(sql, (data) => {
      if (data.length > 0) {
        // jsonWebToken生成token返给前端保存，然后通过express-jwt验证
        let token = jwt.sign({ username: req.body && req.body.name || null }, secretKey, { expiresIn : '2 days' });
        res.json({
          success: true,
          message: 'Successful operation',
          token: token
        });
        //前端请求格式: Authorization = `Bearer token码`
      } else {
        res.status(500).send('用户不存在')
      }
    })
  },
}