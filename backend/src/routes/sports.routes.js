import express from "express";
import { getSports } from "../controllers/sports.controller.js";

const router = express.Router();
router.get("/", getSports);

export default router;
