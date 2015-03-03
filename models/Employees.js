var mongoose = require('mongoose');

var EmployeesSchema = new mongoose.Schema({
    name: String,
    birthday: Date,
    gender: Boolean,
    photo: String // path to the image stored in filesystem
});

module.exports = mongoose.model('Employees', EmployeesSchema);