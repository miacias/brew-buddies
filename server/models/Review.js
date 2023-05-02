const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema({
  reviewText: {
    type: String,
    required: 'Please add text to your review.',
    minLength: 1,
    maxLength: 280,
    trim: true,
  },
  starRating: {
    type: Number,
    min: 1,
    max: 5
  },
  reviewAuthor: {
    //make functionality to attach username automatically
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  breweryId: {
    //need to pull ID from API call
    type: String,
    required: true,
  }
});

const Review = model('Review', reviewSchema);

module.exports = Review;
  
//Schemas will be User and Review and Brewery
//Saved-Breweries and Friends will all be added as arrays on the User