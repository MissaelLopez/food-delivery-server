const router = require("express").Router();
const { Client, validate } = require("../models/client.model");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const methods = require("../methods");

// Get clients
router.get("/", methods.ensureToken, async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

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

    const clientObj = {
      name: req.body.name,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
    };

    await new Client(clientObj).save();
    await new User({
      email: req.body.email,
      password: hashPassword,
      type: "client",
      verified: true,
    }).save();

    res.status(201).send({ msg: "Client created successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = router;
