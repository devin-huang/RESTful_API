const user = require('./user')
const productList = require('./productList')

module.exports = (app) => {
  app.use('/user', user),
  app.use('/productList', productList)
}