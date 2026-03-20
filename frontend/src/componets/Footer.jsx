export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3">EthioStay</h2>
          <p className="text-gray-400">
            Discover the best hotels in Ethiopia. Book easily and securely.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Hotels</li>
            <li>Bookings</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-400">Addis Ababa, Ethiopia</p>
          <p className="text-gray-400">+251 900 000 000</p>
        </div>
      </div>

      <div className="text-center text-gray-500 pb-4">
        © 2026 EthioStay. All rights reserved.
      </div>
    </footer>
  );
}
