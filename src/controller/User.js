const user = require('../model/DbUser')
const { querySQL, dataFormat } = require('../../config/connection')

module.exports = {
  getUser: (req, res) => {
    // 获取到对应SQL语句
    let sql = user.getUser()
    // 请求数据库返回JSON格式数据
    querySQL(sql, (data) => {
      res.json(dataFormat(data))
    })
  },
  createUser: (req, res) => {
    // console.log(req.body)
    let sql = user.addUser(req.body)
    res.json(querySQL(sql))
  },
  updateUser: (req, res) => {
    console.log(req.body)
    let sql = user.updateUser()
    querySQL(sql, (data) => {
      res.json(dataFormat(data))
    })
  },
  // deleteUser: (req, res) => {
  //   let sql = "select description, title,content,time from tp_post"
  //   res.json(querySQL(sql))
  // }
}



