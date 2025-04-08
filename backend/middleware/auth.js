const catchAsyncErrors = require('./catchAsyncErrors')

//  Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler('Mohon masuk untuk mengakses resource ini', 401))
    }
    next()
})

// Handling user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role ${req.user.role} tidak diizinkan untuk mengakses resource ini`, 403))
        }
        next()
    }
}