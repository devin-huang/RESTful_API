const user = require('./user')
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const params = {
  jsonParser: jsonParser,
  urlencodedParser: urlencodedParser
}

module.exports = (app) => {
  user(app, params);
}