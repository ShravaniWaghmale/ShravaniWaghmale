const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    operator: {
      type: String,
      required: true,
      trim: true
    },
    from: {
      type: String,
      required: true,
      trim: true
    },
    to: {
      type: String,
      required: true,
      trim: true
    },
    departureTime: {
      type: String,
      required: true
    },
    arrivalTime: {
      type: String,
      required: true
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0
    },
    fare: {
      type: Number,
      required: true,
      min: 0
    },
    travelDate: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bus', busSchema);
