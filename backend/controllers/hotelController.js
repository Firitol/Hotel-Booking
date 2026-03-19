import { pool } from "../config/db.js";

export const fetchHotels = async (req, res) => {
  const { city_id, city_name } = req.query;
  try {
    let query = `
      SELECT h.*, c.name as city_name
      FROM hotels h
      JOIN cities c ON h.city_id = c.id
      WHERE h.approved = true
    `;
    const params = [];
    if (city_id) {
      query += ` AND h.city_id = $1`;
      params.push(city_id);
    }
    if (city_name) {
      query += params.length ? ` AND c.name = $${params.length + 1}` : ` AND c.name = $1`;
      params.push(city_name);
    }
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
