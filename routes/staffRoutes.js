const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Route to view all maintenance requests
router.get('/view-requests', async (req, res) => {
  try {
    const { apartment, area, status, startDate, endDate } = req.query;

    // Build the filter query
    const query = {};
    if (apartment) query.apartment = apartment;
    if (area) query.area = area;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Fetch filtered requests
    const requests = await Request.find(query);
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Route to update request status
router.patch('/update-request/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    // Update the request status
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({
      message: 'Request status updated successfully!',
      request: updatedRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update request' });
  }
});

module.exports = router;