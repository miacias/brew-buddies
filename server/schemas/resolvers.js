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
      console.log(context);
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('reviews');
      }
      throw new AuthenticationError('Please log in to do this.');
    },
    // probably won't use "breweries"
    breweries: async () => Brewery.find().populate('reviews'),
    brewery: async ({ breweryId }) =>
      Brewery.findOne({ breweryId }).populate('reviews'),
    reviews: async () => Review.find(),
  },
  Mutation: {
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
    addFavBrewery: async (parent, { breweryId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              favBreweries: breweryId,
            },
          }
        );
      }
    },
    addReview: async (
      parent,
      { reviewText, starRating, createdAt, breweryId },
      context
    ) => {
      if (context.user) {
        const newReview = await Review.create({
          reviewText,
          starRating,
          reviewAuthor: context.user.username,
          createdAt,
          breweryId,
        });
        const newUserRev = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              reviews: newReview._id,
            },
          }
        );
        const newBrewRev = await Brewery.findOneAndUpdate(
          { breweryId },
          {
            $addToSet: {
              reviews: newReview._id,
            },
          }
        );
        return { review: newReview, user: newUserRev, brewery: newBrewRev };
      }
    },
  },
};

module.exports = resolvers;
