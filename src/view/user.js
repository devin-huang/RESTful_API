const express = require('express')
const router = express.Router()

const { jsonParser, urlencodedParser } = require('../utils/postSetting')
const user = require('../controller/User')

// Root
router.post('/login', jsonParser, user.getUserInfo);

module.exports = router

