import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function App() {
  const [hotels, setHotels] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [form, setForm] = useState({ email: "", password: "" });
  const [page, setPage] = useState("home");

  useEffect(() => {
    fetch(API + "/api/hotels")
      .then(res => res.json())
      .then(setHotels);
  }, []);

  // LOGIN
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

  // BOOKING
  const book = async (hotel) => {
    const token = localStorage.getItem("token");

    const bookingRes = await fetch(API + "/api/bookings", {
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

    const booking = await bookingRes.json();

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

    alert("✅ Booking Confirmed!");
  };

  // DASHBOARDS
  const Dashboard = () => {
    if (!user) return <p>Please login</p>;

    if (user.role === "admin") {
      return (
        <div>
          <h2>👑 Admin Dashboard</h2>
          <p>Manage hotels, users, payments</p>
        </div>
      );
    }

    if (user.role === "owner") {
      return (
        <div>
          <h2>🏨 Owner Dashboard</h2>
          <p>Add hotels and manage bookings</p>
        </div>
      );
    }

    return (
      <div>
        <h2>📅 My Bookings</h2>
        <p>Your bookings will appear here</p>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
        background: "#003580",
        color: "white"
      }}>
        <h2>Adama Booking</h2>

        <div>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
        </div>
      </div>

      <div style={{ padding: 20 }}>

        {/* LOGIN */}
        {!user && (
          <div style={{ marginBottom: 20 }}>
            <input
              placeholder="Email"
              onChange={e => setForm({...form, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={e => setForm({...form, password: e.target.value})}
            />
            <button onClick={login}>Login</button>
          </div>
        )}

        {/* USER */}
        {user && (
          <div style={{ marginBottom: 20 }}>
            Welcome <b>{user.name}</b> ({user.role})
          </div>
        )}

        {/* HOME */}
        {page === "home" && (
          <>
            <h1>🏨 Hotels in Adama</h1>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
              gap: 20
            }}>
              {hotels.map(hotel => (
                <div key={hotel.id} style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}>
                  <img
                    src={hotel.image}
                    alt=""
                    style={{ width: "100%", height: 180, objectFit: "cover" }}
                  />

                  <div style={{ padding: 10 }}>
                    <h3>{hotel.name}</h3>
                    <p>{hotel.location}</p>
                    <p><b>{hotel.price_per_night} ETB</b></p>

                    {user && (
                      <button onClick={() => book(hotel)}>
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* DASHBOARD */}
        {page === "dashboard" && <Dashboard />}

      </div>
    </div>
  );
}