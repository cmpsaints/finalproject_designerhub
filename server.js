let path = require("path");
let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let passport = require("passport");

let users = require("./routes/api/users");
let profile = require("./routes/api/profile");
//let posts = require("./routes/api/posts");

let app = express();

/* --- Body-Parser middleware --- */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let db = require("./config/keys").mongoURI;

/* --- connect to Mongo --- */
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* --- Passport middleware --- */
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
//app.use("/api/posts", posts);

/* --- static assets for production phase ---*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
