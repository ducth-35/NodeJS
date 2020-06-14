const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giohang = new Schema({
    theloai: {type: String, require: true, unique: true},
    price: {type: String, require: true},
    image: {type: String, require: true},
});

module.exports = mongoose.model('GIOHANG', giohang);
