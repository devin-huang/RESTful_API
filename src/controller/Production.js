const production = require('../model/DBproduction')
const { querySQL, dataFormat } = require('../../config/connection')

module.exports = {
  getProduction: async (req, res, next) => {
    // 获取到对应SQL语句
    let sql = production.getData()
    // 请求数据库返回API接口
    await querySQL(sql, (data) => { res.json(dataFormat(data)) })
  },
  createProduction: async (req, res, next) => {
    let sql = production.addData(req.body)
    await querySQL(sql, (data) => { res.json(dataFormat(data)) })
  },
  updateProduction: async (req, res, next) => {
    let sql = production.updateData(req.body)
    await querySQL(sql, (data) => { res.json(dataFormat(data)) })
  },
  deleteProduction: async (req, res, next) => {
    let sql = production.deleteData(req.body)
    await querySQL(sql, (data) => { res.json(dataFormat(data)) })
  }
}