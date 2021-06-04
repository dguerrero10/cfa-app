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
    care.save();
    res.status(201).json({
        success: true
    });
});

router.get("", (req, res, next) => {
    Care.find()
        .then(documents => {
            res.status(201).json({
                success: true,
                cares: documents
            });
        });
});

module.exports = router;