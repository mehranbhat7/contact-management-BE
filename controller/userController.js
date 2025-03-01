const bcrypt = require('bcrypt');
const userSchema = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json('all the fields are necessary');
  }
  const checkUser = await userSchema.findOne({ email });
  if (checkUser) {
    res.status(409).json('user already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userSchema.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json('Something is missing');
  }
  const user = await userSchema.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = await jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_EXPIRY }
    );
    res.status(200).json({ token: accessToken });
  } else {
    res.status(400).json('soryy');
  }
};

const currentUSer = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = { userSignup, userLogin, currentUSer };
