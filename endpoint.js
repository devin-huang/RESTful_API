const initializeEndpoint = (app) => {
  /**
   * @swagger
   *
   * definitions:
   *   NewUser:
   *     type: object
   *     required:
   *       - username
   *       - password
   *     properties:
   *       username:
   *         type: string
   *       password:
   *         type: string
   *         format: password
   *   User:
   *     allOf:
   *       - $ref: '#/definitions/NewUser'
   *       - required:
   *         - id
   *       - properties:
   *         id:
   *           type: integer
   *           format: int64
   */
  
  /**
   * @swagger
   * /users:
   *   get:
   *     description: Returns users
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/User'
   */
  app.get('/users', (req, res) => {
    // Your implementation logic comes here ...
  });
  
  /**
   * @swagger
   *
   * /users:
   *   post:
   *     description: Creates a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/User'
   */
  app.post('/users', (req, res) => {
    // Your implementation logic comes here ...
  });
}

module.exports = initializeEndpoint