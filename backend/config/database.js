const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const con = await mongoose.connect('mongodb://localhost:27017/Berasku', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected with HOST: ${con.connection.host}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error; 
    }
};

module.exports = connectDatabase;
