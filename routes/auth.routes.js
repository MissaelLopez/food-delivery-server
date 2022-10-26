const router = require("express").Router();
const { User } = require("../models/user.model");
const joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ msg: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ msg: "El email no esta registrado" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ msg: "Contraseña Incorrecta" });
    }

    if (!user.verified) {
      return res
        .status(401)
        .send({ msg: "El usuario aún no ha sido verificado" });
    }

    const token = user.generateAuthToken(user.id);

    res.status(200).send({
      token,
      userId: user.id,
      user: user.user,
      type: user.type,
      msg: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
});

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
