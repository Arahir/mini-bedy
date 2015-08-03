var User = require('./userModel.js');
var jwt = require('jsonwebtoken');

module.exports = {
  signup : function(req, res){
    var user = new User();		// create a new instance of the User model
    user.name = req.body.name;  // set the users name (comes from the request)
    user.username = req.body.username;  // set the users username (comes from the request)
    user.password = req.body.password;  // set the users password (comes from the request)

    user.save(function(err) {
      if (err) {
        // duplicate entry
        if (err.code == 11000)
          return res.json({ success: false, message: 'A user with that username already exists. '});
        else
          return res.send(err);
      }

      // return a message
      res.json({ message: 'User created!' });
    });
  },
  authenticate : function(req, res){
    // find the user
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user) {

      if (err) throw err;

      // no user with that username was found
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        // check if password matches
        user.comparePasswords(req.body.password).then(function(validPassword) {
          console.log('isValid', validPassword);
          if (!validPassword) {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {

            // if user is found and password is right
            // create a token
            var token = jwt.sign({
              name: user.name,
              username: user.username
            }, 'b3dycasaS3cr37W3ap0n', {
              expiresInMinutes: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }
        });
      }

    });
  }
 };