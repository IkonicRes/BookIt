const db = require('../config/connection');
const cleanDB = require('./cleanDB');
const { User } = require('../models');

const data = require('./data.json');

db.once('open', async () => {
  await cleanDB('User', 'users');

  await User.insertMany(data);

  console.log('Database seeded!');
  process.exit(0);
});
