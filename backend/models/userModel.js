import { pool } from "../config/db.js";

export const findUserByEmail = (email) =>
  pool.query("SELECT * FROM users WHERE email=$1", [email]);

export const createUser = (name, email, password, role) =>
  pool.query(
    "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, password, role]
  );