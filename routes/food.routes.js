const router = require("express").Router();
const { Food, validate } = require("../models/food.model");
const { Restaurant } = require("../models/restaurant.model");
const methods = require("../methods");

// Get foods
router.get("/", methods.ensureToken, async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Get a food
router.get("/:id", methods.ensureToken, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Create a new Food
router.post("/", methods.ensureToken, async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ msg: error.details[0].message });
    }

    const food = await new Food({ ...req.body }).save();
    const restaurantId = req.body.restaurant;
    const foodId = food._id;

    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.foods.push(foodId);
    await restaurant.save();

    res.status(201).send({ msg: "Food created successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = router;
