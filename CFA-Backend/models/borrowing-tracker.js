const mongoose = require('mongoose');

const BorrowingTrackerSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    itemBorrowed: {type: String, required: true},
    amountOfItem: {type: Number, required: true},
    fromLocation: {type: String, required: true},
    toLocation: {type: String, required: true},
    notes: {type: String, required: false},
    leaderFirstName: {type: String, required: true},
    leaderLastName: {type: String, required: true}
});

module.exports = mongoose.model('BorrowingTracker', BorrowingTrackerSchema);
