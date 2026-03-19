import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function App() {
  const [hotels, setHotels] = useState([]);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });

  // Load hotels
  useEffect(() => {
    fetch(API + "/api/hotels")
      .then(res => res.json())
      .then(data => setHotels(data));
  }, []);

  // Login
  const login = async () => {
    const res = await fetch(API + "/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  // Booking
  const book = async (hotel) => {
    const token = localStorage.getItem("token");

    const res = await fetch(API + "/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        room_id: 1,
        check_in: "2026-03-20",
        check_out: "2026-03-22"
      })
    });

    const booking = await res.json();

    await fetch(API + "/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        booking_id: booking.id,
        method: "cash",
        amount: hotel.price_per_night
      })
    });

    alert("Booking successful!");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🏨 Adama Hotel Booking</h1>

      {/* LOGIN */}
      {!user && (
        <div style={{ marginBottom: 20 }}>
          <input
            placeholder="Email"
            onChange={e => setForm({...form, email: e.target.value})}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={e => setForm({...form, password: e.target.value})}
          />
          <button onClick={login}>Login</button>
        </div>
      )}

      {/* USER INFO */}
      {user && (
        <div>
          <p>Welcome, {user.name} ({user.role})</p>
        </div>
      )}

      {/* HOTELS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {hotels.map(hotel => (
          <div key={hotel.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <img src={hotel.image} alt="" width="100%" height="150" />
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>
            <p>{hotel.price_per_night} ETB</p>

            {user && (
              <button onClick={() => book(hotel)}>
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}