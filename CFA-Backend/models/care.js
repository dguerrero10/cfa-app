const mongoose = require('mongoose');

const CareSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    guestName: {type: String, required: false},
    guestPhoneNUmber: {type: Number, required: false},
    category: {type: String, required: true},
    issue: [{type: String, required: true}],
    otherExplanation: {type: String, required: false},
    modeOfVisit: {type: String, required: false},
    teamMemberPosition: {type: String, required: false},
    leaderName: {type: String, required: true}
});

module.exports = mongoose.model('CareSchema', CareSchema);
