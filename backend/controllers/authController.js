const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const avatar = {
        public_id: "default_avatar",
        url: "https://example.com/default-avatar.png"
    };

    const user = await User.create({ 
        name, 
        email, 
        password, 
        avatar 
    });

    sendToken(user, 200, res);
});

// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const { email, password } = req.body;

    //  Check if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Mohon masukkan email dan kata kunci', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
        return next(new ErrorHandler('Email atau kata kunci salah', 401));
    }

    // Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Email atau kata kunci salah', 401));
    }

    sendToken(user, 200, res);

})

