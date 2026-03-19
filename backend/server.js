import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 DATABASE
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// 🔐 AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};

// ================= AUTH =================

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await pool.query(
      `INSERT INTO users (name,email,password,role)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, email, hashed, role || "user"]
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (!user.rows.length) return res.status(400).send("User not found");

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(400).send("Wrong password");

    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET
    );

    res.json({ token, user: user.rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ================= HOTELS =================

// Get hotels
app.get("/api/hotels", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM hotels WHERE approved=true"
  );
  res.json(result.rows);
});

// Add hotel (owner)
app.post("/api/hotels", auth, async (req, res) => {
  const { name, location, price, image } = req.body;

  const hotel = await pool.query(
    `INSERT INTO hotels (name, location, price_per_night, image, owner_id)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, location, price, image, req.user.id]
  );

  res.json(hotel.rows[0]);
});

// Approve hotel (admin)
app.put("/api/admin/hotel/:id", async (req, res) => {
  await pool.query(
    "UPDATE hotels SET approved=true WHERE id=$1",
    [req.params.id]
  );

  res.json({ message: "Hotel approved" });
});

// ================= BOOKINGS =================

// Create booking
app.post("/api/bookings", auth, async (req, res) => {
  const { room_id, check_in, check_out } = req.body;

  const booking = await pool.query(
    `INSERT INTO bookings (user_id, room_id, check_in, check_out)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [req.user.id, room_id, check_in, check_out]
  );

  res.json(booking.rows[0]);
});

// Get my bookings
app.get("/api/bookings", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM bookings WHERE user_id=$1",
    [req.user.id]
  );

  res.json(result.rows);
});

// ================= PAYMENTS =================

// Create payment
app.post("/api/payments", auth, async (req, res) => {
  const { booking_id, method, amount } = req.body;

  let status = "pending";

  if (method === "cash") {
    status = "pending"; // pay at hotel
  }

  const payment = await pool.query(
    `INSERT INTO payments (booking_id, method, amount, status)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [booking_id, method, amount, status]
  );

  res.json(payment.rows[0]);
});

// Telebirr mock
app.post("/api/payments/telebirr", async (req, res) => {
  res.json({
    payment_url: "https://telebirr.com/pay/demo",
    message: "Redirect user to Telebirr"
  });
});

// ================= START =================

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});