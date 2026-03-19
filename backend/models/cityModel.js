import { pool } from "../config/db.js";

export const getCities = () =>
  pool.query("SELECT * FROM cities");

export const getCityById = (id) =>
  pool.query("SELECT * FROM cities WHERE id=$1", [id]);