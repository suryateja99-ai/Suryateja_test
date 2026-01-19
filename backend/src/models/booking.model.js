import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    date: {
      type: String, 
      required: true,
    },
    time: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);


bookingSchema.index(
  { sport: 1, date: 1, time: 1 },
  { unique: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
