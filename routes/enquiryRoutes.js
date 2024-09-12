const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');


router.post('/submit', async (req, res) => {
  try {
    const { name, email, productCode, query } = req.body;
    console.log(req.body);

   
    if (!name || !email || !query) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEnquiry = new Enquiry({
      name,
      email,
      productCode, 
      query,
    });

    const result = await newEnquiry.save();
    console.log(result);

    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({ message: 'Error submitting enquiry', error });
  }
});

module.exports = router;
