const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { body, validationResult } = require("express-validator");

const User = require("../../models/User");
//@route   POST api/users
//@desc    Register User
//@access  Public
router.post(
  "/",
  [
    body("name", "name is required").not().isEmpty(),
    // name must be an email
    body("email", "email required").isEmail(),
    // password must be at least 5 chars long
    body("password", "password required").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      //Check existence of user

      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ message: "User ALredy Existes" }] });
      }
      //Get user Gravtar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      //create instance of user

      user = User({
        name,
        email,
        avatar,
        password,
      });
      //Encrypt Password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //Return JWT

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
