const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema({
  reviewText: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 280,
    trim: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewAuthor: {
    // make functionality to attach username automatically
    type: String,
    required: true,
    trim: true,
  },
  // reviewAuthorPic: {
  //  code here to show reviewAuthor's profile pic
  // }
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  breweryId: {
    type: String,
    required: true,
  },
});

const Review = model('Review', reviewSchema);

module.exports = Review;
