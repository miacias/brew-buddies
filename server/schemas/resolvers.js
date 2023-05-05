const { AuthenticationError } = require('apollo-server-express');
const { User, Brewery } = require('../models');
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
                return User.findOne({ _id: context.user._id }).populate('reviews');
            }
            throw new AuthenticationError('Please log in to do this.');
        },
        // probably won't use "breweries"
        breweries: async () => {
            return Brewery.find().populate('reviews');
        },
        brewery: async ({ breweryId }) => {
            return Brewery.findOne({ breweryId: breweryId }).populate('reviews');
        },
        // reviews: async () => {
        //     return Reviews.find();
        // }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const newUser = await User.create({ username, email, password });;
            const token = signToken(newUser);
            return { token, newUser };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with that email address.')
            }
            const passCheck = await user.isCorrectPassword(password);
            if (!passCheck) {
                throw new AuthenticationError('Incorrect credentials. Please try again.');
            }
            const token = signToken(user);
            return { token, user };
        },
        // be sure to send entire object from front-end so that values are not set to "null"
        //  look into PATCH crud operation via apollo graphql (PUT is for entire object change whereas PATCH is one piece)
        editUser: async (parent, { username, email, password, profilePic, postalCode, intro, pronouns }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        username: username,
                        email: email,
                        password: password,
                        profilePic: profilePic,
                        postalCode: postalCode,
                        intro: intro,
                        pronouns: pronouns
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;