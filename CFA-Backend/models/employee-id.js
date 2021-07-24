const mongoose = require('mongoose');

const EmployeeIdSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    employeeId: {type: Number, required: true},
    adminPrivilege: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('EmployeeId', EmployeeIdSchema);
