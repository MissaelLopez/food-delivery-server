const mongoose = require("mongoose");
const joi = require("joi");
const { ObjectId } = mongoose.Schema;

const FoodSchema = mongoose.Schema({
  restaurant: { type: ObjectId, ref: "restaurant", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  picture: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
});

const Food = mongoose.model("food", FoodSchema);

const validate = (data) => {
  const schema = joi.object({
    restaurant: joi.string().required().label("restaurant"),
    name: joi.string().required().label("name"),
    description: joi.string().required().label("description"),
    price: joi.number().required().label("price"),
    picture: joi.string().required().label("picture"),
    category: joi.string().required().label("category"),
    status: joi.string().required().label("status"),
  });
  return schema.validate(data);
};

module.exports = { Food, validate };
