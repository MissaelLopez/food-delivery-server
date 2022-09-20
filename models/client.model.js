const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const ClientSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Client = mongoose.model("client", ClientSchema);

const validate = (data) => {
  const schema = joi.object({
    name: joi.string().required().label("name"),
    lastname: joi.string().required().label("lastname"),
    phone: joi.string().required().label("phone"),
    email: joi.string().required().label("email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { Client, validate };
