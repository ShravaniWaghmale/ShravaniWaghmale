import { FormEvent, useState } from 'react';
import api from '../services/api';
import { Booking, Bus } from '../types';

interface BookingFormProps {
  selectedBus: Bus | null;
  onBooked: (booking: Booking) => void;
  onCancel: () => void;
}

const BookingForm = ({ selectedBus, onBooked, onCancel }: BookingFormProps) => {
  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!selectedBus) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/bookings', {
        busId: selectedBus._id,
        passengerName,
        email,
        seatsBooked
      });

      onBooked(response.data.booking as Booking);
      setPassengerName('');
      setEmail('');
      setSeatsBooked(1);
    } catch (apiError: unknown) {
      const maybeError = apiError as { response?: { data?: { message?: string } } };
      setError(maybeError.response?.data?.message ?? 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Book Seat - {selectedBus.operator}</h2>
      <p>
        Route: {selectedBus.from} → {selectedBus.to}
      </p>

      <label>
        Passenger Name
        <input
          type="text"
          value={passengerName}
          onChange={(event) => setPassengerName(event.target.value)}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label>
        Seats
        <input
          type="number"
          min={1}
          max={selectedBus.availableSeats}
          value={seatsBooked}
          onChange={(event) => setSeatsBooked(Number(event.target.value))}
          required
        />
      </label>

      <p>Total Amount: ₹{selectedBus.fare * seatsBooked}</p>

      {error ? <p className="error">{error}</p> : null}

      <div className="actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
