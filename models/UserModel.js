const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'username is required'],
    },
    email: {
      type: String,
      required: [true, 'email address is required'],
      unique: [true, 'Email address already exists'],
    },
    password: {
      type: String,
      required: [true, 'password address is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Users', userSchema);
