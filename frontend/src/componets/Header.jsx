export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          EthioStay
        </h1>

        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Hotels</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Bookings</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    </header>
  );
}
