import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Booking.css';
import {useNavigate} from 'react-router-dom';

function Booking() {
  const location = useLocation();
  const sport = location.state?.sport;
  const name = location.state?.name;

  const [form, setForm] = useState({
    name,
    sport,
    date: '',
    time: '',
  });

  const [bookedSlots, setBookedSlots] = useState([]);

  const timeSlots = [
    "12:00 AM - 01:00 AM","01:00 AM - 02:00 AM","02:00 AM - 03:00 AM",
    "03:00 AM - 04:00 AM","04:00 AM - 05:00 AM","05:00 AM - 06:00 AM",
    "06:00 AM - 07:00 AM","07:00 AM - 08:00 AM","08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM","10:00 AM - 11:00 AM","11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM","01:00 PM - 02:00 PM","02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM","04:00 PM - 05:00 PM","05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM","07:00 PM - 08:00 PM","08:00 PM - 09:00 PM",
    "09:00 PM - 10:00 PM","10:00 PM - 11:00 PM","11:00 PM - 12:00 AM"
  ];

  const today = new Date().toISOString().split('T')[0];
  const currentHour = new Date().getHours();

  const getSlotHour = (slot) => {
    const [time, period] = slot.split(' ');
    let hour = parseInt(time.split(':')[0]);

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return hour;
  };

  useEffect(() => {
    if (!form.date || !form.sport) return;

    axios.get('http://localhost:5000/booked-slots', {
      params: { sport: form.sport, date: form.date }
    })
    .then(res => setBookedSlots(res.data))
    .catch(() => setBookedSlots([]));
  }, [form.date, form.sport]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/booking',
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      navigate('/success')
      setForm({ ...form, date: '', time: '' });

    } catch (err) {
      if (err.response?.status === 409) {
        alert('Slot already booked');
      } else {
        alert('Booking failed');
      }
    }
  };

  return (
    <div className="form">
      <input value={form.sport} readOnly />
      <input value={form.name} readOnly />

      <input
        type="date"
        name="date"
        min={today}
        value={form.date}
        onChange={handleChange}
        required
      />

      <select name="time" value={form.time} onChange={handleChange} required>
        <option value="">Select Slot</option>

        {timeSlots.map(slot => {
          const slotHour = getSlotHour(slot);
          const isToday = form.date === today;
          const isPast = isToday && slotHour <= currentHour;
          const isBooked = bookedSlots.includes(slot);

          return (
            <option
              key={slot}
              value={slot}
              disabled={isPast || isBooked}
            >
              {slot} {isBooked ? '(Booked)' : isPast ? '(Unavailable)' : ''}
            </option>
          );
        })}
      </select>

      <button onClick={handleSubmit}>Book Slot</button>
    </div>
  );
}

export default Booking;
