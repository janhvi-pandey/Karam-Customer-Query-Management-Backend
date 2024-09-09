const Admin = require("../models/Admin");
require("dotenv").config();
const express = require("express");
const Query = require("../models/query");
const router = express.Router();

// POST route for admin login
router.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASS
  ) {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

router.get("/getallpen", async (req, res) => {
  try {
    const penquery = await Query.find({ status: "pen" });
    res.json(penquery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pen queries" });
  }
});

router.get("/getallpro", async (req, res) => {
  try {
    const penquery = await Query.find({ status: "pro" });
    res.json(penquery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pen queries" });
  }
});

router.get("/getallcomp", async (req, res) => {
  try {
    const penquery = await Query.find({ status: "comp" });
    res.json(penquery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pen queries" });
  }
});

router.get("/changetopro/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = await Query.findByIdAndUpdate(id, { status: "pro" });
    res.json({ query, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error updating query status" });
  }
});

module.exports = router;
