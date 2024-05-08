const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/blogDB");
    console.log("connected to database ^_^");
  } catch (error) {
    console.log("conection is faild", error);
  }
};
