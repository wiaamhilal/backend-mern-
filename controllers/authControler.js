const asyncHander = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/users");

module.exports.registerUserCtrl = asyncHander(async (req, res) => {
  const {error} = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }
  let user = await User.findOne({email: req.body.email});
  if (user) {
    return res.status(400).json({message: "the user is already exist"});
  }
  const salt = await bcrypt.genSalt(10);
  const hashePassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashePassword,
  });
  await user.save();

  res.status(201).json({message: "you have been registered successfully"});
});

// login user

module.exports.loginUserCtrl = asyncHander(async (req, res) => {
  const {error} = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }
  // if user exist
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).json({message: "invalid email"});
  }
  //if passwrd corect
  const ispasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!ispasswordMatch) {
    return res.status(400).json({message: "invalid password"});
  }
  const token = user.generateAuthToken();
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
});
