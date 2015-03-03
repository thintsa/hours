var mongoose = require('mongoose');

var CategoriesSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Categories', CategoriesSchema);