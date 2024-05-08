const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlenth: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlenth: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
//generate auth token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {id: this._id, isAdmin: this.isAdmin},
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema);
// validate register user
const validateRegisterUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().min(5).max(100).required(),
    password: Joi.string().trim().min(8).max(100).required(),
  });
  return schema.validate(obj);
};

// validate login user
const validateLoginUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required(),
    password: Joi.string().trim().min(8).max(100).required(),
  });
  return schema.validate(obj);
};

// validate update user
const validateUpdateUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100),
    password: Joi.string().trim().min(8),
    bio: Joi.string(),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
