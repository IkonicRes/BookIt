const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const { typeDefs, resolvers } = require('./models');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Retrieve the user's authentication token from the request headers, if available.
    const token = req.headers.authorization || '';

    // Decode and verify the token to identify the user (if authenticated).
    const user = token ? verifyToken(token) : null; // Implement token verification function.

    // Initialize database connection and external API client.
    // const externalApi = initializeExternalApi();

    return {
      user, // The authenticated user (or null if not authenticated).
      token, // Database connection or ORM instance.
      // externalApi, // External API client.
    };
  },
});

const setup = async function () {
  await server.start();

  // Apply the GraphQL middleware directly to the app
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(routes);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
setup();