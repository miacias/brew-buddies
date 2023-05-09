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
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  breweryId: {
    type: Schema.Types.ObjectId,
    ref: 'Brewery',
  },
});

const Review = model('Review', reviewSchema);

module.exports = Review;
