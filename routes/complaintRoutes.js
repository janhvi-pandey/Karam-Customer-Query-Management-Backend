const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');


router.post('/submit', async (req, res) => {
  try {
    const { name, email, productCode, complaint, attachment } = req.body;
    const newComplaint = new Complaint({
      name,
      email,
      productCode,
      complaint,
      attachment,
    });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting complaint', error });
  }
});

module.exports = router;
