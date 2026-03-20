export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <img
        src={hotel.image || "https://via.placeholder.com/300"}
        alt={hotel.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-2">{hotel.name}</h2>
      <p className="text-gray-500">{hotel.location}</p>
      <p className="text-blue-600 font-bold">{hotel.price_per_night} ETB</p>
    </div>
  );
}
