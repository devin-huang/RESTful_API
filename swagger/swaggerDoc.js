const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const { swaggerConfig } = require('./config')

const options = {
  swaggerDefinition: {
    basePath: swaggerConfig.basePath,
    swagger: swaggerConfig.swagger, // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: swaggerConfig.title, // Title (required)
      version: swaggerConfig.version, // Version (required)
    },
    schemes: swaggerConfig.schemes,
    tags: swaggerConfig.tags
  },
  apis: swaggerConfig.apis, // Path to the API docs
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  // 开放 swagger 相关接口，
  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  }),
  app.use(swaggerConfig.routerPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  
}