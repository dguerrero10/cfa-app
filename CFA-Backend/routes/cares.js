const express = require("express");

const router = express.Router();

const Care = require('../models/care');

router.post("", (req, res, next) => {
    const care = new Care({
        guestName: req.body.guestName,
        guestPhoneNUmber: req.body.guestPhoneNumber,
        category: req.body.category,
        issue: req.body.issue,
        otherExplanation: req.body.otherExplanation,
        modeOfVisit: req.body.modeOfVisit,
        teamMemberPosition: req.body.teamMemberPosition,
        leaderName: req.body.leaderName
    });
    care.save().then(careData => {
        res.status(201).json({
            success: true,
            care: careData
        });
    });
})

router.get("", (req, res, next) => {
    Care.find().sort({_id: -1})
        .then(documents => {
            res.status(201).json({
                success: true,
                care: documents
            });
        });
});

module.exports = router;