export const getSports = (req, res) => {
  res.json({
    success: true,
    data: ["Cricket", "Football", "Badminton", "Tennis", "Swimming"]
  });
};
