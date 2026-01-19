import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createBooking, getBookedSlots } from "../controllers/booking.controller.js";
import { body } from "express-validator";
import validateRequest from "../middleware/validateRequest.js";


const router = express.Router();


router.post(
  "/",
  authMiddleware,
  [
    body("sport").notEmpty(),
    body("date").notEmpty(),
    body("time").notEmpty()
  ],
  validateRequest,
  createBooking
);


router.get("/booked-slots", getBookedSlots);


export default router;
