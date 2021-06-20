const TeamMemberAttendance = require('../models/team-member-attendance');

exports.createteamMemberAttendance = (req, res, next) => {
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
    };

exports.getTeamMemberAttendance = (req, res, next) => {
        TeamMemberAttendance.find().sort({ _id: -1 })
            .then(teamMemberAttendanceData => {
                res.status(201).json({
                    success: true,
                    teamMemberAttendanceData: teamMemberAttendanceData
                });
            });
    };

exports.deleteTeamMemberAttendance = (req, res, next) => {
    const _ids = req.body.ids;
    TeamMemberAttendance.deleteMany({_id: { $in: _ids}})
        .then(() => {
            res.status(201).json({
                success: true
            })
        })
}