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
    schemes: ['http'],
    tags: [
      {
        name: 'production',
        description: "test production list"
      }
    ]
  }
}