import "./Booking.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import api from "./api/axios";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const sport = location.state?.sport || "";
  const name = location.state?.name || "";

  const [form, setForm] = useState({
    slotId: "",
    sport,
    name,
  });

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const today = moment().format("YYYY-MM-DD");

  
  useEffect(() => {
    if (!date || !sport) return;

    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        setError("");

        const res = await api.get("/slots", { params: { sport, date } });
        
        setSlots(res.data.data || []);
        
        setForm((prev) => ({ ...prev, slotId: "" }));
      } catch (err) {
        setError("Failed to load slots. Try again.");
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [date, sport]);

  const handleDateChange = (e) => setDate(e.target.value);
  const handleSlotChange = (e) => setForm((prev) => ({ ...prev, slotId: e.target.value }));

 
  const formatSlot = (start, end) =>
    `${moment(start, "HH:mm").format("hh:mm A")} - ${moment(end, "HH:mm").format("hh:mm A")}`;

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.slotId) {
    setError("Please select a slot");
    return;
  }

  try {
    setBookingLoading(true);
    setError("");

    console.log("Sending booking data:", { slotId: form.slotId });

    await api.post("/bookings", {
      sport,
      date,
      time: form.slotId
    });
    navigate("/success");

  } catch (err) {
    if (err.response?.status === 409) {
      console.log(err)
      setError("Slot already booked. Please select another slot.");
      
      const res = await api.get("/slots", { params: { sport, date } });
      setSlots(res.data.data || []);
    } else if (err.response?.status === 400) {
      setError(err.response.data.message || "Invalid request");
    } else {
      setError("Booking failed. Try again.");
    }
  } finally {
    setBookingLoading(false);
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
        value={date}
        onChange={handleDateChange}
        required
      />

      <select
        name="slotId"
        value={form.slotId}
        onChange={handleSlotChange}
        disabled={loadingSlots || !date}
        required
      >
        <option value="">
          {loadingSlots ? "Loading slots..." : "Select Slot"}
        </option>

        {slots.map((slot) => {
          const slotTime = moment(`${slot.date} ${slot.startTime}`, "YYYY-MM-DD HH:mm");
          const isPast = slotTime.isBefore(moment());
          return (
            <option
              key={slot._id || `${slot.date}-${slot.startTime}`} 
              value={`${slot.startTime}-${slot.endTime}`}
              disabled={slot.isBooked || isPast}
            >
              {formatSlot(slot.startTime, slot.endTime)}
              {slot.isBooked ? " (Booked)" : isPast ? " (Unavailable)" : ""}
            </option>
          );
        })}
      </select>

      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit} disabled={bookingLoading || !form.slotId}>
        {bookingLoading ? "Booking..." : "Book Slot"}
      </button>
    </div>
  );
}

export default Booking;
