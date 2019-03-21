let express = require("express");
let router = express.Router();
let gravatar = require("gravatar");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let keys = require("../../config/keys");
let passport = require("passport");

let validateRegisterInput = require("../../validation/register");
let validateLoginInput = require("../../validation/login");

let User = require("../../models/User");

/* --- actions during new user registration --- */
router.post("/register", (req, res) => {
  let { errors, isValid } = validateRegisterInput(req.body);

  /* --- check validation value during registration --- */
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      let avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        // f: "y", //forcing default, only using default image for now
        d: "mp"
      });

      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/* --- actions during user login --- */
router.post("/login", (req, res) => {
  let { errors, isValid } = validateLoginInput(req.body);

  /* --- check validation value during login --- */
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let email = req.body.email;
  let password = req.body.password;

  /* --- find user by email --- */
  User.findOne({ email }).then(user => {
    /* --- check if user exists ---*/
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }

    /* --- check password --- */
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        let payload = { id: user.id, name: user.name, avatar: user.avatar };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
