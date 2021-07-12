const mongoose = require('mongoose');

const FinancialServiceSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    receiptPurpose: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    imgPath: {type: String, required: true}
});

module.exports = mongoose.model('FinancialService', FinancialServiceSchema);
