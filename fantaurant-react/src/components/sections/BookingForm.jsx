import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import bookingBg from '../../assets/images/booking.jpg';

const TIME_SLOTS = [
  '10:00 – 12:00', '12:00 – 14:00', '14:00 – 16:00',
  '16:00 – 18:00', '18:00 – 20:00', '20:00 – 22:00', '22:00 – 00:00',
];

const BookingForm = () => {
  const [form, setForm] = useState({
    date: '', time: '', name: '', phone: '', persons: '',
  });
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');
  const [bookings,  setBookings]  = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getLocalDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchMyBookings = useCallback(async () => {
    if (!user) return;
    try {
      setBookingsLoading(true);
      const { data } = await api.get('/bookings/my');
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookings(sorted);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setBookingsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await api.post('/bookings', {
        name:   form.name,
        email:  user.email,
        phone:  form.phone,
        date:   form.date,
        time:   form.time,
        guests: Number(form.persons),
      });

      setLoading(false);
      setSubmitted(true);
      fetchMyBookings();
      setTimeout(() => setSubmitted(false), 5000);
      setForm({ date: '', time: '', name: '', phone: '', persons: '' });
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center
        justify-center p-6"
      style={{ backgroundImage: `url(${bookingBg})` }}
    >
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl
        border border-white/30 shadow-2xl p-8 md:p-12">

        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8
          drop-shadow-lg">
          Table Reservation
        </h2>

        {/* Guest notice */}
        {!user && (
          <div className="mb-6 bg-white/10 border border-white/20 rounded-xl p-4 text-center text-white/80 text-sm">
            <i className="fa-solid fa-circle-info mr-2 text-brand-warm" />
            You need to{' '}
            <button onClick={() => navigate('/login')} className="underline font-bold hover:text-white">
              login
            </button>
            {' '}to make a booking.
          </div>
        )}

        {submitted ? (
          <div className="text-center py-10 animate-scale-in">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center
              mx-auto mb-4 shadow-lg">
              <i className="fa-solid fa-check text-white text-3xl" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Booking Confirmed!</h3>
            <p className="text-white/80 text-sm">
              We look forward to seeing you, <strong>{form.name || user?.name}</strong>. A confirmation will be sent shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1: Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-white/90 text-xs font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={getLocalDateString()}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white
                    border border-white/30 outline-none focus:border-white/70
                    focus:ring-2 focus:ring-white/20 transition-all duration-300
                    placeholder-white/50 text-sm backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white/90 text-xs font-semibold">Time Slot</label>
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white
                    border border-white/30 outline-none focus:border-white/70
                    transition-all duration-300 text-sm backdrop-blur-sm"
                >
                  <option value="" className="text-gray-800">Select time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot} className="text-gray-800">{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-white/90 text-xs font-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={user?.name || 'John Doe'}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white
                    border border-white/30 outline-none focus:border-white/70
                    focus:ring-2 focus:ring-white/20 transition-all duration-300
                    placeholder-white/50 text-sm backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white/90 text-xs font-semibold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white
                    border border-white/30 outline-none focus:border-white/70
                    focus:ring-2 focus:ring-white/20 transition-all duration-300
                    placeholder-white/50 text-sm backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Row 3: Persons */}
            <div className="flex flex-col gap-1">
              <label className="text-white/90 text-xs font-semibold">Number of Persons</label>
              <input
                type="number"
                name="persons"
                value={form.persons}
                onChange={handleChange}
                placeholder="How many guests?"
                min={1}
                max={20}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white
                  border border-white/30 outline-none focus:border-white/70
                  focus:ring-2 focus:ring-white/20 transition-all duration-300
                  placeholder-white/50 text-sm backdrop-blur-sm"
              />
            </div>

            {error && (
              <p className="text-red-300 text-xs text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 bg-brand-primary text-white font-bold rounded-xl
                shadow-brand transition-all duration-300
                hover:bg-brand-primary-dark hover:shadow-brand-lg hover:scale-[1.02]
                active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Booking your table…
                </>
              ) : (
                <>
                  <i className="fa-solid fa-calendar-check" />
                  {user ? 'Book Table' : 'Login to Book'}
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {user && (
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl p-6 md:p-8 mt-10 text-white overflow-hidden animate-scale-in">
          <h3 className="text-2xl font-bold mb-6 text-center drop-shadow-md flex items-center justify-center gap-2">
            <i className="fa-solid fa-list-check text-brand-gold" />
            Your Reservations
          </h3>
          {bookingsLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-white/30 border-t-brand-primary rounded-full animate-spin" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-10 text-white/70">
              <i className="fa-solid fa-calendar-xmark text-4xl mb-3 block text-white/40" />
              <p className="text-sm">No reservations found. Book a table above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-white/10 text-white font-bold border-b border-white/20">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Time Slot</th>
                    <th className="py-3 px-4">Guests</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {bookings.map((b) => {
                    const statusColors = {
                      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
                      confirmed: 'bg-green-500/20 text-green-300 border-green-500/40',
                      cancelled: 'bg-red-500/20 text-red-300 border-red-500/40',
                    };
                    return (
                      <tr key={b._id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-semibold">{b.date}</td>
                        <td className="py-3.5 px-4">{b.time}</td>
                        <td className="py-3.5 px-4">{b.guests} {b.guests === 1 ? 'Guest' : 'Guests'}</td>
                        <td className="py-3.5 px-4 text-white/80">{b.phone}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${statusColors[b.status] || 'bg-gray-500/20 text-gray-300'}`}>
                            {b.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default BookingForm;
