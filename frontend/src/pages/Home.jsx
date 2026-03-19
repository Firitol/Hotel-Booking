import { useEffect, useState } from "react";
import { getHotels } from "../api";
import HotelCard from "../components/HotelCard";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    getHotels(cityId).then(setHotels);
  }, [cityId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hotels in Ethiopia</h1>

      <select
        className="border rounded p-2 mb-4"
        onChange={(e) => setCityId(e.target.value)}
      >
        <option value="">All Cities</option>
        <option value="1">Adama</option>
        <option value="2">Addis Ababa</option>
        <option value="3">Hawassa</option>
      </select>

      <div className="flex flex-wrap">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} onBook={() => alert(`Booked ${hotel.name}`)} />
        ))}
      </div>
    </div>
  );
}
