import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/bakery-recipes/backend/resep.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <p className="text-center text-gray-500">Resep tidak ditemukan</p>;

  return (
    <main className="flex justify-center p-6">
      {/* ganti bg-white jadi bg-yellow-50 (cream/beige) */}
      <div className="max-w-xl w-full bg-yellow-50 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 space-y-5">
        {/* Gambar lebih kecil, center */}
        {recipe.gambar && (
          <img
            src={recipe.gambar}
            alt={recipe.nama_resep}
            className="w-2/3 h-40 object-cover rounded-lg mx-auto mb-4 shadow-sm"
          />
        )}

        {/* Judul & kategori */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.nama_resep}</h2>
          <p className="text-sm text-gray-500">Kategori: {recipe.kategori}</p>
        </div>

        {/* Kesulitan + waktu */}
        <div className="flex justify-center gap-3">
          <span className="px-3 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-600 shadow-sm">
            {recipe.tingkat_kesulitan}
          </span>
          <span className="px-3 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-600 shadow-sm">
            🔥 {recipe.waktu}
          </span>
        </div>

        {/* Detail isi */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Alat:</strong> {recipe.alat}</p>
          <p><strong>Bahan:</strong> {recipe.bahan}</p>
          <p><strong>Langkah:</strong></p>
          <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded-lg text-sm">{recipe.langkah}</pre>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetail;
