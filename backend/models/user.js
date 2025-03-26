const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Mohon masukkan nama anda'],
        maxLength: [30, 'Nama tidak boleh lebih dari 30 karakter']
    },
    email: {
        type: String,
        required: [true, 'Mohon masukkan email anda'],
        unique: true,
        validate: [validator.isEmail, 'Mohon masukkan email yang valid']
    },
    password: {
        type: String,
        required: [true, 'Mohon masukkan password anda'],
        minLength: [6, 'Password minimal 6 karakter'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
} 

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

module.exports = mongoose.model('User', userSchema);