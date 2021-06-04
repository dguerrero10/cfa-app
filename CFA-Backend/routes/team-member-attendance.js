const express = require("express");

const router = express.Router();

const TeamMemberAbsent = require('../models/team-member-absent');

router.post("", (req, res, next) => {
    const teamMemberAbsent = new TeamMemberAbsent({
        teamMemberName: req.body.teamMemberName,
        issue: req.body.issue,
        reportedSymptoms: req.body.reportedSymptoms,
        otherExplanation: req.body.otherExplanation,
        notes: req.body.notes,
        leaderName: req.body.leaderName
    });
    teamMemberAbsent.save();
    res.status(201).json({
        success: true
    });
});

router.get("", (req, res, next) => {
    TeamMemberAbsent.find()
        .then(documents => {
            res.status(201).json({
                success: true,
                teamAttendance: documents
            });
        });
});

module.exports = router;