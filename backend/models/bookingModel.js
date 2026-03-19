import { pool } from "../config/db.js";

export const createBookingDB = (user_id, room_id, check_in, check_out) =>
  pool.query(
    `INSERT INTO bookings (user_id, room_id, check_in, check_out)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [user_id, room_id, check_in, check_out]
  );