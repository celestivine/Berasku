const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// Handle Uncaught Exception 
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
});

// Load environment variables
dotenv.config({ path: 'backend/config/config.env' });

// Connect to database
connectDatabase().then(() => {
    // Start server only after successful DB connection
    const server = app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
    });

    // Handle Unhandled Promise Rejections
    process.on('unhandledRejection', err => {
        console.log(`ERROR: ${err.message}`);
        console.log('Shutting down the server due to Unhandled Promise Rejection');
        server.close(() => process.exit(1));
    });
}).catch(err => {
    console.log(`Database connection failed: ${err.message}`);
    process.exit(1); 
});
