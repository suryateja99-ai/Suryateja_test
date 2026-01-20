import Slot from "../models/Slot.model.js";
import Booking from "../models/Booking.model.js";

export const createBooking = async (req, res, next) => {
  try {
    const { slotId } = req.body;
    const userId = req.user.id;

    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, isBooked: false },
      { $set: { isBooked: true } },
      { new: true }
    );

    if (!slot) {
      return res.status(409).json({
        success: false,
        message: "Slot already booked"
      });
    }

    const booking = await Booking.create({
      userId,
      slotId
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};
