import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API || "https://hotel-booking-cyqr.onrender.com";

function App() {
  const [hotels, setHotels] = useState([]);
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    fetchHotels(cityId);
  }, [cityId]);

  const fetchHotels = async (city_id) => {
    try {
      const url = city_id ? `${API}/api/hotels?city_id=${city_id}` : `${API}/api/hotels`;
      const res = await fetch(url);
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Ethiopian Hotel Booking</h1>

      <div className="max-w-md mx-auto mb-6">
        <select
          className="w-full border rounded p-3"
          onChange={(e) => setCityId(e.target.value)}
          value={cityId}
        >
          <option value="">All Cities</option>
          <option value="1">Adama</option>
          <option value="2">Addis Ababa</option>
          <option value="3">Hawassa</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded shadow p-4 flex flex-col"
            >
              <img
                src={hotel.image || "https://via.placeholder.com/300"}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-600 mt-1">{hotel.city_name}</p>
              <p className="mt-2 font-bold">{hotel.price_per_night} ETB / night</p>
              <button
                className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => alert(`Booked ${hotel.name}`)}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-4">No hotels found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
