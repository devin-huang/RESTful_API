const production = require('../model/DBproduction')
const { querySQL, dataFormat } = require('../../config/connection')

module.exports = {
  getProduction: (req, res, next) => {
    // 获取到对应SQL语句
    let sql = production.getData()
    // 请求数据库返回API接口
    querySQL(sql, (data) => { res.json(dataFormat(data)) })
  },
  createProduction: (req, res, next) => {
    let sql = production.addData(req.body)
    querySQL(sql, (data) => { res.json(dataFormat(data)) })
  },
  updateProduction: (req, res, next) => {
    let sql = production.updateData(req.body)
    querySQL(sql, (data) => { res.json(dataFormat(data)) })
  },
  deleteProduction: (req, res, next) => {
    let sql = production.deleteData(req.body)
    querySQL(sql, (data) => { res.json(dataFormat(data)) })
  }
}