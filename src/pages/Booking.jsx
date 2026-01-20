import "./Booking.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import api from "../api/axios";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const sport = location.state?.sport || "";
  const name = location.state?.name || "";

  const [slotId, setSlotId] = useState("");
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");

  const today = moment().format("YYYY-MM-DD");

  
  useEffect(() => {
    if (!sport || !date) return;

    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        setError("");

        const res = await api.get("/slots", {
          params: { sport, date }
        });

        setSlots(res.data.data || []);
        setSlotId(""); 
      } catch (err) {
        setError("Failed to load slots. Try again.");
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [sport, date]);

  const formatSlot = (start, end) =>
    `${moment(start, "HH:mm").format("hh:mm A")} - ${moment(end, "HH:mm").format("hh:mm A")}`;

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slotId) {
      setError("Please select a slot");
      return;
    }

    try {
      setBookingLoading(true);
      setError("");

      await api.post("/bookings", {
        slotId
      });

      navigate("/success");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Slot already booked. Please select another slot.");

        
        const res = await api.get("/slots", {
          params: { sport, date }
        });
        setSlots(res.data.data || []);
      } else {
        setError(err.response?.data?.message || "Booking failed");
      }
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="form">
      <input value={sport} readOnly />
      <input value={name} readOnly />

      <input
        type="date"
        min={today}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <select
        value={slotId}
        onChange={(e) => setSlotId(e.target.value)}
        disabled={loadingSlots || !date}
        required
      >
        <option value="">
          {loadingSlots ? "Loading slots..." : "Select Slot"}
        </option>

        {slots.map((slot) => {
          const slotTime = moment(
            `${slot.date} ${slot.startTime}`,
            "YYYY-MM-DD HH:mm"
          );
          const isPast = slotTime.isBefore(moment());

          return (
            <option
              key={slot._id}
              value={slot._id}              // ✅ IMPORTANT
              disabled={slot.isBooked || isPast}
            >
              {formatSlot(slot.startTime, slot.endTime)}
              {slot.isBooked ? " (Booked)" : isPast ? " (Unavailable)" : ""}
            </option>
          );
        })}
      </select>

      {error && <p className="error">{error}</p>}

      <button disabled={bookingLoading || !slotId} onClick={handleSubmit}>
        {bookingLoading ? "Booking..." : "Book Slot"}
      </button>
    </div>
  );
}

export default Booking;
