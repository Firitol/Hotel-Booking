import { pool } from "../config/db.js";

export const getHotelsByCity = (city_id) => {
  if (!city_id) {
    return pool.query(`
      SELECT h.*, c.name as city_name
      FROM hotels h
      JOIN cities c ON h.city_id = c.id
      WHERE h.approved=true
    `);
  }

  return pool.query(`
    SELECT h.*, c.name as city_name
    FROM hotels h
    JOIN cities c ON h.city_id = c.id
    WHERE h.city_id=$1 AND h.approved=true
  `, [city_id]);
};