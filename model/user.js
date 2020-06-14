const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {type: String, require: true, unique: true},
    email: {type: mongoose.SchemaTypes.Email, require: true, unique: true},
    password: {type: String, require: true, unique: true},
    password2: {type: String, require: true}
});

module.exports = mongoose.model('Khachhang', user);
