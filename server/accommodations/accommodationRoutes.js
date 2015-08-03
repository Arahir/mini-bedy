var accommodationController = require('./accommodationController.js');

module.exports = function(app){
  app.get('/', accommodationController.all);
  app.post('/', accommodationController.add);
  app.get('/:city', accommodationController.getByCity);
};