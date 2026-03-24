export interface Bus {
  _id: string;
  busNumber: string;
  operator: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  availableSeats: number;
  fare: number;
  travelDate: string;
}

export interface Booking {
  _id: string;
  bus: Bus;
  passengerName: string;
  email: string;
  seatsBooked: number;
  totalAmount: number;
  createdAt: string;
}
