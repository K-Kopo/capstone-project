const express = require("express");
const router = express.Router();
const user = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET;

// get all users
router.route("/").get((req, res) => {
  user
    .fetchAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(400).json({ message: "Error can't get userss" });
    });
});

// get single users by id
router.route("/:id").get((req, res) => {
  user
    .where({ id: req.params.id })
    .fetch({ withRelated: ["donations"] })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(400).json({ message: "Error, can't get users" });
    });
});

router.route("/signup").post((req, res) => {
  const { password } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err)
      return res.status(500).json({ message: "failed to encrypt password" });
    new user({
      name: req.body.name,
      username: req.body.username,
      role: req.body.role,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
    })
      .save()
      .then((newuser) => {
        const token = signJWTToken(newuser);
        res.status(201).json({ authToken: token });
      })
      .catch(() =>
        res.status(400).json({ message: "Error, can't create user" })
      );
  });
});
module.exports = router;
