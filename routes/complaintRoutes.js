const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.post('/submit', async (req, res) => {
  try {
    const { name, email, productCode, complaint } = req.body;
    console.log(req.body);

    if (!name || !email || !complaint) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newComplaint = new Complaint({
      name,
      email,
      productCode, 
      complaint,
    });

    const result = await newComplaint.save();
    console.log(result);

    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ message: 'Error submitting complaint', error });
  }
});

module.exports = router;
