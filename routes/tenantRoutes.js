const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Route for submitting a maintenance request
router.post('/submit-request', async (req, res) => {
  try {
    const { apartment, area, description, photo } = req.body;

    // Validate input
    if (!apartment || !area || !description) {
      return res.status(400).json({ error: 'All fields are required except photo.' });
    }

    // Create a new request
    const newRequest = new Request({
      requestID: Math.random().toString(36).substr(2, 9), // Generate random request ID
      apartment,
      area,
      description,
      photo, // Optional
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully!', request: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit request.' });
  }
});

module.exports = router;