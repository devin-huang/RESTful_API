const express = require('express')
const router = express.Router()

const { jsonParser, urlencodedParser } = require('../utils/postSetting')
const user = require('../controller/User')

/**
 * @swagger
 *
 * /user/login:
 *   post:
 *     tags:
 *        - user
 *     description: login user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error operation
 */
// Root
router.post('/login', jsonParser, user.getUserInfo);

module.exports = router

