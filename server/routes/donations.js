const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");
const User = require("../models/user");


// get all inventories
router
    .route("/")
    .get((req, res) => {
        Donation.fetchAll()
            .then((donations) => {
                res.status(200).json(donations);
            })
            .catch(() => {
                res.status(400).json({ message: "Error can't get inventories" });
            });
    })
    .post((req, res) => {
        User.where({ id: req.body.user_id })
            .fetch()
            .then(
                (user) => {
                    console.log("User found");
                    return warehouse;
                },
                () => res.status(404).json({ message: "User not found" })
            )
            .then((user) => {
                new Donation({
                    name: req.body.name,
                    description: req.body.description,
                    user_id: user.id,
                    amount: req.body.amount,
                    type: req.body.type,
                    expires: req.body.expires
                })
                    .save()
                    .then((newDonation) => {
                        res.status(201).json(newDonation);
                    });
            })

            .catch((error) => {
                res.status(400).json({
                    message: "Error, can't create inventory item",
                });
            });
    });

// get single inventory by id
router
    .route("/:id")
    .get((req, res) => {
        Donation.where({ id: req.params.id })
            .fetch({ withRelated: ["user"] })
            .then((donation) => {
                res.status(200).json({ donation });
            })
            .catch(() => {
                res.status(400).json({ message: "Error, can't get donation" });
            });
    })
    .put((req, res) => {
        Donation.where({ id: req.params.id })
            .fetch()
            .then((inventory) => {
                inventory
                    .save({
                        name: req.body.name,
                        description: req.body.description,
                        user_id: req.body.user_id,
                        amount: req.body.amount,
                        expires: req.body.expires,
                        type: req.body.type
                    })
                    .then((updatedDonation) => {
                        res.status(200).json(updatedDonation);
                    })
                    .catch(() => {
                        res.status(400).json({ message: "Error, can't save donation" });
                    });
            });
    })
    .delete((req, res) => {
        Donation.where("id", req.params.id)
            .destroy()
            .then(() => {
                console.log(deletedDonation);

                res.status(200).json({
                    message: `Donation ${req.params.id} deleted successfully`,
                });
            })
            .catch(() => res.status(400).json({ message: "Error, can't delete donation" }));
    });


module.exports = router;