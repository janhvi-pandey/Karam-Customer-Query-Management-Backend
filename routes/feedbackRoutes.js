const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback/submit
router.post('/submit', async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    console.log(req.body);

    // Validate that the required fields are present
    if (!name || !email || !feedback) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newFeedback = new Feedback({
      name,
      email,
      feedback,
    });

    const result = await newFeedback.save();
    console.log(result);

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
});

module.exports = router;
