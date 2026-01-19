import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  date: { type: String, required: true },          
  startTime: { type: String, required: true },     
  endTime: { type: String, required: true },       
  isBooked: { type: Boolean, default: false }
});


slotSchema.index({ sport: 1, date: 1, startTime: 1 }, { unique: true });

const Slot = mongoose.model("Slot", slotSchema);
export default Slot;
