let mainRouter = require("./routes/index.routes");
let userRoutes = require("./routes/users.routes");
const methodOverride = require('method-override')
const createError = require("http-errors");
const session = require('express-session');


const express = require("express");
const path = require("path")

const app = express();

app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, "./public"))) 
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(session({
    secret: 'UltraSecreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use("/", mainRouter);
app.use("/users", userRoutes);
// app.use((req, res, next) => next(createError(404)));
// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.path = req.path;
//     res.locals.error = req.app.get("env") === "development" ? err : {};
//     res.status(err.status || 500);
//     res.render("error")
// });
module.exports = app;