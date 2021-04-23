const express = require("express");
const path = require("path");
const cors = require("cors";)

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const connectDB = require("./config/db");

connectDB();

// CORS

const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
};

app.use(cors(corsOptions));
// Template engine

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//Routes

app.use("/api/files", require("./routes/files")); //upload

app.use("/files", require("./routes/show")); //download

app.use("/files/download", require("./routes/download"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
