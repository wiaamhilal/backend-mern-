const asyncHander = require("express-async-handler");
const {User, validateUpdateUser} = require("../models/users");
const {models} = require("mongoose");
const bcrypt = require("bcryptjs");

//-----------------------------
// desc get all users profile
// route /api/users/profile
// method GET
// access only the admin
//-----------------------------

module.exports.getAllUsersCtrl = asyncHander(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//-----------------------------
// desc get user profile
// route /api/users/profile/:id
// method GET
// access public
//-----------------------------

module.exports.getUserProfileCtrl = asyncHander(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404).json({message: "user not found"});
  }
  res.status(200).json(user);
});

//-----------------------------
// desc update user profile
// route /api/users/profile/:id
// method POT
// private (only user himself)
//-----------------------------

module.exports.upadateUserProfileCtrl = asyncHander(async (req, res) => {
  const {error} = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    {new: true}
  ).select("-password");
  res.status(200).json(updateUser);
});

//-----------------------------
// desc get users cout
// route /api/users/count
// method GET
// access only the admin
//-----------------------------

module.exports.getUsersCount = asyncHander(async (req, res) => {
  const users = await User.countDocuments();
  res.status(200).json(users);
});

//-----------------------------
// desc upload user photo
// route /api/users/profile/profile-photo-upload
// method POST
// access only logged in user
//-----------------------------

module.exports.profilePhotoUploadCtrl = asyncHander(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({message: "no file provided"});
  }
  res
    .status(200)
    .json({message: "you have been uploaded your photo successfuly"});
});
