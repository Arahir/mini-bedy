var mongoose = require('mongoose');

var AccommodationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  city: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    default: 'private room'
  }
});

module.exports = mongoose.model('Accommodation', AccommodationSchema);
