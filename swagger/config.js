const path = require('path')

module.exports = {
  swaggerConfig: {
    basePath: '/',
    swagger: '2.0',
    title: 'swagger-express-jsdoc',
    version: '1.0.0',
    apis: [
      path.join(__dirname, '../src/routes/*.js')
    ],
    routerPath: '/api-docs',
    schemes: ['http', 'https'],
    tags: [
      {
        name: 'production',
        description: "check production handler"
      },
      {
        name: 'user',
        description: "check user handler"
      }
    ]
  }
}