const mongoose = require('mongoose');

const CashAccountabilitySchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    leaderFirstName: {type: String, required: true},
    leaderLastName: {type: String, required: true},
    teamMemberFirstName: {type: String, required: true},
    teamMemberLastName: {type: String, required: true},
    shortageOverage: {type: String, required: true},
    amountMissing: {type: Number, required: true},
    mixedDrawer: {type: String, required: true},
    mixedDrawerTeamMemberFirstName: {type: String, required: false},
    mixedDrawerTeamMemberLastName: {type: String, required: false},
    notes: {type: String, required: false}
});

module.exports = mongoose.model('CashAccountability', CashAccountabilitySchema);