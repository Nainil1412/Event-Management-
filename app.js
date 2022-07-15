require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

//database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the Database!"));

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("uploads"));

//set template engine
app.set("view engine", "ejs");

//route prefix
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
  console.log("Server started at", PORT);
});

//login and registration

// const express = require('express');
const ejs = require("ejs");
const path = require("path");
// const app = express();
const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
// const session = require('express-session');
const MongoStore = require("connect-mongo");
session;

// const MongoDBURI = process.env.MONGO_URI || 'mongodb://localhost/ManualAuth';

// mongoose.connect(DB_URI, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });

// const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {});

app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/test-app",
    }),
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/views"));

const index = require("./routes/index");
app.use("/", index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 8000
// app.listen(process.env.PORT || 8000, () => {
//   console.log('Express app listening on port 8000');
// });
