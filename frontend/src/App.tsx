import { useEffect, useState } from 'react';
import SearchForm from './components/SearchForm';
import BusCard from './components/BusCard';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import api from './services/api';
import { Booking, Bus } from './types';

const App = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchBuses = async (filters?: { from?: string; to?: string; date?: string }) => {
    setLoading(true);
    try {
      const response = await api.get('/buses', { params: filters });
      setBuses(response.data as Bus[]);
    } catch {
      setMessage('Could not load buses. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data as Booking[]);
    } catch {
      setMessage('Could not load bookings.');
    }
  };

  useEffect(() => {
    fetchBuses();
    fetchBookings();
  }, []);

  const handleSearch = () => {
    setMessage('');
    fetchBuses({
      from: from || undefined,
      to: to || undefined,
      date: date || undefined
    });
  };

  const handleReset = () => {
    setFrom('');
    setTo('');
    setDate('');
    setMessage('');
    fetchBuses();
  };

  const handleFormChange = (field: 'from' | 'to' | 'date', value: string) => {
    if (field === 'from') setFrom(value);
    if (field === 'to') setTo(value);
    if (field === 'date') setDate(value);
  };

  const handleBooked = (booking: Booking) => {
    setBookings((previous) => [booking, ...previous]);
    setSelectedBus(null);
    setMessage('✅ Booking successful!');
    handleSearch();
  };

  return (
    <div className="container">
      <header>
        <h1>Bus Booking System</h1>
        <p className="muted">Search buses and reserve seats instantly.</p>
      </header>

      <SearchForm
        from={from}
        to={to}
        date={date}
        onChange={handleFormChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {message ? <p className="message">{message}</p> : null}

      <section>
        <h2>Available Buses</h2>
        {loading ? <p>Loading buses...</p> : null}

        {!loading && buses.length === 0 ? <p className="muted">No buses found.</p> : null}

        <div className="bus-grid">
          {buses.map((bus) => (
            <BusCard key={bus._id} bus={bus} onBookNow={setSelectedBus} />
          ))}
        </div>
      </section>

      <BookingForm selectedBus={selectedBus} onBooked={handleBooked} onCancel={() => setSelectedBus(null)} />

      <BookingList bookings={bookings} />
    </div>
  );
};

export default App;
