const mongoose = require('mongoose');

const ItemOrderSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    workAreaItem: {type: String, required: true},
    areasSearched: [{type: String, required: true}],
    itemsNeeded: [{type: String, required: true}],
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

module.exports = mongoose.model('ItemOrder', ItemOrderSchema);
