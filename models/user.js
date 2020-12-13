const mongoose = require('mongoose'),
    Schema     = mongoose.Schema,
    bcrypt     = require('bcrypt'),
    MODEL_NAME = 'User';

// Create User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model(MODEL_NAME, userSchema);

module.exports = User;
