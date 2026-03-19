import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import hotelRoutes from "./routes/hotelRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hotels", hotelRoutes);

app.listen(5000, () => console.log("Server running"));