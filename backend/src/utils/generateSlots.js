export const generateSlots = () => {
  const slots = [];
  for (let hour = 6; hour < 22; hour++) {
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    slots.push({ startTime: start, endTime: end });
  }
  return slots;
};
