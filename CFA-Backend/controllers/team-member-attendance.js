const TeamMemberAttendance = require('../models/team-member-attendance');
const TeamMemberAttendanceQueries = require('../controllers/queries/teamMemberAttendance');

exports.createTeamMemberAttendance = (req, res, next) => {
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
        TeamMemberAttendanceQueries.queryNoAttendance(req);
        TeamMemberAttendanceQueries.queryLateToWork(req);
        TeamMemberAttendanceQueries.queryUniformIssues(req);
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
        .then(result => {
            res.status(201).json({
                success: true
            })
        })
}