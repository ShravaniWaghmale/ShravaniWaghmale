const express = require('express');
const Booking = require('../models/Booking');
const Bus = require('../models/Bus');

const router = express.Router();

// Create booking
router.post('/', async (req, res) => {
  try {
    const { busId, passengerName, email, seatsBooked } = req.body;

    if (!busId || !passengerName || !email || !seatsBooked) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const parsedSeats = Number(seatsBooked);
    if (Number.isNaN(parsedSeats) || parsedSeats <= 0) {
      return res.status(400).json({ message: 'Seats booked must be a positive number' });
    }

    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    if (bus.availableSeats < parsedSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const totalAmount = parsedSeats * bus.fare;

    const booking = await Booking.create({
      bus: bus._id,
      passengerName,
      email,
      seatsBooked: parsedSeats,
      totalAmount
    });

    bus.availableSeats -= parsedSeats;
    await bus.save();

    const populatedBooking = await booking.populate('bus');

    res.status(201).json({
      message: 'Booking created successfully',
      booking: populatedBooking
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
});

// Get all bookings
router.get('/', async (_req, res) => {
  try {
    const bookings = await Booking.find().populate('bus').sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
});

module.exports = router;
