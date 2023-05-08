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
            console.log(context)
            if (context.user) {
                return User.findOne({ _id: context.user._id} ).populate('reviews');
            }
            throw new AuthenticationError('Please log in to do this.');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password, birthday }) => {
            const newUser = await User.create({ username, email, password, birthday });
            const token = signToken(newUser);
            return { token, newUser };
        },
        login: async (parent, { email, password} ) => {
            const user = await User.findOne( {email} );
            if (!user) {
                throw new AuthenticationError('No user found with that email address.')
            }
            const passCheck = await user.isCorrectPassword(password);
            if (!passCheck) {
                throw new AuthenticationError('Incorrect credentials. Please try again.');
            }
            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;