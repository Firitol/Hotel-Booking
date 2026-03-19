export default function HotelCard({ hotel, onBook }) {
  return (
    <div className="border rounded shadow p-4 m-2 w-64">
      <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded"/>
      <h3 className="text-xl font-semibold mt-2">{hotel.name}</h3>
      <p className="mt-1">{hotel.city_name}</p>
      <p className="mt-1">{hotel.price_per_night} ETB / night</p>
      <button
        onClick={() => onBook(hotel)}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
      >
        Book
      </button>
    </div>
  );
}
