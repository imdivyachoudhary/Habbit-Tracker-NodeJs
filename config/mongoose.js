const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`mongodb+srv://imdivyachoudhary:divya123@postbook.7qjzw10.mongodb.net/?retryWrites=true&w=majority`);
  console.log(`Connected to DB : habbit_tracker`);
}

const db = mongoose.connection;

module.exports = db;

// db.on("error", console.error.bind(console, "Error connecting to db"));

// db.once("open", function () {
//   console.log("Successfully connected to db");
// });
