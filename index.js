const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const port = 8000;

const path = require("path");

const db = require("./config/mongoose");

require("./config/view-helper")(app);

const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");

app.use(express.urlencoded());

app.use(expressLayouts);
app.set("layout", "layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// const sassMiddleware = require("node-sass-middleware");
// app.use(
//   sassMiddleware({
//     src: path.join(__dirname, "./assets", "sass"),
//     dest: path.join(__dirname, "./assets", "css"),
//     debug: true,
//     outputStyle: "extended",
//     prefix: "/css",
//   })
// );

app.use(express.static("./assets"));

app.use("/", require("./routes/index"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`App listening on port : ${port}`);
});
