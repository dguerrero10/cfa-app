const express = require("express");

const router = express.Router();

const TeamMemberAbsent = require('../models/team-member-absent');

router.post("", (req, res, next) => {
    const teamMemberAbsent = new TeamMemberAbsent({
        teamMemberName: req.body.teamMemberName,
        issue: req.body.issue,
        workArea: req.body.workArea,
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
    TeamMemberAbsent.find().sort({_id: -1})
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