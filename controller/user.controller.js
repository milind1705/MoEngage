const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  // validating all field
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "all fields are requires",
    });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist. try with other emailId" });
    }
    // create hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;

        //save the new user
        const newUser = new User({ name: name, email: email, password: hash });

        newUser
          .save()
          .then((user) => {
            res.status(200).json({
              message: "user saved successfully",
            });
          })
          .catch((err) => {
            res.status(401).json({
              message:
                err.message || "something went wrong while creating admin",
            });
          });
      });
    });
  });
};

//login for user
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  //validating field
  if (!email || !password) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(401).json({
        message: "user is not available",
      });
    }

    // passwword validation
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({
          message: "email and password does not match",
        });
      }
      // asign token to user
      jwt.sign(
        { id: user._id },
        process.env.JWT_KEY,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            token: token,
            user: { id: user._id, name: user.name, email: user.email },
          });
        }
      );
    });
  });
};

module.exports.get_user = (req, res) => {
  User.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.send(err);
    });
};
