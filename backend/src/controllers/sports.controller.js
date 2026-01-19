export const getSports = (req, res) => {
  res.json({
    success: true,
    data: [
      "Cricket",
      "Badminton",
      "Football",
      "Tennis",
      "Basketball"
    ]
  });
};
