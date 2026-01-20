import express from "express";
import { getSlots } from "../controllers/slots.controller.js";

const router = express.Router();
router.get("/", getSlots);

export default router;
