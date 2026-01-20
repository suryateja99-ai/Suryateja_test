import express from "express";
import { createBooking } from "../controllers/booking.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, createBooking);

export default router;
