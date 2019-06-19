const express = require('express')
const router = express.Router()

const production = require('../controller/Production')
const { jsonParser, urlencodedParser } = require('../utils/postSetting')

// Get User
router.get('/list', production.getProduction)

// Create a User
router.post('/list', jsonParser, production.createProduction)

// Update User
router.put('/list', jsonParser, production.updateProduction)

// Delete a User
router.delete('/list', jsonParser, production.deleteProduction)

module.exports = router

