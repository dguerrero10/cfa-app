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
    teamMemberAttendance.save()
        .then(() =>
            res.status(201).json({
                success: true
            }))
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
    TeamMemberAttendanceQueries.queryNoAttendance(req);
    TeamMemberAttendanceQueries.queryLateToWork(req);
    TeamMemberAttendanceQueries.queryUniformIssues(req);
};

exports.getTeamMemberAttendance = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const query = TeamMemberAttendance.find();
    let fetchedData;
    if (pageSize && currentPage) {
        query
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    query.find().sort({ _id: -1 })
        .then(teamMemberAttendanceData => {
            fetchedData = teamMemberAttendanceData;
            return TeamMemberAttendance.countDocuments();

        }).then(count => {
            res.status(200).json({
                success: true,
                teamMemberAttendanceData: fetchedData,
                itemCount: count
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.deleteTeamMemberAttendance = (req, res, next) => {
    const _ids = req.body.ids;
    TeamMemberAttendance.deleteMany({ _id: { $in: _ids } })
        .then(() => {
            res.status(201).json({
                success: true
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.updateExpiration = (req, res, next) => {
    TeamMemberAttendance.find(date)
        .then(result => console.log(result))
};