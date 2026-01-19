import Booking from "../models/booking.model.js";
import { bookSlot } from "../services/booking.service.js";


export const createBooking = async (req, res) => {
  try {
    const { sport, date, time } = req.body;
    const userId = req.user.id;


    
    if (!sport || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "sport, date and time are required",
      });
    }

    const booking = await bookSlot({
      userId,
      sport,
      date,
      time,
    });

    return res.status(201).json({
      success: true,
      booking,
    });

  } catch (err) {
    return res.status(409).json({
      success: false,
      message: err.message,
    });
  }
};


export const getBookedSlots = async (req, res) => {
  try {
    const { sport, date } = req.query;

    if (!sport || !date) {
      return res.status(400).json({
        success: false,
        message: "sport and date are required",
      });
    }

    const bookings = await Booking.find({ sport, date }).select("time");

    const bookedSlots = bookings.map(b => b.time);

    return res.json({
      success: true,
      data: bookedSlots,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
