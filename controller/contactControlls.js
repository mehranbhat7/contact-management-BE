const asyncHandler = require('express-async-handler');
const contactModel = require('../models/contactModel');

const getcontacts = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
const getcontactsbyId = asyncHandler(async (req, res) => {
  const Onecontact = await contactModel.findById({
    _id: req.params.id,
    user_id: req.user.id,
  });
  if (!Onecontact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(Onecontact);
});
const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone, address } = req.body;
  if (!name || !email || !phone || !address) {
    res.status(400);
    throw new Error('all fields required');
  }
  const contact = await contactModel.create({
    name,
    email,
    address,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});
const updateContact = async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to update this contact');
  }
  const updatedContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
};

const deleteContact = async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to delete this contact');
  }
  await contact.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ message: 'Contact deleted successfully', id: req.params.id });
};

module.exports = {
  getcontacts,
  getcontactsbyId,
  postContact,
  updateContact,
  deleteContact,
};
