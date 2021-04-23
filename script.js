const File = require("./models/file");
const fs = require("fs");
const connectDB = require("./config/db");
connectDB();

async function fetchData() {
  // fetch all files from data base before 24 hours
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const files = await File.find({ createdAt: { $lt: pastDate } });

  if (!files.length) {
    return console.log("No older files found");
  }
  for (const file of files) {
    try {
      fs.unlinkSync(file.path);
      await file.remove();
      console.log(`Successfully Deleted`);
    } catch (err) {
      console.log(`Error while deleting file`);
    }
  }
  console.log(`Successfully Completed`);
}

// module.exports = fetchData;

fetchData().then(() => {
  process.exit();
});
