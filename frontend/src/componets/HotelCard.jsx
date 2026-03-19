export default function HotelCard({ hotel, onBook }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 10 }}>
      <img src={hotel.image} width="100%" height="150" />
      <h3>{hotel.name}</h3>
      <p>{hotel.price_per_night} ETB</p>

      <button onClick={() => onBook(hotel)}>
        Book
      </button>
    </div>
  );
}