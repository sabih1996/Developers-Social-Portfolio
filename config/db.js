const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MONGODB CONNECTED !!!!");
  } catch (err) {
    console.error(err.message);
    //process exit
    process.exit(1);
  }
};

module.exports = connectDB;
