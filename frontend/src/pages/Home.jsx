import { useEffect, useState } from "react";
import { getHotels } from "../api";
import HotelCard from "../components/HotelCard";

export default function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getHotels().then(setHotels);
  }, []);

  return (
    <div>
      <h1>Hotels in Adama</h1>

      {hotels.map(h => (
        <HotelCard key={h.id} hotel={h} />
      ))}
    </div>
  );
}