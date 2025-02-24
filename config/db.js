const mongoose = require('mongoose');
const connectDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log('db connected');
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDb;
