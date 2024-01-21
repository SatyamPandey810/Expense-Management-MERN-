const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Database connected');
    }).catch((error) => {
        console.log(error.message);
    })

}
module.exports = connectDb