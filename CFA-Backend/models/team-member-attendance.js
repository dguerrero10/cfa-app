const mongoose = require('mongoose');

const TeamMemberAttendanceSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    workArea: {type: String, required: true},
    issue: {type: String, required: true},
    reportedSymptoms: [{type: String, required: false}],
    otherExplanation: {type: String, required: false},
    notes: {type: String, required: false},
    leaderFirstName: {type: String, required: true},
    leaderLastName: {type: String, required: true}
});

module.exports = mongoose.model('TeamMemberAttendance', TeamMemberAttendanceSchema);