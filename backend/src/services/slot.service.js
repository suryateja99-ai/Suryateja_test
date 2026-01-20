import Slot from "../models/slot.model.js";

export const generateSlots = async (sport, date) => {
  const slots = [];

  for (let hour = 6; hour < 22; hour++) {
    const startTime = `${hour.toString().padStart(2, "0")}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;

    slots.push({
      sport,
      date,
      startTime,
      endTime,
    });
  }

  for (const slot of slots) {
    await Slot.findOneAndUpdate(
      {
        sport: slot.sport,
        date: slot.date,
        startTime: slot.startTime,
      },
      { $setOnInsert: slot },
      { upsert: true }
    );
  }

  return Slot.find({ sport, date }).sort({ startTime: 1 });
};
