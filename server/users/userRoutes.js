var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from server.js

//  app.post('/signin', userController.signin);
//  app.post('/signup', userController.signup);
 app.get('/', function(req, res){
   res.json({ message: 'hooray! welcome to our api!' });
 });
};
