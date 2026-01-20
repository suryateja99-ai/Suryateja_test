import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: String, required: true }, // HH:mm
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

slotSchema.index(
  { sport: 1, date: 1, startTime: 1 },
  { unique: true }
);

export default mongoose.model("Slot", slotSchema);
