const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email Address'],
    },
    phone: {
      type: String,
      required: [true, 'Please enter your Phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please enter your address'],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('contacts', contactSchema);
