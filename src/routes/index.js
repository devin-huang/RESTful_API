const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const user = require('./user')
const productList = require('./productList')


let content = `<h2 style="color: cornflowerblue">环境变量为: ${process.env.NODE_ENV} token ${process.env.NODE_ENV === 'production'? '' : '不' }需要验证</h2>
                get方式获取所有产品：<a href="http://localhost:8002/productList/list">http://localhost:8002/productList/list</a>
                </br>
                </br>
                <h4>使用chrome插件Postman调试非get请求</h4>
                post 登录请求：<a href="http://localhost:8002/user/login">http://localhost:8002/user/login</a>
                </br>
                </br>
                post, put, delete增删改产品：
                    <a href="http://localhost:8002/productList/list">http://localhost:8002/productList/list</a>`

module.exports = (app) => {
  // 全局设置跨域请求头
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", 'express 4.17.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    // 缓存时间 （一天：60x60x24=86400 ）
    res.setHeader('Cache-Control', 'public, max-age=86400')
    next();
  })
  app.use('/index', (req, res, next)=> {
    fs.lstat(path.join(__dirname, '../uploadFiles/test.js'), function(err, stats){
      let promise1 = new Promise((resolve, reject)=>{
        if (stats) {
          let result = null
          let modifyTime = new Date(stats.mtime).getTime()
          // 获取文件的更新时间
          res.setHeader('Last-Modified', modifyTime)
          
          // 设置eTag
          res.setHeader("ETag", crypto.createHash('md5').update('1.0.2').digest('hex'))
          
          result = req.get('If-Modified-Since') ==  res.get('Last-Modified')
          && req.get('If-None-Match') ==  res.get('ETag') ? true : false
          resolve(result)
        }
      })
      promise1.then((result)=>{
        if (result) {
          res.status(304)
        }
        res.send(content)
      })
    })
  }),
  app.use('/user', user),
  app.use('/productList', productList)
  app.use('/*', (req, res) => {
    res.send('404 NOT FOUND')
  })
}