const mongoose = require('mongoose');
const DATABASE_URI =`mongodb+srv://eyakhalfallah:test1234@cluster0.g1yfvoi.mongodb.net/PharmacieDB?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;