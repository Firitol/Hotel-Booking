import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HotelCard from "./components/HotelCard";

const API = process.env.NEXT_PUBLIC_API;

export default function App() {
  const [hotels, setHotels] = useState([]);
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    fetchHotels();
  }, [cityId]);

  const fetchHotels = async () => {
    const url = cityId
      ? `${API}/api/hotels?city_id=${cityId}`
      : `${API}/api/hotels`;

    const res = await fetch(url);
    const data = await res.json();
    setHotels(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* HERO */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Perfect Stay in Ethiopia
        </h1>
        <p className="text-lg">
          Book hotels in Adama, Addis Ababa, Hawassa and more
        </p>
      </div>

      {/* FILTER */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <select
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setCityId(e.target.value)}
        >
          <option value="">All Cities</option>
          <option value="1">Adama</option>
          <option value="2">Addis Ababa</option>
          <option value="3">Hawassa</option>
        </select>
      </div>

      {/* HOTELS */}
      <div className="max-w-7xl mx-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No hotels found.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}
