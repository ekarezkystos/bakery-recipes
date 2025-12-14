import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch, onReset }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    navigate("/"); // balik ke halaman list biar filter jalan
  };

  const goHome = () => {
    navigate("/");     // balik ke home
    setQuery("");      // kosongin input search bar
    onReset();         // reset searchQuery di App
  };

  return (
    <nav className="flex items-center justify-between bg-gray-100 px-6 py-3 shadow">
      {/* Judul */}
      <h1
        onClick={goHome}
        className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent cursor-pointer tracking-tight hover:opacity-80 transition"
      >
        BAKERY RECIPES
      </h1>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari resep..."
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition font-semibold"
        >
          Search
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
