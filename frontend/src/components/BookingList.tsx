import { Booking } from '../types';

interface BookingListProps {
  bookings: Booking[];
}

const BookingList = ({ bookings }: BookingListProps) => {
  return (
    <section className="card">
      <h2>Recent Bookings</h2>

      {bookings.length === 0 ? (
        <p className="muted">No bookings yet.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id}>
              <strong>{booking.passengerName}</strong> booked {booking.seatsBooked} seat(s) on{' '}
              <strong>{booking.bus.operator}</strong> ({booking.bus.from} → {booking.bus.to}) for ₹
              {booking.totalAmount}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default BookingList;
