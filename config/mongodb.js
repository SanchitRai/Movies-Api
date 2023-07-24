const mongoose = require("mongoose");
const dbConfig = require("./db_config");

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(dbConfig.database, {
          //  userNewUrlParser: true,
            useUnifiedTopology: true,
          //  useFindAndModify: false
        });
        console.log("MongoDB Connected: ${conn.connection.host}");
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports =connectDB;