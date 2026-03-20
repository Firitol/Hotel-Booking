export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={hotel.image || "https://via.placeholder.com/400"}
        alt={hotel.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold">{hotel.name}</h2>

        <p className="text-sm text-gray-500">
          📍 {hotel.city_name || "Ethiopia"} - {hotel.location}
        </p>

        <p className="text-gray-600 text-sm">
          {hotel.description || "Comfortable stay with modern amenities, free WiFi, and excellent service."}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-600 font-bold text-lg">
            {hotel.price_per_night} ETB
          </span>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
