const express = require('express')
const router = express.Router()

const production = require('../controller/Production')
const { jsonParser, urlencodedParser } = require('../utils/postSetting')


/**
 * @swagger
 *
 * /productList/list:
 *   get:
 *     tags:
 *        - production
 *     description: get all production list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error operation
 */
// Get User
router.get('/list', production.getProduction)

/**
 * @swagger
 *
 * /productList/list:
 *   post:
 *     tags:
 *        - production
 *     description: create one / multiple production list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            type:
 *              type: string,
 *            description:
 *              type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error operation
 */
// Create a User
router.post('/list', jsonParser, production.createProduction)

/**
 * @swagger
 *
 * /productList/list:
 *   put:
 *     tags:
 *        - production
 *     description: update production list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *            type:
 *              type: string
 *              example: button
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error operation
 */
// Update User
router.put('/list', jsonParser, production.updateProduction)

/**
 * @swagger
 *
 * /productList/list:
 *   delete:
 *     tags:
 *        - production
 *     description: delete production list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            delList:
 *              type: array
 *              example: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error operation
 */
// Delete a User
router.delete('/list', jsonParser, production.deleteProduction)

module.exports = router

