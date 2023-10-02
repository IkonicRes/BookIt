const { signToken } = require('../utils/auth'); // Import your authentication functions

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id);
        return userData;
      }
      return null;
    },
  
    getSavedBooks: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view saved books.');
      }
  
      try {
        const user = await User.findById(context.user._id);
        return user.savedBooks;
      } catch (error) {
        // Handle any errors (e.g., database errors)
        throw new Error('Unable to retrieve saved books.');
      }
    },
    // Other query resolvers...
  },

  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !user.validatePassword(password)) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    signup: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_, { bookData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to save a book.');
      }
    
      try {
        // Find the user by ID
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: bookData } }, // Add the book to savedBooks
          { new: true } // Return the updated user data
        );
    
        return user;
      } catch (error) {
        // Handle any errors (e.g., database errors)
        throw new Error('Unable to save the book.');
      }
    },
    
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to remove a book.');
      }
    
      try {
        // Find the user by ID and remove the book from savedBooks
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } }, // Remove the book with the specified bookId
          { new: true } // Return the updated user data
        );
    
        return user;
      } catch (error) {
        // Handle any errors (e.g., database errors)
        throw new Error('Unable to remove the book.');
      }
    },
    
    // Other mutation resolvers...
  },
};

module.exports = resolvers;
