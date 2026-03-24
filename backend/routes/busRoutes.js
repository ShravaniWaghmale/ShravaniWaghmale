const express = require('express');
const Bus = require('../models/Bus');

const router = express.Router();

// Get buses with optional filters
router.get('/', async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const filter = {};
    if (from) {
      filter.from = { $regex: `^${from}$`, $options: 'i' };
    }
    if (to) {
      filter.to = { $regex: `^${to}$`, $options: 'i' };
    }
    if (date) {
      filter.travelDate = date;
    }

    const buses = await Bus.find(filter).sort({ departureTime: 1 });
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch buses', error: error.message });
  }
});

module.exports = router;
