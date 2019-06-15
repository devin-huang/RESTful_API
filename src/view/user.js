const user = require('../controller/User')

module.exports = (app, {jsonParser, urlencodedParser}) => {

  // Get User
  app.get('/api/user', user.getUser);
  
  // Create a User
  app.post('/api/user', jsonParser, user.createUser);
  
  // Update User
  app.put('/api/user/:id', user.updateUser);

  // // Delete a User
  // app.delete('/api/customers/:id', user.deleteUser);
}