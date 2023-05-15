const { AuthenticationError } = require('apollo-server-express');
const { User, Brewery, Review } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // shows all users with attached reviews
    // do we want to also populate favBreweries?
    users: async () => User.find().populate(['reviews', 'friends']),
    // shows specific user with attached reviews
    user: async (parent, { username }) =>
      User.findOne({ username }).populate(['reviews', 'friends']),
    // shows specific user who is logged in currently with attached reviews
    // do we want to also populate favBreweries & friends?
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate([
          'reviews',
          'friends',
        ]);
      }
      throw new AuthenticationError('Please log in to do this.');
    },
    // shows all breweries with attached reviews
    // add await after the arrow function
    breweries: async () => Brewery.find().populate('reviews'),
    // shows specific brewery with attached reviews
    brewery: async (id) => Brewery.findOne({ id }).populate('reviews'),
    // shows three most recent reviews from Review model
    reviews: async () => {
      const homeReviews = await Review.find().sort({ createdAt: -1 }).limit(3);
      // console.log(homeReviews);
      // promise inside a map, the await Promise.all will fire off all asyncs
      const homeReviewsWithAvatar = await Promise.all(homeReviews.map(async (review) => {
        const reviewUser = await User.findOne({ username: review.reviewAuthor });
          return {
            ...review,
            avatar: reviewUser.profilePic,
          };
      }));
      //why is it returning a nested object?
      console.log(homeReviewsWithAvatar);
      return homeReviews;
      //loop over results of homereviews, we need to map through and match usernames
    },
    // finds review by ID
    review: async (parent, { breweryId }) => {
      const reviewSet = await Review.find({
        breweryId,
      }).sort({ createdAt: -1 });
      return reviewSet;
    },
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
    // allows the user to change their information
    editUser: async (parent, { input }, context) => {
      const { profilePic, postalCode, intro, pronouns } = input;
      if (context.user) {
        const editedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
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
    // removes brewery from user favorites list
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
    // adds review to User, Brewery, and Review models
    addReview: async (
      parent,
      { breweryId, starRating, reviewText },
      context
    ) => {
      console.log('hi from addReview resolver');
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
        return {
          review: newReview,
          user: newUserRev,
        };
      }
    },
    // allows user to change review for a brewery
    editReview: async (
      parent,
      { reviewId, reviewText, starRating },
      context
    ) => {
      if (context.user) {
        // edits Review model
        const revEdit = await Review.findOneAndUpdate(
          { _id: reviewId },
          {
            reviewText: reviewText ? `Edited: ${reviewText}` : reviewText,
            starRating,
          },
          {
            new: true,
          }
        );
        return revEdit;
      }
    },
    // allows user to add another user as a friend
    addFriend: async (parent, { friendId }, context) => {
      // console.log(context.user);
      if (context.user) {
        console.log(friendId.id);
        const newFriend = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              friends: friendId,
            },
          },
          {
            new: true,
          }
        );
        return {
          newFriend,
        };
      }
    },
    // removes user from friends list
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              friends: friendId,
            },
          },
          {
            new: true,
          }
        );
      }
    },
  },
};

module.exports = resolvers;
