import { Bus } from '../types';

interface BusCardProps {
  bus: Bus;
  onBookNow: (bus: Bus) => void;
}

const BusCard = ({ bus, onBookNow }: BusCardProps) => {
  return (
    <article className="card bus-card">
      <div>
        <h3>{bus.operator}</h3>
        <p className="muted">Bus No: {bus.busNumber}</p>
      </div>

      <div className="route">
        <strong>{bus.from}</strong>
        <span>→</span>
        <strong>{bus.to}</strong>
      </div>

      <p>
        {bus.departureTime} - {bus.arrivalTime}
      </p>

      <p>Date: {bus.travelDate}</p>
      <p>Fare: ₹{bus.fare}</p>
      <p>Seats Left: {bus.availableSeats}</p>

      <button onClick={() => onBookNow(bus)} disabled={bus.availableSeats === 0}>
        {bus.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
      </button>
    </article>
  );
};

export default BusCard;
