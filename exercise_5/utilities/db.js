const config = require('config');
const mongoose = require('mongoose');

const init = async () => {
  try {
    await mongoose.connect({
      authSource: 'admin',
      user: config.mongodb.username,
      pass: config.mongodb.password,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connect to mongodb');
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

const deinit = async () => {
  try {
    await mongoose.disconnect();
    console.log('Successfully disconnect to mongodb');
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

module.exports = {
  init,
  deinit,
};
