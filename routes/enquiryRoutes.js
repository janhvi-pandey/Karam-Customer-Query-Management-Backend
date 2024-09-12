const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');


router.post('/submit', async (req, res) => {
  try {
    const { name, email, productCode, query, attachment } = req.body;
    console.log(req.body);
    
    const newEnquiry = new Enquiry({
      name,
      email,
      productCode,
      query,
      attachment,
    });
    await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting enquiry', error });
  }
});

module.exports = router;
