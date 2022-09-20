const router = require("express").Router();
const { Restaurant, validate } = require("../models/restaurant.model");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const methods = require("../methods");

// Get users
router.get("/", methods.ensureToken, async (req, res) => {
  const restaurants = await Restaurant.find();
  res.status(200).json(restaurants);
});

// Create a new restaurant
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).send({ msg: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ msg: "El email ya esta registrado" });
    }

    const salt = await bcrypt.genSalt(Number(10));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const restaurantObj = {
      businessName: req.body.businessName,
      contactName: req.body.contactName,
      clabe: req.body.clabe,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      picture: req.body.picture,
      status: req.body.status,
      lat: req.body.lat,
      lng: req.body.lng,
      verified: req.body.verified,
    };

    await new Restaurant(restaurantObj).save();
    await new User({
      email: req.body.email,
      password: hashPassword,
      type: "restaurant",
      verified: req.body.verified,
    }).save();

    res.status(201).send({ msg: "Restaurant created successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

router.delete("/:email", methods.ensureToken, async (req, res) => {
  try {
    await Restaurant.findOneAndDelete(req.params.email);
    await User.findOneAndDelete(req.params.email);
    res.status(200).send({ msg: "User and Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = router;
