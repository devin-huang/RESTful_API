const fs = require('fs')
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
  app.use('/index', (req, res)=> {
    fs.lstat(path.join(__dirname, '../uploadFiles/test.js'), function(err, stats){
      let modifyTime = new Date(stats.mtime).getTime()
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("ETag", 'ETagETagETag');
      // 获取文件的更新时间
      res.header("If-Modified-Since", modifyTime);
      res.header("X-Powered-By",' express 4.17.1')
      // res.header("Content-Type", "application/json;charset=utf-8");
      res.send(content)
    })
  }),
  app.use('/user', user),
  app.use('/productList', productList)
  app.use('/*', (req, res) => {
    res.send('404 NOT FOUND')
  })
}