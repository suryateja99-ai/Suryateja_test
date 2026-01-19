import Booking from "../models/booking.model.js";
import moment from "moment";

export const bookSlot = async ({ userId, sport, date, time }) => {
  
  const [startTime] = time.split("-");
  const slotDateTime = moment(
    `${date} ${startTime}`,
    "YYYY-MM-DD HH:mm"
  );

  if (slotDateTime.isBefore(moment())) {
    throw new Error("Cannot book a past slot");
  }

  
  const existingBooking = await Booking.findOne({
    sport,
    date,
    time,
  });

  if (existingBooking) {
    throw new Error("Slot already booked");
  }

  
  const booking = await Booking.create({
    userId,
    sport,
    date,
    time,
  });

  return booking;
};
