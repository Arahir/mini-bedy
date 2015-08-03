var Accommodation = require('./accommoModel');

module.exports = {
  all : function (req, res) {
    Accommodation.find(function(err, accommodations){
      if (err) res.send(err);

      res.json(accommodations);
    });
  },
  getByCity: function (req, res) {
    Accommodation.find({city: req.body.city},function(err, accommodations){
      if (err) res.send(err);

      res.json(accommodations);
    });
  },
  add: function (req, res) {
    var accommodation = new Accommodation();
    accommodation.city = req.body.city;
    accommodation.title = req.body.title;
    accommodation.price = req.body.price;
    console.log(req.body);
    accommodation.save(function(err) {
      if (err) {
        // duplicate entry
        if (err.code == 11000)
          return res.json({ success: false, message: 'An accommodation with that title already exists. '});
        else
          return res.send(err);
      }

      // return a message
      res.json({ message: 'Accommodation created!' });
    });
  }
};