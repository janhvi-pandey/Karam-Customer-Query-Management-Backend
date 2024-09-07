const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const userrouter = require("./routes/userRoute");
const adminRoutes = require("./routes/adminroute");
const queryRoute = require("./routes/queryRoute");
const connectmongo = require('./database/db')

// Middleware
app.use(express.json());


app.use(cors({
    origin: 'https://customer-query-management-frontend.vercel.app',
    credentials: true
}));

connectmongo();

// Routes
app.use(queryRoute);
app.use(userrouter);
app.use(adminRoutes);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// Instead of listening on a port, export the app
module.exports = app;
