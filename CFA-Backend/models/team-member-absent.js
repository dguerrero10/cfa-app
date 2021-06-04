const mongoose = require('mongoose');

const TeamMemberAbsentSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    teamMemberName: {type: String, required: true},
    issue: {type: String, required: true},
    reportedSymptoms: [{type: String, required: false}],
    otherExplanation: {type: String, required: false},
    notes: {type: String, required: false},
    leaderName: {type: String, required: true}
});

module.exports = mongoose.model('TeamMemberAbsent', TeamMemberAbsentSchema);