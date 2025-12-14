import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeList({ searchQuery = "" }) {
  const [recipes, setRecipes] = useState([]);
  const [manageMode, setManageMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost/bakery-recipes/backend/resep.php`)
      .then((res) => res.json())
      .then((data) => setRecipes(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Gagal fetch:", err));
  }, []);

  const filteredRecipes = recipes.filter((r) => {
    const matchName = r.nama_resep?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory ? r.kategori === selectedCategory : true;
    return matchName && matchCategory;
  });

  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus resep ini?")) {
      fetch(`http://localhost/bakery-recipes/backend/resep.php?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setRecipes((prev) => prev.filter((r) => r.id !== id));
          } else {
            alert("Gagal hapus resep");
          }
        })
        .catch((err) => console.error("Error hapus:", err));
    }
  };

  const categories = [
    "Semua",
    "Bread",
    "Cake",
    "Cookies",
    "Pie",
    "Pastry",
    "Tart",
    "Muffin",
    "Scone",
    "Quiche",
  ];

  return (
    <main className="container mx-auto p-6">
      <div className="flex justify-between items-start border-b pb-4 mb-6">
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <span className="w-1 h-7 bg-gradient-to-b from-blue-500 to-blue-700 rounded"></span>
            Daftar Resep
          </h3>
          <p className="text-sm text-gray-500">Koleksi resep bakery yang tersedia</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/add")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform font-semibold"
          >
            <span className="text-lg">+</span> Tambah Resep
          </button>
          <button
            onClick={() => setManageMode(!manageMode)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform font-semibold"
          >
            {manageMode ? "Selesai" : "Kelola"}
          </button>
        </div>
      </div>

      <p className="text-sm font-semibold text-gray-700 mb-2">Pilih Kategori:</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "Semua" ? "" : cat)}
            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
              selectedCategory === cat || (cat === "Semua" && selectedCategory === "")
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="p-4">
        {filteredRecipes.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-semibold">
              Yah resep yang kamu cari belum terdaftar nih,
            </p>
            <p className="text-md">Yuk tambahin resep baru dulu!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border rounded-xl shadow-md 
                  transform transition duration-500 ease-out 
                  hover:-translate-y-2 hover:scale-70 hover:shadow-2xl 
                  hover:ring-2 hover:ring-blue-500 cursor-pointer flex flex-col"
              >
                <div className="w-full h-48">
                  {recipe.gambar && (
                    <img
                      src={recipe.gambar}
                      alt={recipe.nama_resep}
                      className="w-full h-full object-cover rounded-t-xl"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">{recipe.nama_resep}</h2>
                      <p className="text-sm text-gray-600">Kategori: {recipe.kategori}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 mt-auto self-end">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-600 leading-none">
                        {recipe.tingkat_kesulitan}
                      </span>
                      <span className="px-1 py-0 text-xs font-semibold text-gray-600 leading-none">
                        🔥 {recipe.waktu}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t p-3 flex justify-between items-center">
                  {!manageMode ? (
                    <button
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline transition"
                    >
                      Lihat Resep →
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/edit/${recipe.id}`)}
                        className="px-3 py-1 text-xs bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(recipe.id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default RecipeList;
