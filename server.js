const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
require("./models/connection");

//following three are added as per auth tutorial min: 5
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//configure express server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);
const apiRoutes = require("./routes/api-routes");
const userRoutes = require("./routes/user-routes");
app.use(apiRoutes, userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
