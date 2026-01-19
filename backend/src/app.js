import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import slotsRoutes from "./routes/slots.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/slots", slotsRoutes);
app.use(errorHandler);

export default app;
