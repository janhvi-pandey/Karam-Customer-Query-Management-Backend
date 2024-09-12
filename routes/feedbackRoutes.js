const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback/submit
router.post('/submit', async (req, res) => {
  try {
    const { name, email, feedback, attachment } = req.body;
    console.log(req.body)
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
     
    });
    const result= await newFeedback.save();
    console.log(result);
    
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
});

module.exports = router;
