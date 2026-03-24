const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Bus = require('../models/Bus');

dotenv.config();

const sampleBuses = [
  {
    busNumber: 'MH12-AB-1001',
    operator: 'CityLine Travels',
    from: 'Pune',
    to: 'Mumbai',
    departureTime: '07:00 AM',
    arrivalTime: '10:30 AM',
    totalSeats: 40,
    availableSeats: 40,
    fare: 550,
    travelDate: '2026-03-30'
  },
  {
    busNumber: 'MH14-CD-2002',
    operator: 'Express Connect',
    from: 'Mumbai',
    to: 'Nashik',
    departureTime: '08:30 AM',
    arrivalTime: '12:00 PM',
    totalSeats: 36,
    availableSeats: 36,
    fare: 450,
    travelDate: '2026-03-30'
  },
  {
    busNumber: 'KA01-EF-3003',
    operator: 'FastGo Buses',
    from: 'Bengaluru',
    to: 'Chennai',
    departureTime: '09:00 PM',
    arrivalTime: '03:30 AM',
    totalSeats: 45,
    availableSeats: 45,
    fare: 900,
    travelDate: '2026-03-31'
  },
  {
    busNumber: 'DL05-GH-4004',
    operator: 'North Star Roadways',
    from: 'Delhi',
    to: 'Jaipur',
    departureTime: '06:00 AM',
    arrivalTime: '11:00 AM',
    totalSeats: 42,
    availableSeats: 42,
    fare: 600,
    travelDate: '2026-03-30'
  }
];

const seedData = async () => {
  try {
    await connectDB();
    await Bus.deleteMany({});
    await Bus.insertMany(sampleBuses);
    console.log('✅ Sample buses inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
