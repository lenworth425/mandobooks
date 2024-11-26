import User  from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface AddUserArgs {
    input:{
        username: string;
        email: string;
        password: string;
    }
}

interface LoginUserArgs {
        email: string;
        password: string;
}

interface AddBookArgs {
    input:{
        title: string;
        authors: string[];
        description: string;
        bookId: string;
        image: string;
        link: string;
    }
}

interface RemoveBookArgs {
    input:{
        bookId: string;
    }
}

export const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Could not Authenticate user.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Could not Authenticate user.');
            }

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            const user = await User.create(input);
            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        saveBook: async (_parent: any, { input }: AddBookArgs, context: any) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true }
                );

                console.log(updatedUser);

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (_parent: any, { input }: RemoveBookArgs, context: any) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: input.bookId } } },
                    { new: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
            
        }
    }
};

export default resolvers;



