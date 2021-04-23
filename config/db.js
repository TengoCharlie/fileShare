const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  // Database connection
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  const connection = mongoose.connection;

  connection
    .once("open", () => {
      console.log("database Connected");
    })
    .catch((err) => {
      console.log("Connection Failed.");
    });
}

module.exports = connectDB;
