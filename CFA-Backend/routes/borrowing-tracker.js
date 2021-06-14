const express = require("express");

const router = express.Router();

const BorrowingTracker = require('../models/borrowing-tracker');

router.post("", (req, res, next) => {
    const borrowingTracker = new BorrowingTracker({
        itemBorrowed: req.body.itemBorrowed,
        amountOfItem: req.body.amountOfItem,
        fromLocation: req.body.fromLocation,
        toLocation: req.body.toLocation,
        notes: req.body.notes,
        leaderFirstName: req.body.leaderFirstName,
        leaderLastName: req.body.leaderLastName
    });
    borrowingTracker.save();
    res.status(201).json({
        success: true
    });
});

router.get("", (req, res, next) => {
    BorrowingTracker.find().sort({_id: -1})
        .then(borrowingTrackerData => {
            res.status(201).json({
                success: true,
                borrowingTrackerData: borrowingTrackerData
            });
        });
});

router.delete(":id", (req, res, next) => {
    console.log(req.params)
});

module.exports = router;