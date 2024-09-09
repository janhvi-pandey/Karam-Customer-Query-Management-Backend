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

// Get all pending queries
router.get("/getallpen", async (req, res) => {
  try {
    const penquery = await Query.find({ status: "pen" });
    res.json(penquery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending queries" });
  }
});

// Get all processing queries
router.get("/getallpro", async (req, res) => {
  try {
    const proquery = await Query.find({ status: "pro" });
    res.json(proquery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching processing queries" });
  }
});

// Get all completed queries
router.get("/getallcomp", async (req, res) => {
  try {
    const compquery = await Query.find({ status: "comp" });
    res.json(compquery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching completed queries" });
  }
});

// Change query to "processing"
router.get("/changetopro/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = await Query.findByIdAndUpdate(id, { status: "pro" });
    res.json({ query, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error updating query status" });
  }
});

// Change query to "completed"
router.get("/changetocomp/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = await Query.findByIdAndUpdate(id, { status: "comp" });
    res.json({ query, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error updating query status" });
  }
});

// New route to get counts for pending, processing, and completed queries
router.get("/getquerycounts", async (req, res) => {
  try {
    const pendingCount = await Query.countDocuments({ status: "pen" });
    const processingCount = await Query.countDocuments({ status: "pro" });
    const completedCount = await Query.countDocuments({ status: "comp" });

    res.json({
      pendingCount,
      processingCount,
      completedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching query counts" });
  }
});

module.exports = router;
