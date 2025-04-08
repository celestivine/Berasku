const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler('Mohon lengkapi semua data', 400));
    }

    const avatar = {
        public_id: "default_avatar",
        url: "https://example.com/default-avatar.png"
    };

    const user = await User.create({ 
        name, 
        email, 
        password, 
        avatar,
        role: 'admin' 
    });

    sendToken(user, 201, res); // Status 201 Created
});

// Login user (admin only) => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are entered
    if (!email || !password) {
        return next(new ErrorHandler('Mohon masukkan email dan kata kunci', 400));
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Email atau kata kunci salah', 401));
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Email atau kata kunci salah', 401));
    }

    // Check if user is admin
    if (user.role !== 'admin') {
        return next(new ErrorHandler('Hanya admin yang dapat masuk', 403));
    }

    sendToken(user, 200, res);
});

// Logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Berhasil keluar'
    });
});
