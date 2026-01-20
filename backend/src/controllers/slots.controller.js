import Slot from "../models/Slot.model.js";
import { generateSlots } from "../utils/generateSlots.js";

export const getSlots = async (req, res, next) => {
  try {
    const { sport, date } = req.query;

    if (!sport || !date) {
      return res.status(400).json({ success: false, message: "Missing params" });
    }

    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      return res.status(400).json({
        success: false,
        message: "Past dates not allowed"
      });
    }

    const existing = await Slot.find({ sport, date });
    if (existing.length === 0) {
      const generated = generateSlots().map(s => ({
        sport,
        date,
        ...s
      }));
      await Slot.insertMany(generated);
    }

    const slots = await Slot.find({ sport, date }).sort("startTime");
    res.json({ success: true, data: slots });
  } catch (err) {
    next(err);
  }
};
