var mongoose = require('mongoose');

var HoursSchema = new mongoose.Schema({
    employee_id: ObjectId,
    date: Date,
    category: String,
    hours: Number
});

module.exports = mongoose.model('Hours', HoursSchema);