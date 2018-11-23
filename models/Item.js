const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new mongoose.Schema({
  Tv_Series_Name: {
    type: String
  },
  Rating: {
    type: String
  },
  Overview: {
    type: String
  },
  TV_Series_Poster: {
    type: String
  },
  id: {
    type: String
  },
  Web_Site:{
    type: String
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
