const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req) {
    // Get the request headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthenticationError('You have no token!');
    }

    // Token is typically sent as "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('You have no token!');
    }

    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      return data;
    } catch (error) {
      console.log('Invalid token');
      throw new AuthenticationError('Invalid token!');
    }
  },
  verifyToken: function (token) {
    try {
      const decoded = jwt.verify(token, secret); // Replace with your actual secret key
      return decoded;
    } catch (error) {
      throw new Error('Token verification failed');
    }
  },  
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
