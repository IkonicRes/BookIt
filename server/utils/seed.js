const mongoose = require('mongoose');
const { User, Book } = require('../models'); // Adjust the import paths as needed

// Define sample data
const users = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' },
  // Add more user data as needed
];

const books = [
  { title: 'Book 1', author: 'Author 1', description: 'Description 1' },
  { title: 'Book 2', author: 'Author 2', description: 'Description 2' },
  // Add more book data as needed
];

const databaseURI = (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks'); // Replace with your actual database URI

// Connect to the database
mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Insert sample data
const seedData = async () => {
  try {
    await db.dropDatabase(); // Clear the database before seeding (optional)
    await User.insertMany(users);
    await Book.insertMany(books);
    console.log('Sample data seeded successfully');
  } catch (error) {
    console.error('Error seeding sample data:', error);
  } finally {
    // Close the database connection and exit the process
    db.close()
    process.exit(0);
  }
};

// Handle database connection events
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit with an error code
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  seedData(); // Call your seed data function here
});
