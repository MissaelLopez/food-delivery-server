const mongoose = require("mongoose");
const joi = require("joi");
const { ObjectId } = mongoose.Schema;
const passwordComplexity = require("joi-password-complexity");

const RestaurantSchema = mongoose.Schema({
  businessName: { type: String, required: true },
  contactName: { type: String, required: true },
  clabe: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  facebook: { type: String, required: false, default: "" },
  twitter: { type: String, required: false, default: "" },
  instagram: { type: String, required: false, default: "" },
  picture: { type: String, required: true, default: "" },
  status: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  verified: { type: Boolean, required: true },
  foods: [{ type: ObjectId, ref: "food" }],
});

const Restaurant = mongoose.model("restaurant", RestaurantSchema);

const validate = (data) => {
  const schema = joi.object({
    businessName: joi.string().required().label("business name"),
    contactName: joi.string().required().label("contact name"),
    clabe: joi.string().required().label("clabe"),
    address: joi.string().required().label("address"),
    phone: joi.string().required().label("phone"),
    email: joi.string().required().label("email"),
    facebook: joi.string().label("facebook"),
    twitter: joi.string().label("twitter"),
    instagram: joi.string().label("instagram"),
    picture: joi.string().required().label("picture"),
    status: joi.string().required().label("status"),
    lat: joi.string().required().label("lat"),
    lng: joi.string().required().label("lng"),
    verified: joi.boolean().required().label("verified"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { Restaurant, validate };
