const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // shows all users with attached reviews
        users: async () => {
            return User.find().populate('reviews');
        },
        // shows specific user with attached reviews
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('reviews');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id} ).populate('reviews');
            }
            throw new AuthenticationError('Please log in to do this.');
        }
    }
    // Mutation: {

    // }
};

module.exports = resolvers;