const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/mongodb");
const movie_routes = require("./routes/movie_routes");
const user_routes = require("./routes/user_routes");


connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded()); 
app.use(movie_routes);
app.use(user_routes);
app.use(passport.initialize());
require("./config/passport")(passport);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
  }

app.listen(port, () => {
    console.log("Server Started Succesfully");
});

