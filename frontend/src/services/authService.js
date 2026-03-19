import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/userModel.js";

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user.rows.length) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.rows[0].id, role: user.rows[0].role },
    process.env.JWT_SECRET
  );

  return { token, user: user.rows[0] };
};