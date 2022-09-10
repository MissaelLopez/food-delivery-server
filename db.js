const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};
