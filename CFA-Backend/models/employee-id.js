const mongoose = require('mongoose');

const EmployeeIdSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    employeeId: {type: Number, required: true}
});

module.exports = mongoose.model('EmployeeId', EmployeeIdSchema);
