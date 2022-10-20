const mongoose = require("mongoose");
const joi = require("joi");
const { ObjectId } = mongoose.Schema;

const locationSchema = mongoose.Schema(
  {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = mongoose.Schema({
  client: { type: String, required: true },
  food: [{ type: ObjectId, ref: "food" }],
  date: { type: String, required: true },
  location: locationSchema,
  status: { type: String, required: true },
});

const Order = mongoose.model("order", OrderSchema);

const validate = (data) => {
  const schema = joi.object({
    client: joi.string().required().label("Cliente"),
    food: joi.string().required().label("Platillo"),
    date: joi.date().required().label("Fecha"),
    location: joi.object().label("Ubicacion"),
    status: joi.string().required().label("status"),
  });
  return schema.validate(data);
};

module.exports = { Order, validate };
