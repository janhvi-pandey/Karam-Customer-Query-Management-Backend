const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const userrouter = require("./routes/userRoute");
const adminRoutes = require("./routes/adminroute");

mongoose
  .connect("mongodb://127.0.0.1:27017/karam")
  .then(() => console.log("Connection Done 👍"))
  .catch((err) => console.log("Error Found  😒", err));

//middleware
app.use(express.json());
app.use(cors());

//Routes
app.use(userrouter);
app.use(adminRoutes);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
