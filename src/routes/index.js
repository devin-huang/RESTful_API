const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const user = require('./user')
const productList = require('./productList')



let content = `get方式获取所有产品：<a href="http://localhost:8002/productList/list">http://localhost:8002/productList/list</a>
                </br>
                </br>
                <h4>使用chrome插件Postman调试非get请求</h4>
                post 登录请求：<a href="http://localhost:8002/user/login">http://localhost:8002/user/login</a>
                </br>
                </br>
                post, put, delete增删改产品：
                    <a href="http://localhost:8002/productList/list">http://localhost:8002/productList/list</a>`

module.exports = (app) => {
  app.use('/index', (req, res, next)=> {
    fs.lstat(path.join(__dirname, '../uploadFiles/test.js'), function(err, stats){
      if (stats) {
        let modifyTime = new Date(stats.mtime).getTime()
        // 获取文件的更新时间
        res.setHeader("If-Modified-Since", modifyTime)
      }
      if (req.headers['if-none-match']) {
        // res.statusCode = 304
      } else {
        // 获取项目版本
        res.setHeader("ETag", crypto.createHash('md5').update('1.0.2').digest('hex'))
      }
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
      res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
      // 缓存时间 （一天：60x60x24=86400 ）
      res.setHeader('Cache-Control', 'public, max-age=86400')
      
      
      res.setHeader("X-Powered-By",' express 4.17.1')
      // res.header("Content-Type", "application/json;charset=utf-8")
      res.send(content)
    })
  }),
  app.use('/user', user),
  app.use('/productList', productList)
  app.use('/*', (req, res) => {
    res.send('404 NOT FOUND')
  })
}