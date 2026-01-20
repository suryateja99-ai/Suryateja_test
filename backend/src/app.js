import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import sportsRoutes from "./routes/sports.routes.js";
import slotsRoutes from "./routes/slots.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sports", sportsRoutes);
app.use("/api/v1/slots", slotsRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.use(errorHandler);

export default app;
