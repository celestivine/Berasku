const mongose = require('mongoose');

const connectDatabase = () => {
    mongose.connect('process.env.DB_LOCAL_URI', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
}