import express from "express";
import { fetchHotels } from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", fetchHotels); // GET /api/hotels?city_id=1

export default router;
