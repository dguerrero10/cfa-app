const express = require("express");

const router = express.Router();

const TeamMemberAttendance = require('../models/team-member-attendance');

router.post("", (req, res, next) => {
    const teamMemberAttendance = new TeamMemberAttendance({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        issue: req.body.issue,
        workArea: req.body.workArea,
        reportedSymptoms: req.body.reportedSymptoms,
        otherExplanation: req.body.otherExplanation,
        notes: req.body.notes,
        leaderFirstName: req.body.leaderFirstName,
        leaderLastName: req.body.leaderLastName,
    });
    teamMemberAttendance.save();
    res.status(201).json({
        success: true
    });
});

router.get("", (req, res, next) => {
    TeamMemberAttendance.find().sort({_id: -1})
        .then(documents => {
            res.status(201).json({
                success: true,
                teamAttendance: documents
            });
        });
});

router.delete(":id", (req, res, next) => {
    console.log(req.params)
});

module.exports = router;