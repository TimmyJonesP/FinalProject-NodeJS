const { default: mongoose } = require("mongoose");
const { dbMongo } = require("../src/config/db.config");

const mongoConnect = async () => {
    try{
        await mongoose.connect(dbMongo)
        console.log("db is connected")
    } catch(error) {
        console.log(error)
    }
}

module.exports = mongoConnect