var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

// configure our server to handle CORS requests
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

  app.get('/', function (req, res) {
    res.send('It Works!')
  });

  var userRouter = express.Router();
  var accommodationRouter = express.Router();

  accommodationRouter.use(function(req, res, next){
    console.log(req.body);

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, 'b3dycasaS3cr37W3ap0n', function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          console.log('token', req.body);

          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next(); // make sure we go to the next routes and don't stop here
        }
      });

    } else {

      // if there is no token
      // return an HTTP response of 403 (access forbidden) and an error message
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }
  });

  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/accommodations', accommodationRouter); // use accommodation router for all accommodation request

// inject our routers into their respective route files
require('../users/userRoutes.js')(userRouter);
require('../accommodations/accommodationRoutes.js')(accommodationRouter);

};