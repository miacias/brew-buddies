const { AuthenticationError } = require('apollo-server-express');
const { User, Brewery, Review } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // shows all users with attached reviews
    users: async () => User.find().populate('reviews'),
    // shows specific user with attached reviews
    user: async (parent, { username }) =>
      User.findOne({ username }).populate('reviews'),
    // shows specific user who is logged in currently with attached reviews
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('reviews');
      }
      throw new AuthenticationError('Please log in to do this.');
    },
    // shows all breweries with attached reviews
    breweries: async () => Brewery.find().populate('reviews'),
    // shows specific brewery with attached reviews
    brewery: async ({ breweryId }) =>
      Brewery.findOne({ breweryId }).populate('reviews'),
    // shows all reviews from Review model
    reviews: async () => Review.find(),
  },
  Mutation: {
    // creates new user and connects user to site
    addUser: async (
      parent,
      {
        username,
        email,
        password,
        profilePic,
        birthday,
        postalCode,
        intro,
        pronouns,
      }
    ) => {
      const newUser = await User.create({
        username,
        email,
        password,
        profilePic,
        birthday,
        postalCode,
        intro,
        pronouns,
      });
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    // connects returning user to site
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with that email address.');
      }
      const passCheck = await user.isCorrectPassword(password);
      if (!passCheck) {
        throw new AuthenticationError(
          'Incorrect credentials. Please try again.'
        );
      }
      const token = signToken(user);
      return { token, user };
    },
    // edits user data
    editUser: async (
      parent,
      {
        username,
        email,
        password,
        birthday,
        profilePic,
        postalCode,
        intro,
        pronouns,
      },
      context
    ) => {
      if (context.user) {
        const editedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              username,
              email,
              password,
              birthday,
              profilePic,
              postalCode,
              intro,
              pronouns,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return { user: editedUser };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // adds brewery to user favorites list
    addFavBrewery: async (parent, { breweryId }, context) => {
      if (context.user) {
        console.log(breweryId);
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              favBreweries: breweryId,
            },
          },
          {
            new: true,
          }
        );
      }
    },
    // adds review to User, Brewery, and Review models
    addReview: async (
      parent,
      { reviewText, starRating, breweryId },
      context
    ) => {
      if (context.user) {
        const newReview = await Review.create({
          reviewText,
          starRating,
          reviewAuthor: context.user.username,
          breweryId,
        });
        const newUserRev = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              reviews: newReview._id,
            },
          },
          {
            new: true,
          }
        );
        const newBrewRev = await Brewery.findOneAndUpdate(
          { _id: breweryId },
          {
            $addToSet: {
              reviews: newReview._id,
            },
          },
          {
            new: true,
          }
        );
        return { review: newReview, user: newUserRev, brewery: newBrewRev };
      }
    },
    removeFavBrewery: async (parent, { breweryId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              favBreweries: breweryId,
            },
          }
        );
      }
    },
  },
};

module.exports = resolvers;
