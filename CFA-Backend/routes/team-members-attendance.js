const express = require("express");

const checkAuth = require('../middleware/check-auth');

const teamMemberAttendanceController = require('../controllers/team-member-attendance');

const router = express.Router();

router.post("", checkAuth, teamMemberAttendanceController.createTeamMemberAttendance);
router.post("/delete", checkAuth, teamMemberAttendanceController.deleteTeamMemberAttendance);
router.post("/update-expiration", checkAuth, teamMemberAttendanceController.updateExpiration);
router.get("", checkAuth, teamMemberAttendanceController.getTeamMemberAttendance);

module.exports = router;