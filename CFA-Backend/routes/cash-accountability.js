const express = require("express");

const router = express.Router();

const CashAccountability = require('../models/cash-accountability');

router.post("", (req, res, next) => {
    const cashAccountability = new CashAccountability({
        leaderFirstName: req.body.leaderFirstName,
        leaderLastName: req.body.leaderLastName,
        teamMemberFirstName: req.body.teamMemberFirstName,
        teamMemberLastName: req.body.teamMemberLastName,
        shortageOverage: req.body.shortageOverage,
        amountMissing: req.body.amountMissing,
        mixedDrawer: req.body.mixedDrawer,
        mixedDrawerTeamMemberFirstName: req.body.mixedDrawerTeamMemberFirstName,
        mixedDrawerTeamMemberLastName: req.body.mixedDrawerTeamMemberLastName,
        notes: req.body.notes,
    });
    cashAccountability.save();
    res.status(201).json({
        success: true
    });
});

router.get("", (req, res, next) => {
    CashAccountability.find().sort({_id: -1})
        .then(cashAccountabilityData => {
            res.status(201).json({
                success: true,
                cashAccountabilityData: cashAccountabilityData
            });
        });
});

router.delete(":id", (req, res, next) => {
    console.log(req.params)
});

module.exports = router;