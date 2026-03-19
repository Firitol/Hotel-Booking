import express from "express";
import { fetchHotels } from "../controllers/hotelController.js";

const router = express.Router();

// ✅ Example:
// /api/hotels?city_id=1
router.get("/", fetchHotels);

export default router;