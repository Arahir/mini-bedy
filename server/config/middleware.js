var bodyParser = require('body-parser');
var morgan = require('morgan');

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

  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/accommodation', accommodationRouter); // use accommodation router for all accommodation request

// inject our routers into their respective route files
require('../users/userRoutes.js')(userRouter);
//require('accommodation/accommodationRoutes.js')(accommodationRouter);

};