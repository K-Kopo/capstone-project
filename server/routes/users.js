const express = require("express");
const router = express.Router();
const user = require("../models/user");

// get all userss
router.route("/").get((req, res) => {
    user.fetchAll()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(400).json({ message: "Error can't get userss" });
        });
});

// get single users by id
router.route("/:id").get((req, res) => {
    user.where({ id: req.params.id })
        .fetch({ withRelated: ["donations"] })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(400).json({ message: "Error, can't get users" });
        });
});

module.exports = router;