import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connection established"))
  .catch((error) => console.log("connection error", error));

const port = 5000;
app.listen(port, () => {
  console.log("Server running");
});
