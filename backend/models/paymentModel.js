import { pool } from "../config/db.js";

export const createPaymentDB = (booking_id, method, amount, status) =>
  pool.query(
    `INSERT INTO payments (booking_id, method, amount, status)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [booking_id, method, amount, status]
  );