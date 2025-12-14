import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const [namaResep, setNamaResep] = useState("");
  const [kategori, setKategori] = useState("");
  const [waktu, setWaktu] = useState("");
  const [tingkatKesulitan, setTingkatKesulitan] = useState("");
  const [alat, setAlat] = useState("");
  const [bahan, setBahan] = useState("");
  const [langkah, setLangkah] = useState("");
  const [gambar, setGambar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      nama_resep: namaResep,
      kategori,
      waktu,
      tingkat_kesulitan: tingkatKesulitan,
      alat,
      bahan,
      langkah,
      gambar,
    };

    fetch("http://localhost/bakery-recipes/backend/resep.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert("Resep berhasil ditambahkan!");
          navigate("/");
        } else {
          alert("Gagal menambahkan resep");
        }
      })
      .catch((err) => console.error("Error tambah resep:", err));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Tambah Resep Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nama Resep" value={namaResep} setValue={setNamaResep} required />
          <Input label="Kategori" value={kategori} setValue={setKategori} placeholder="Bread / Cake / ..." required />

          {/* Waktu & Tingkat Kesulitan sejajar */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Waktu"
              value={waktu}
              setValue={setWaktu}
              placeholder="contoh: 45 menit"
              required
            />
            <Input
              label="Tingkat Kesulitan"
              value={tingkatKesulitan}
              setValue={setTingkatKesulitan}
              placeholder="Mudah / Sedang / Sulit"
              required
            />
          </div>

          <Textarea label="Alat" value={alat} setValue={setAlat} placeholder="Pisau, Oven, Mixer..." required />
          <Textarea label="Bahan" value={bahan} setValue={setBahan} placeholder="500g tepung, 300ml air..." required />
          <Textarea label="Langkah" value={langkah} setValue={setLangkah} placeholder="1. Campur bahan\n2. Uleni..." required />

          {/* URL Gambar + Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
            <input
              type="text"
              value={gambar}
              onChange={(e) => setGambar(e.target.value)}
              placeholder="http://..."
              className="mt-1 block w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            {gambar && (
              <div className="mt-3 flex justify-center">
                <img
                  src={gambar}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-md shadow hover:shadow-lg transition font-semibold"
          >
            Simpan Resep
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({ label, value, setValue, placeholder = "", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:border-blue-300"
        required={required}
      />
    </div>
  );
}

function Textarea({ label, value, setValue, placeholder = "", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mt-1 block w-full border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:border-blue-300"
        required={required}
      />
    </div>
  );
}

export default AddRecipe;
