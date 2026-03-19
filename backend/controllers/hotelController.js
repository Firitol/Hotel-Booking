// backend/controllers/hotelController.js
import { pool } from "../config/db.js";

export const fetchHotels = async (req, res) => {
  const { city_id } = req.query;
  try {
    const query = `
      SELECT h.*, c.name as city_name
      FROM hotels h
      JOIN cities c ON h.city_id = c.id
      WHERE h.approved=true
      ${city_id ? "AND h.city_id=$1" : ""}
    `;
    const params = city_id ? [city_id] : [];
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
