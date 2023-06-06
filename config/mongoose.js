const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  // await mongoose.connect(`mongodb+srv://codeialtest1234:aman1234@cluster0.jnofoef.mongodb.net/?retryWrites=true&w=majority`);
  await mongoose.connect(`mongodb+srv://imdivyachoudhary:divya123@cluster0.lg0g4rt.mongodb.net/habbit_tracker?retryWrites=true&w=majority`);
  // await mongoose.connect(`mongodb+srv://tested:test1234@cluster0.3gzaffk.mongodb.net/`);
  console.log(`Connected to DB : habbit_tracker`);
}

const db = mongoose.connection;

module.exports = db;

// db.on("error", console.error.bind(console, "Error connecting to db"));

// db.once("open", function () {
//   console.log("Successfully connected to db");
// });
