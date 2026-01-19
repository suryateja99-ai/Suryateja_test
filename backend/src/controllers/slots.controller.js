import Slot from "../models/slot.model.js";
import moment from "moment";


export const getSlots = async (req, res) => {
  try {
    const { sport, date } = req.query;

    if (!sport || !date) {
      return res.status(400).json({ success: false, message: "Sport and date required" });
    }

    const slots = [];
    const startHour = 8;   
    const endHour = 20;    

    for (let h = startHour; h < endHour; h++) {
      const startTime = `${h}:00`;
      const endTime = `${h + 1}:00`;

      
      if (moment(`${date} ${startTime}`, "YYYY-MM-DD H:mm").isBefore(moment())) continue;

      
      const existingSlot = await Slot.findOne({ sport, date, startTime });

      slots.push({
        sport,
        date,
        startTime,
        endTime,
        isBooked: existingSlot ? existingSlot.isBooked : false
      });
    }

    res.json({ success: true, data: slots });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
